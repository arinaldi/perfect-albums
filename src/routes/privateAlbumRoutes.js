import express from 'express';
import { create, edit, remove } from '../controllers/AlbumController';

const router = express.Router();

router.post('/api/albums', create);
router.put('/api/albums/:id', edit);
router.delete('/api/albums/:id', remove);

export default router;
