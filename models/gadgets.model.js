import mongoose from "mongoose";

const GadgetSchema = new mongoose.Schema(
  {
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
      default: "Available",
      required: true,
    },
    decommisionedAt: {
      type: Date,
      default: null,
    },
    selfDestructAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Gadget = mongoose.model("Gadget", GadgetSchema);
