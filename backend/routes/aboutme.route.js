import express from 'express';
import { postAboutMe, getAboutMe, updateAboutMe } from '../controllers/aboutme.controller';

const router = express.Router();

router.post('/', postAboutMe);
router.get('/', getAboutMe);
router.put('/:id', updateAboutMe);

export default router;