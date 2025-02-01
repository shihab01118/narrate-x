import bcrypt from 'bcrypt';
import admin from '../utils/firebase.js';
import { getAuth } from 'firebase-admin/auth';

import User from '../models/User.js';
import { formatUserDataToSend, generateUsername } from '../utils/index.js';

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (fullname.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Fullname must be at least 3 characters long!'
    });
  }

  if (!email.length) {
    return res.status(400).json({
      success: false,
      message: 'Email is required!'
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Email is invalid!'
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        'Password should be 6 to 20 characters long with a numeric, uppercase and lowercase letter!'
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await generateUsername(email);

    const user = new User({
      personal_info: {
        fullname,
        email,
        password: hashedPassword,
        username
      }
    });

    const savedUser = await user.save();
    return res.status(201).json({
      success: true,
      message: 'Signup successful!',
      user: formatUserDataToSend(savedUser)
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists!'
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ 'personal_info.email': email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!'
      });
    }

    if (user.google_auth) {
      return res.status(400).json({
        success: false,
        message: 'Email registered with Google. Use Google login.'
      });
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.personal_info.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Password!' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: formatUserDataToSend(user)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const signInWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: 'Access token is required' });

    const decodedUser = await getAuth().verifyIdToken(token);
    const { email, name, picture } = decodedUser;
    const profileImg = picture.replace('s96-c', 's384-c');

    let user =
      (await User.findOne({ 'personal_info.email': email }).select(
        'personal_info.fullname personal_info.email personal_info.profile_img google_auth'
      )) || null;

    if (user) {
      if (!user.google_auth) {
        return res.status(400).json({
          success: false,
          message: 'Email registered without Google. Use password login.'
        });
      }
    } else {
      const username = await generateUsername(email);
      user = new User({
        personal_info: {
          fullname: name,
          email,
          username
        },
        google_auth: true
      });

      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Google login successful!',
      user: formatUserDataToSend(user)
    });
  } catch (error) {
    console.error('Google authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Google authentication failed. Try again.'
    });
  }
};
