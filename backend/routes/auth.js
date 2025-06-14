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
    
    // Compare input credentials with environment variables
    if (email === process.env.USER_EMAIL && password === process.env.PASSWORD) {
      const token = jwt.sign(
        { email: process.env.USER_EMAIL, username: process.env.USER_USERNAME },
        process.env.JWT_SECRET,
        { expiresIn: '60m' }
      );

      res.cookie("Token", token, {
        httpOnly: true,
        sameSite: 'Lax',
        secure: process.env.NODE_ENV === 'production'
      });

      return res.json(
        { status :'Success',   
        user: {
          email: process.env.USER_EMAIL,
          username: process.env.USER_USERNAME
        }
       });
    } else {
      return res.json('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});


// Logout
router.get('/logout', verifyUser, (req, res) => {
  res.clearCookie('Token');
  return res.json('Success');
});

module.exports = router;
