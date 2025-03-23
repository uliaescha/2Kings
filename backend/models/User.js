import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const userSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    tokenExpires: { type: Date },
  },
  { timestamps: true }
);
const AutoIncrement = AutoIncrementFactory(mongoose.connection);
userSchema.plugin(AutoIncrement, { inc_field: "userId" });


const User = mongoose.model("User", userSchema);
export default User;
