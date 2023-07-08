const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  user_name: {
    type: String,
    required: [true, "El user_name es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

//modificar la respuesta
UserSchema.methods.toJSON = function () {
  const { __v, _id, ...rest } = this.toObject();

  return rest;
};

module.exports = model("user", UserSchema, "users");
