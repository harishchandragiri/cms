const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PostModel = require('../models/PostModel');
const verifyUser = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'Public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create post
router.post('/create', verifyUser, upload.single('file'), async (req, res) => {
  try {
    const result = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      file: req.file.filename,
      email: req.body.email
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

// Get all posts
router.get('/getposts', async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (err) {
    res.json(err);
  }
});

// Get post by ID
router.get('/getpostsbyid/:id', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

// Edit post
router.put('/editpost/:id', async (req, res) => {
  try {
    const result = await PostModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description
    });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

// Delete post
router.delete('/deletepost/:id', async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post) {
      fs.unlink(path.join(__dirname, '..', 'Public', post.file), async (err) => {
        if (err) {
          return res.json({ error: 'File deletion failed', err });
        }
        await PostModel.findByIdAndDelete(req.params.id);
        res.json('Success');
      });
    } else {
      res.json('Post not found');
    }
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
