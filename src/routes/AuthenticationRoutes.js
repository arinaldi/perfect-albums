import express from 'express';
const router = express.Router();
import { signUp, signIn } from '../controllers/AuthenticationController';
import passport from 'passport';
import '../services/passport';

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// router.post('/api/signup', signUp );
router.post('/api/signin', signinStrategy, signIn);

export default router;
