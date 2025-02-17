import {Router} from "express";
import {isAuthenticatedUser} from "../middlewares/auth.js";
import {createGadget, getAllGadgets ,updateDetails,deleteGadget,selfDestruct} from "../controllers/gadgets.controller.js";

const router = Router();

router.route("/add").post(isAuthenticatedUser,createGadget);

router.route("/getAll").get(isAuthenticatedUser,getAllGadgets);

router.route("/update/:id").patch(isAuthenticatedUser,updateDetails);

router.route("/delete/:id").delete(isAuthenticatedUser,deleteGadget);

router.route("/selfDestruct/:id").post(isAuthenticatedUser,selfDestruct);

export default router;