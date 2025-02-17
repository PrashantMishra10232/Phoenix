import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Gadget } from "../models/gadgets.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v4 as uuidv4 } from "uuid";

//function to generate random codenames for gadgets
const generateRandomCodeName = () => {
  const names = ["The Nightingale", "The Kraken", "The Dragon", "The Wolf"];
  return names[Math.floor(Math.random() * names.length)];
};

//function to generate mission success probability

const createGadget = asyncHandler(async (req, res) => {
  const gadget = await Gadget.create({
    id: uuidv4(),
    name: generateRandomCodeName(),
  });

  if (!gadget) {
    throw new ApiError(500, "Error adding gadget");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, gadget, "New gadget added successfully"));
});

const getAllGadgets = asyncHandler(async (req, res) => {
  const gadgets = await Gadget.aggregate([
    {
      $addFields: {
        missionSuccessProbability: {
          $floor: { $multiply: [{ $rand: {} }, 100] },
        }, //will generate random probability
      },
    },
  ]);

  if (!gadgets || gadgets.length === 0) {
    throw new ApiError(404, "No gadgets found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, gadgets, "All Gadgets retrieved successfully"));
});

const updateDetails = asyncHandler(async (req, res) => {
  const gadgetId = req.params.id;

  const { name, status } = req.body;

  const allowedStatus = ["Deployed", "Destroyed", "Decommissioned"];
  if (status && !allowedStatus.includes(status)) {
    throw new ApiError(400, "Invalid Status provided");
  }

  const gadget = await Gadget.findByIdAndUpdate(
    gadgetId,
    req.body,
    {
      $set: { name, status },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!gadget) {
    throw new ApiError(404, "Gadget not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, gadget, "Gadget updated successfully"));
});

const deleteGadget = asyncHandler(async (req, res) => {
  const gadgetId = req.params.id;

  const gadget = await Gadget.findByIdAndUpdate(
    gadgetId,
    {
      $set : {status: "Decommissioned",
      decommisionedAt: new Date(),}
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!gadget) {
    throw new ApiError(404, "No Gadget Found");
  }

  return res.status(200)
  .json(new ApiResponse(200, gadget, "Gadget deleted successfully")
  );
});

const selfDestruct = asyncHandler(async (req, res) => {
  const gadgetId = req.params.id;

  //6 digit random code
  const confirmationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const gadget = await Gadget.findByIdAndUpdate(
    gadgetId,
    {
      $set: {status: "Destroyed",
      selfDestructAt: new Date(),}
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!gadget) {
    throw new ApiError(404, "Gadget not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { gadget, confirmationCode },
        "Self-destruct sequence initialized"
      )
    );
});
export {
  createGadget,
  getAllGadgets,
  updateDetails,
  deleteGadget,
  selfDestruct,
};
