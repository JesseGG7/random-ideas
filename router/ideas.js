const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.send({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Get a single idea by ID
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res
        .status(404)
        .json({ success: false, message: 'Idea not found' });
    }
    res.send({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// add a new idea
router.post('/', async (req, res) => {
  const { text, tag, username } = req.body;
  const newIdea = new Idea({
    text,
    tag,
    username,
  });
  try {
    const idea = await newIdea.save();
    res.status(201).send({ success: true, data: idea });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update an existing idea by ID
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      const { text, tag } = req.body;
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        { $set: { text, tag } },
        { new: true },
      );
      return res.send({ success: true, data: updatedIdea });
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Delete an idea by ID
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.send({ success: true, data: {} });
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
});
module.exports = router;
