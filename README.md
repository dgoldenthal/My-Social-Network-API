# Social Network API

## Description

This is a REST API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. The API is built using Express.js for routing, MongoDB as the database, and Mongoose ODM for data modeling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/dgoldenthal/My-Social-Network-API.git>
```

2. Navigate to the project directory:
```bash
cd social-network-api
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

## Usage

The API can be tested using Insomnia or any other API testing tool. The server will run on `http://localhost:3001`.

### API Routes

#### Users
- GET `/api/users` - Get all users
- GET `/api/users/:userId` - Get single user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/:userId` - Update a user
- DELETE `/api/users/:userId` - Delete a user

#### Friends
- POST `/api/users/:userId/friends/:friendId` - Add a friend
- DELETE `/api/users/:userId/friends/:friendId` - Remove a friend

#### Thoughts
- GET `/api/thoughts` - Get all thoughts
- GET `/api/thoughts/:thoughtId` - Get single thought by ID
- POST `/api/thoughts` - Create a new thought
- PUT `/api/thoughts/:thoughtId` - Update a thought
- DELETE `/api/thoughts/:thoughtId` - Delete a thought

#### Reactions
- POST `/api/thoughts/:thoughtId/reactions` - Create a reaction
- DELETE `/api/thoughts/:thoughtId/reactions/:reactionId` - Delete a reaction

## Models

### User
- username (String, unique, required, trimmed)
- email (String, required, unique, must match valid email)
- thoughts (Array of _id values referencing Thought model)
- friends (Array of _id values referencing User model)
- friendCount (Virtual)

### Thought
- thoughtText (String, required, 1-280 characters)
- createdAt (Date, default to current timestamp)
- username (String, required)
- reactions (Array of nested reaction documents)
- reactionCount (Virtual)

### Reaction (Schema Only)
- reactionId (ObjectId, default to new ObjectId)
- reactionBody (String, required, 280 character maximum)
- username (String, required)
- createdAt (Date, default to current timestamp)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JavaScript Date object for timestamps

## Screenshots

[Include screenshots of your Insomnia testing here]
