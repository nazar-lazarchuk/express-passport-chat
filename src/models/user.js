const { Schema, model } = require('mongoose');

const userScheme = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    roles: {
      type: [String],
      default: ['User'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports.UserModel = model('User', userScheme);
