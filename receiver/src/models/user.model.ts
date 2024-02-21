import mongoose from 'mongoose';
import validator from 'validator';
const {isEmail} = validator;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, 'Please specify an email'],
      validate: [isEmail, 'Please specify a valid email'],
    },
    projectName: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Please specify a project name'],
    },
  },
  {timestamps: true}
);

const USERMODEL = mongoose.model('user', userSchema);

export default USERMODEL;
