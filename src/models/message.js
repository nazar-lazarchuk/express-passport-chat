const { Schema, model } = require('mongoose');

const messageScheme = new Schema(
  {
    userId: {
      type: String,
      unique: false,
      required: true,
    },
    content: {
      type: String,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports.MessageModel = model('Message', messageScheme);
