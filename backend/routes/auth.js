const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const verifyUser = require('../middleware/authMiddleware');

const router = express.Router();

// Home or dashboard
router.get('/', verifyUser, (req, res) => {
  return res.json({ email: req.email, username: req.username });
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // const user = await UserModel.findOne({ email });

    const user = {
    email: process.env.USER_EMAIL,
    username: process.env.USER_USERNAME,
    password: process.env.PASSWORD
    };

    if (user) {
      // const match = await bcrypt.compare(password, user.password);

            const match = user.password === password;

      if (match) {
        const token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60m' });
        res.cookie("Token", token, {
          httpOnly: true,
          sameSite: 'Lax',
          secure: process.env.NODE_ENV === 'production' 
        });
        return res.json('Success');
      } else {
        return res.json('Password Incorrect');
      }
    } else {
      return res.json('User does not exist');
    }
  } catch (err) {
    res.json(err);
  }
});

// Logout
router.get('/logout', verifyUser, (req, res) => {
  res.clearCookie('Token');
  return res.json('Success');
});

module.exports = router;
