import express from 'express';
import { service } from '../controller/book.controller.js';
// import { verifyToken } from '../middleware/verfiyToken.js';

const router=express.Router();

router.get('/service',service)

export default router;