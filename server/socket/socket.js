const { Server } = require("socket.io");
const userModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const SocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", async (id) => {
      socket.join(id);
      socket.emit("joined", id);
      await userModel.updateOne(
        { _id: id },
        { $set: { activeStatus: "online" } }
      );

      socket.on("request-recent", async (id, factor) => {
        const recentChats = await userModel.aggregate([
          {
            $match: {
              _id: ObjectId(id),
            },
          },
          {
            $unwind: {
              path: "$chatRooms",
            },
          },
          {
            $lookup: {
              from: "messages",
              localField: "chatRooms",
              foreignField: "chatRoom",
              pipeline: [
                {
                  $sort: {
                    createdAt: -1,
                  },
                },
              ],
              as: "message",
            },
          },
          {
            $project: {
              _id: 0,
              message: {
                $arrayElemAt: ["$message", 0],
              },
            },
          },
          {
            $project: {
              from: "$message.from",
              to: "$message.to",
              message: "$message.message",
              seen: "$message.seen",
              delivered: "$message.delivered",
              createdAt: "$message.createdAt",
            },
          },
          {
            $project: {
              user: {
                $cond: {
                  if: { $eq: ["$from", ObjectId(id)] },
                  then: "$to",
                  else: "$from",
                },
              },
              message: "$message",
              seen: "$seen",
              delivered: "$delivered",
              createdAt: "$createdAt",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              user: {
                $arrayElemAt: ["$user", 0],
              },
              message: "$message",
              seen: "$seen",
              delivered: "$delivered",
              createdAt: "$createdAt",
            },
          },
          {
            $project: {
              _id: "$user._id",
              message: 1,
              seen: 1,
              delivered: 1,
              createdAt: 1,
              name: "$user.name",
              email: "$user.email",
              avatar: "$user.avatar"
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ]);

        const blockedId = await userModel.aggregate([{
          $match: {
            _id: ObjectId(id),
          }
        },
        {
          $unwind: {
            path: "$friends"
          }
        },
        {
          $project: {
            _id: 0,
            userId: "$friends.user",
            blocked: "$friends.blocked"
          }
        },
        {
          $match: {
            blocked: true
          }
        },])
        const blocked = blockedId.map((e) => e.userId.toString())
        // console.log(recentChats)
        // const recent = recentChats.filter((e) => blockedId.find((d) => d.userId == e._id))
        if (blockedId.length > 0) {
          console.log(blocked)

          const recent = recentChats.filter((e) => {
            return !blocked.includes(e._id.toString())
          })
          // console.log(recent, blockedId, recentChats);
          socket.emit("recent-sent", recent, factor);
        } else {
          socket.emit("recent-sent", recentChats, factor)
        }
      });

      socket.on("get-messages", async (user, other) => {
        const messages = await messageModel.aggregate([
          {
            $match: {
              $or: [
                {
                  from: ObjectId(user),
                  to: ObjectId(other),
                },
                {
                  from: ObjectId(other),
                  to: ObjectId(user),
                },
              ],
            },
          },
          {
            $project: {
              type: {
                $cond: {
                  if: { $eq: ["$from", ObjectId(user)] },
                  then: "",
                  else: "other",
                },
              },
              from: 1,
              to: 1,
              message: 1,
              seen: 1,
              delivered: 1,
              chatRoom: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
        ]);
        socket.emit("chat-messages", messages);
      });

      socket.on("connect-user", (name) => {
        socket.emit("change-user", name);
      });

      socket.on("search-user", async (search, id) => {
        const exp = new RegExp(search, "i");
        const users = await userModel.find({
          name: exp,
        });

        socket.emit(
          "search-value",
          users.filter((e) => e._id != id)
        );
      });

      socket.on("search-friends", async (id, search) => {
        console.log(id, search);
        const exp = new RegExp(search, "i");
        const friends = await userModel.aggregate([{
          $match: {
            _id: ObjectId(id)
          }
        },
        {
          $unwind: {
            path: "$friends"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "friends.user",
            foreignField: "_id",
            as: "use"
          }
        },
        {
          $project: {
            _id: 0,
            block: "$friends.blocked",
            status: "$friends.status",
            use: {
              $arrayElemAt: ["$use", 0]
            }
          }
        },
        {
          $project: {
            block: 1,
            status: 1,
            _id: "$use._id",
            name: "$use.name",
            avatar: "$use.avatar"
          }
        }])
        const friend = friends.filter((e) => e.name.match(exp) && e.status == "accepted")
        console.log(friend);
        socket.emit("friend-list", friend)
      })

      socket.on("chat-select", async (id) => {
        if (id != "" && id != null) {
          const user = await userModel.findOne({ _id: id });
          socket.emit("user-detail", user);
        }
      });

      socket.on("send-message", async (message, sender, reciever, chatRoom) => {
        const messages = await messageModel.find({ chatRoom: chatRoom });
        if (messages.length == 0) {
          await userModel.updateOne(
            { _id: sender },
            { $push: { chatRooms: chatRoom } }
          );
          await userModel.updateOne(
            {
              _id: reciever,
            },
            { $push: { chatRooms: chatRoom } }
          );
        }
        await messageModel.create({
          from: sender,
          to: reciever,
          message: message,
          chatRoom: chatRoom,
        });

        io.to(reciever).emit("create-message", message);
      });

      socket.on("friend-request", async (userId, friendId) => {
        await userModel.updateOne(
          { _id: friendId },
          {
            $push: {
              friends: {
                user: userId,
                status: "requestIn",
              },
            },
          }
        );

        await userModel.updateOne(
          { _id: userId },
          {
            $push: {
              friends: {
                user: friendId,
                status: "requestOut",
              },
            },
          }
        );

        const user = await userModel.findOne({ _id: userId });

        io.to(friendId).emit("request-send", user);
      });

      socket.on("fetch-request", async (id) => {
        const users = await userModel.aggregate([
          {
            $match: {
              _id: ObjectId(id),
            },
          },
          {
            $unwind: {
              path: "$friends",
            },
          },
          {
            $match: {
              "friends.status": "requestIn",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "friends.user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              user: {
                $arrayElemAt: ["$user", 0],
              },
            },
          },
          {
            $project: {
              name: "$user.name",
              email: "$user.email",
              _id: "$user._id",
              number: "$user.number",
              activeStatus: "$user.activeStatus",
              avatar: "$user.avatar"
            },
          },
        ]);
        socket.emit("sent-user-request", users);
      });

      socket.on("on-accept", async (user, friend) => {
        await userModel.updateOne(
          { _id: user, "friends.user": friend },
          { $set: { "friends.$.status": "accepted" } }
        );

        await userModel.updateOne(
          { _id: friend, "friends.user": user },
          { $set: { "friends.$.status": "accepted" } }
        );
      });

      socket.on("on-decline", async (user, friend) => {
        await userModel.updateMany(
          { _id: user },
          { $pull: { friends: { user: friend } } }
        );

        await userModel.updateMany(
          { _id: friend },
          { $pull: { friends: { user: user } } }
        );
      });

      // socket.on("search-user", async (search) => {
      //   console.log(search);
      //   const exp = new RegExp(search, "i");
      //   const users = await userModel.find({
      //     name: exp,
      //   });
      //   socket.emit("search-value", users);
      // });

      socket.on("create-room", (roomId, user) => {
        socket.join(roomId);
        io.to(user._id).emit("create-video", roomId);
      });

      socket.on("video-agree", (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit("agree-video", roomId);
      });

      socket.on("join-video", (userId, roomId) => {
        socket.to(roomId).emit("video-join", userId);
      });

      socket.on("desagree", (userId) => {
        socket.to(userId).emit("name")
      });

      socket.on("show-friends", async (id) => {
        const users = await userModel.aggregate([
          {
            $match: {
              _id: ObjectId(id),
            },
          },

          {
            $unwind: {
              path: "$friends",
            },
          },
          {
            $match: {
              "friends.status": "accepted",
            }
          }, {
            $unwind: "$friends"
          },
          {
            $count:
              "Bondings"
          }
        ])
        socket.emit("bondings", users)
      })
    });
  });
};

module.exports = SocketServer;
