import mongoose from "mongoose";

export interface Icar extends mongoose.Document {
  licensePlate: string;
  time: string;
}

export const carSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true },
  time: { type: String, require: true },
});

const User = mongoose.model<Icar>("User", carSchema);
export default User;
