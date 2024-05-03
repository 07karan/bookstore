import express from "express";
import { signup, login, contact,forgetpassword, resetpassword, problem, sendotp, verifyotp } from "../controller/user.controller.js";
import { generateInvoice, makePayment } from "../controller/payment.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/contact", contact);
router.post("/forgotpassword", forgetpassword);
router.put("/resetpassword/:id", resetpassword);
router.post("/problem", problem);
router.post("/order", makePayment);
router.post("/generateinvoice", generateInvoice);
router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyotp);

export default router;