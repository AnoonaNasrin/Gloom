const mongoose = require("mongoose");
const collection = require("../util/collection");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  number: {
    type: String,
  },
  activeStatus: {
    type: String,
  },
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      status: {
        type: String,
      },
      blocked: {
        type: Boolean,
        default: false
      },
    },
  ],
  chatRooms: [
    {
      type: String,
    },
  ],
  avatar: {
    type: String,
  }
});

module.exports = mongoose.model(collection.userModel, userSchema);
