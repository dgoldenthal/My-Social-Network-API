// controllers/user-controller.js
const { User, Thought } = require('../models');

const userController = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single user by id
  async getUserById(req, res) {
    try {
      if (!req.params.userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends')
        .select('-__v');
        
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      
      res.json(user);
    } catch (err) {
      console.error('Error in getUserById:', err);
      res.status(500).json({ 
        message: 'Internal server error',
        error: err.message 
      });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      // Remove user's thoughts
      await Thought.deleteMany({ username: user.username });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Remove friend
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = userController;