import mongoose from "mongoose";
import validator from "validator";

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
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
