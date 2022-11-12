const mongoose = require("mongoose");
const collection = require("../util/collection");

const messageSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    message: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    chatRoom: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(collection.messageModel, messageSchema);
