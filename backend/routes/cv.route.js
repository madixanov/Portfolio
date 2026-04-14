import express from 'express';

const router = express.Router();

router.post("/", uploadCV);
router.get("/", getCV);

export default router;