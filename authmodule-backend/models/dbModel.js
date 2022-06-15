import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tc: {
    type: Boolean,
    required: true,
  },
});

//Model
const AuthModel = mongoose.model("auth", authSchema);

export default AuthModel