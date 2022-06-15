import express from "express";
const router = express.Router();
import {
  authLogin,
  authRegister,
  changePassword,
  forgotPassAndResetPassWithEmail,
  isLoggedIn,
  resetPassword,
} from "../controllers/authControllers.js";
import passwordMiddleware from "../middleware/auth-middleware.js";

//middleware check
router.use('/change-password', passwordMiddleware)
router.use('/isLoggedIn', passwordMiddleware)

// public routes
router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/forgot-password", forgotPassAndResetPassWithEmail); 
router.post("/reset-password/:id/:resetLink", resetPassword); 

// Private routes
router.post("/change-password", changePassword);
router.get("/isLoggedIn", isLoggedIn);

export { router };
