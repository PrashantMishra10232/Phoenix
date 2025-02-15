import {Router} from "express";
import {isAuthenticatedUser} from "../middlewares/auth.js";
import {
    registerUser,
    loginUser,
    logOut,
    updateUserProfile,
    refreshAccessToken
} from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/refreshToken").post(isAuthenticatedUser,refreshAccessToken);

router.route("logOut").post(isAuthenticatedUser,logOut);

router.route("/update").patch(isAuthenticatedUser,updateUserProfile);

export default router;