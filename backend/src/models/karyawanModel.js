const mongoose = require("mongoose");

const KaryawanSchema = new mongoose.Schema(
  {
    // _id: { type: String, default: uuidv4 },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    position: String,
    department: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatarUrl: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Karyawan", KaryawanSchema);
