import express from 'express';
import { list } from '../controllers/InstaController';

const router = express.Router();

router.get('/instagram', list);

export default router;
