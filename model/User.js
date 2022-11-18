import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "lastname",
  },
  location: {
    type: String,
    maxLength: 20,
    trim: true,
    default: "my city",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
