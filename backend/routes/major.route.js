import express from 'express';
import { uploadMajor } from '../controllers/major.controller';

const router = express.Router();

router.post("/", uploadMajor);
router.get("/", getMajors);
router.put("/:id", updateMajor);

export default router;