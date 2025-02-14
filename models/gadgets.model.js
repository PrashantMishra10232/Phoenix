import mongoose from "mongoose";

const GadgetSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Deployed", "Destroyed", "Decommissioned"],
    required: true,
  },
},{timestamps:true});

export const Gadgets = mongoose.model("Gadgets",GadgetSchema)