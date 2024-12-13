// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const User = require('./UserModel/Model');
const path = require('path');

// Initialize the Express Router
const router = express.Router();

// Path for the Extensions directory
const extensionsPath = path.join(__dirname, '..', '..', 'Extensions');

// Route to download a plugin
router.get('/download/:plugin', (req, res) => {
    const { plugin } = req.params;
    const safePluginName = plugin.replace(/[^a-zA-Z0-9-_]/g, '');

    const filePath = path.join(extensionsPath, `${safePluginName}.zip`);
    res.download(filePath, `${safePluginName}.zip`, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error downloading the plugin');
        }
    });
});

// Route to delete a user
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

// Route to update a user
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

// Route to create a new user
router.post('/', async (req, res) => {
    const { name, mail, disability, shortcutKey } = req.body;
    if (!name || !mail || !disability || !shortcutKey) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }
        const newUser = new User({ name, mail, disability, shortcutKey });
        await newUser.save();
        res.status(201).json({ success: true, data: newUser, password: newUser._id.toString() });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating user' });
    }
});

// Export the router
module.exports = router;
