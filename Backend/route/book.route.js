import express from "express";
import { getBook, getOneBook, searchBook } from "../controller/book.controller.js";
// import { verifyToken } from "../middleware/verfiyToken.js";

const router = express.Router();
router.get("/", getBook);
router.get("/search", searchBook);
router.get("/:id", getOneBook);

export default router;