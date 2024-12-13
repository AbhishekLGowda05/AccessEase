const express = require('express');
const mongoose = require('mongoose');
const User = require('./UserModel/Model');

const router = express.Router();

router.get('/getEx', async (req, res) => {
  try {
    const users = await User.find({});
    const pluginData = users.map((user) => {
      let pluginLink = '';
      switch (user.disability.toLowerCase()) {
        case 'blind':
          pluginLink = 'http://localhost:5000/Extensions/';
          break;
        case 'deaf':
          pluginLink = 'http://localhost:5000/Extensions/';
          break;
        case 'dumb':
          pluginLink = 'http://localhost:5000/Extensions/';
          break;
        default:
          pluginLink = '';
      }
      return { ...user.toObject(), pluginLink };
    });
    res.status(200).json({ success: true, data: pluginData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid user ID' });
  }
  const { name, mail, disability, shortcutKey } = req.body;
  if (!name || !mail || !disability || !shortcutKey) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, mail, disability, shortcutKey },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user' });
  }
});

router.post('/', async (req, res) => {
  const { name, mail, disability, shortcutKey } = req.body;
  if (!name || !mail || !disability) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  try {
    let user= User.findOne({name});
    if(!user){
    const newUser = new User({ name, mail, disability, shortcutKey });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser, password:newUser._id.toString()});
  }
} catch (error) {
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

module.exports = router;
