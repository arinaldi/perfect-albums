import express from 'express';
import {
  list,
  show
} from '../controllers/AlbumController';

const router = express.Router();

router.get('/albums', list);
router.get('/albums/:id', show);

export default router;
