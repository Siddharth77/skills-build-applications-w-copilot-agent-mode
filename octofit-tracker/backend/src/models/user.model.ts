import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "user" | "coach" | "admin";
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["user", "coach", "admin"], default: "user" },
  createdAt: { type: Date, default: () => new Date() },
});

export const UserModel = model<IUser>("User", userSchema);
