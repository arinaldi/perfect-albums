import express from 'express';
import {
  // create,
  edit,
  // remove
} from '../controllers/AlbumController';

const router = express.Router();

// router.post('/albums', create);
router.put('/albums/:id', edit);
// router.delete('/albums/:id', remove);

export default router;
