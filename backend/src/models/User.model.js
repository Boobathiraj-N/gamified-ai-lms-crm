
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["student", "support", "sales", "admin"],
      required: true,
    },

    profileType: {
      type: String,
      enum: ["student", "working", "fresher"],
      required: function () {
        return this.role === "student";
      },
    },

    assignedSupport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedSales: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Account login panna active-ah irukka nu check panna
    isActive: {
      type: Boolean,
      default: function () {
        return this.role === "student";
      },
    },

    // Staff activation token-oda hash
    activationTokenHash: {
      type: String,
      select: false,
      default: undefined,
    },

    // Activation link expiry time
    activationTokenExpiry: {
      type: Date,
      select: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;