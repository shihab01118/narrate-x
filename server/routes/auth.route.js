import express from 'express';
import { SignIn, signUp, signInWithGoogle } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', SignIn);

router.post('/google-auth', signInWithGoogle);

export default router;
