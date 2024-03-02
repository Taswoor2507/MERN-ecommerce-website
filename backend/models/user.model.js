import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
      minLength: [3, "Names should include atleast 3 characters"],
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: true,
    },

    password: {
      type: String,
      minLength: [8, "Password should include 8 characters"],
      select: false,
    },

    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    role: {
      type: String,
      default: true,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpiry: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// get JSON web token
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(this.password, password);
};

const User = mongoose.model("User", userSchema);

// password hashing

export default User;
