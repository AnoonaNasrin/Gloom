const userModel = require("../models/userModel");
const mongoose = require("mongoose")
const fs = require('fs')
const ObjectId = mongoose.Types.ObjectId;
const multer = require('multer');
const { DiffieHellmanGroup } = require("crypto");

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${ext}`);
    },
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startWith('image')) {
        callback(null, true);
    } else {
        callback()
    }
}

const upload = multer({
    storage: multerConfig,
})

exports.uploadImage = upload.single('photo')
exports.upload = async (req, res) => {
    try {
        const userId = req.body.userId
        const user = await userModel.findOne({ _id: userId })
        fs.readFile('public/' + user.avatar, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            fs.unlinkSync('public/' + user.avatar)
        })
        const avatar = await userModel.updateOne({ _id: userId }, { $set: { avatar: req.file.filename } })
        res.json({ status: true, image: null })
    } catch (e) {
        console.log(e);
        res.json({ message: e.message, status: false })
    }

}

exports.removePhoto = async (req, res) => {
    try {
        const userId = req.body.userId
        const user = await userModel.updateOne({ _id: userId }, { $set: { avatar: null } })
        res.json({ status: true })
    } catch (er) {
        console.log(er);
        res.json({ status: false, image: user.avatar })
    }

}

exports.requestUserImage = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await userModel.findOne({ _id: userId })
        res.json({ status: true, image: user.avatar })
    } catch (e) {
        res.json({ message: e.message, status: false })
    }
}


exports.friendsCount = async (req, res) => {
    try {
        const userId = req.params.userId
        const friends = await userModel.aggregate([
            {
                $match: {
                    _id: ObjectId(userId)
                }
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
            },
            {
                $project: {
                    _id: 0,
                    user: "$friends.user",
                    status: "$friends.status"
                }
            }
        ])
        res.json({ status: true, friends: friends })
    } catch (err) {
        res.json({ message: err.message, status: false })
    }
}

exports.findUserProfile = async (req, res) => {
    try {

        const userId = req.params.userId
        const findProfile = await userModel.findOne({ _id: userId })

        res.json({ status: true, user: findProfile })

    } catch (e) {

        res.json({ message: e.message, status: false })
    }
}

exports.friendBlock = async (req, res) => {
    try {
        const userId = req.body.userId
        const friendId = req.body.friendId

        const friend = await userModel.aggregate([{
            $match: {
                _id: ObjectId(userId)
            }
        },
        {
            $unwind: {
                path: "$friends"
            }
        },
        {
            $match:
            {
                "friends.user": ObjectId(friendId)
            }
        },

        {
            $project:
            {
                "blocked": "$friends.blocked",
                _id: 0
            }
        }])

        const block = await userModel.updateOne({ _id: userId, "friends.user": friendId }, { $set: { "friends.$.blocked": !friend[0].blocked } })

        res.json({ status: true, message: "success", block: !friend[0].blocked })

    } catch (e) {

        res.json({ message: e.message, status: false })
        console.log(e);
    }
}
exports.findBlock = async (req, res) => {
    try {
        const userId = req.body.userId
        const friendId = req.body.friendId

        const isBlock = await userModel.aggregate([{
            $match: {
                _id: ObjectId(userId)
            }
        },
        {
            $unwind: {
                path: "$friends"
            }
        },
        {
            $match:
            {
                "friends.user": ObjectId(friendId)
            }
        },

        {
            $project:
            {
                "blocked": "$friends.blocked",
                _id: 0
            }
        }])

        res.json({ status: true, block: isBlock[0].blocked })

    } catch (e) {

        res.json({ status: false, message: e.message })
    }
}

exports.blockCount = async (req, res) => {
    try {
        const userId = req.params.userId
        const blocked = await userModel.aggregate([{
            $match: {
                _id: ObjectId(userId)
            }
        },
        {
            $unwind: {
                path: "$friends"
            }
        },
        {
            $match: {
                _id: ObjectId(userId),
                "friends.blocked": true
            }
        },
        {
            $project: {
                _id: 0,
                "blocked": "$friends.blocked"
            }
        }])
        console.log(blocked);
        res.json({ status: true, block: blocked })
    } catch (er) {
        console.log(er);
        res.json({ status: false, message: er.message })

    }
}

exports.frindList = async (req, res) => {
    try {
        const userId = req.params.userId
        const friend = await userModel.aggregate([{
            $match: {
                _id: ObjectId(userId)
            }
        }, {
            $unwind: {
                path: "$friends"
            }
        }
            ,
        {
            $lookup: {
                from: "users",
                localField: "friends.user",
                foreignField: "_id",
                as: "bond"
            }

        },
        {
            $project: {
                "bond": { $arrayElemAt: ["$bond", 0] },
                "friends.blocked": 1,

            }
        },
        {
            $project: {
                "bond.name": 1,
                "bond.avatar": 1,
                "bond._id": 1,
                "friends.blocked": 1

            }
        }
        ])

        res.json({ status: true, friends: friend })
        console.log(friend);

    } catch (err) {
        console.log(err);
        res.json({ message: err.message })
    }
}

