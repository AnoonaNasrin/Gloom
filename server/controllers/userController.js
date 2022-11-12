const userModel = require("../models/userModel");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;
const multer = require('multer')

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
exports.upload = (req, res) => {
    console.log(req.file);
    res.status(200).json({
        success: "success"
    })
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
        console.log(friend);

        const block = await userModel.updateOne({ _id: userId, "friends.user": friendId }, { $set: { "friends.$.blocked": !friend[0].blocked } })

        res.json({ status: true, message: "success" })

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

