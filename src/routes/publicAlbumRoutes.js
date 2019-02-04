import express from 'express';
import { list, show } from '../controllers/AlbumController';

const router = express.Router();

router.get('/api/albums', list);
router.get('/api/albums/:id', show);

export default router;
