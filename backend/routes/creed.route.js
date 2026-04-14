import express from 'express';
import { postCreed } from '../controllers/creed.controller';

const router = express.Router();

router.post('/', postCreed);
router.get('/', getCreed);
router.put('/:id', updateCreed);

export default router;