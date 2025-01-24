import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const generateUsername = async (email) => {
  let username = email.split('@')[0];

  const isUsernameExists = await User.exists({
    'personal_info.username': username
  });

  isUsernameExists ? (username += nanoid().substring(0, 5)) : username;

  return username;
};

export const formatUserDataToSend = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

  return {
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
    token: accessToken
  };
};
