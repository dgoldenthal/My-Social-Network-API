# My Social Network API

## Description

This is a REST API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. The API is built using Express.js for routing, MongoDB as the database, and Mongoose ODM for data modeling.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Features](#features)
- [Models](#models)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)

## Project Structure

1. **config/**
   * Contains database configuration
   * Separates MongoDB connection logic from server setup

2. **controllers/**
   * Handles the business logic for routes
   * Separates route handling from route definitions
   * Makes code more maintainable and testable

3. **models/**
   * Contains all Mongoose models
   * Separates data schema definitions
   * index.js exports all models for easy importing

4. **routes/**
   * Organizes API endpoints
   * Separates routing logic from business logic
   * Uses modular routing with Express Router

5. **utils/**
   * Contains helper functions and utilities
   * Includes date formatting for timestamps

### Directory Structure
```
social-network-api/
├── config/
│   └── connection.js         // MongoDB connection configuration
├── controllers/
│   ├── thought-controller.js // Thought route handlers
│   └── user-controller.js    // User route handlers
├── models/
│   ├── index.js             // Export all models
│   ├── Thought.js           // Thought model and reaction schema
│   └── User.js              // User model
├── routes/
│   ├── api/
│   │   ├── index.js         // Combine all routes
│   │   ├── thought-routes.js
│   │   └── user-routes.js
│   └── index.js             // API route configuration
├── utils/
│   └── dateFormat.js        // Date formatting utilities
├── server.js                // Entry point
└── package.json            // Dependencies and scripts
```

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/dgoldenthal/My-Social-Network-API.git>
```

2. Navigate to the project directory:
```bash
cd My-social-network-api
```

3. Install dependencies:
```bash
npm install
```

4. Make sure MongoDB is installed and running on your machine.

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Features

1. **Core Functionality**:
   * MongoDB connection with Mongoose
   * Email validation
   * Timestamp formatting
   * Cascade deletion of thoughts when a user is deleted
   * Friend and reaction management
   * Proper population of referenced data

2. **Models**:
   * User model with username, email, thoughts, and friends
   * Thought model with thoughtText, createdAt, username, and reactions
   * Reaction schema (embedded in Thought model)
   * Virtual properties for friendCount and reactionCount

## API Routes

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get single user by ID with populated thought and friend data
- `POST /api/users` - Create a new user
  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```
- `PUT /api/users/:userId` - Update a user
- `DELETE /api/users/:userId` - Delete a user and their thoughts

### Friends
- `POST /api/users/:userId/friends/:friendId` - Add a friend to user's friend list
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from user's friend list

### Thoughts
- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get a single thought by ID
- `POST /api/thoughts` - Create a new thought
  ```json
  {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  }
  ```
- `PUT /api/thoughts/:thoughtId` - Update a thought
- `DELETE /api/thoughts/:thoughtId` - Delete a thought

### Reactions
- `POST /api/thoughts/:thoughtId/reactions` - Create a reaction
  ```json
  {
    "reactionBody": "What a great thought!",
    "username": "amiko"
  }
  ```
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Delete a reaction (use reaction's `_id`)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JavaScript Date object for timestamps

## Testing

All API routes can be tested using Insomnia or similar API testing tools. Make sure to:
1. Keep track of the IDs returned in responses
2. Test GET requests after each POST/PUT/DELETE to verify changes
3. Watch for the status codes:
   - 200: Success
   - 404: Not found
   - 400: Bad request
   - 500: Server error