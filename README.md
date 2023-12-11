# Node.js To-do App

This is a simple Node.js To-do App implementing CRUD operations with user-specific functionalities. The app uses a Restful API built with Node.js, Express.js, and Typescript, and the data is stored in a MongoDB database.

## Functionalities

1. **Add New To-Do:**
   - Endpoint: `POST /api/todo`
   - Description: Add a new to-do for a specific user.

2. **Update To-Do:**
   - Endpoint: `PUT /api/todo/:id`
   - Description: Update an existing to-do for a specific user.

3. **Delete To-Do:**
   - Endpoint: `DELETE /api/todo/:id`
   - Description: Delete an existing to-do for a specific user.

4. **Get To-Do Information:**
   - Endpoint: `GET /api/todo/:id`
   - Description: Get information about a specific to-do for a specific user.

5. **Get All To-Do:**
   - Endpoint: `GET /api/todo/all/:userId`
   - Description: Get all to-dos for a specific user.

## Technologies Used

- Node.js
- Express.js
- Typescript
- MongoDB

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedyousry0098/express-todo.git
2. cd express-todo
3. clone .env file in root directory
4. npm install
5. npm i typescript nodemon ts-node
6. npm run start:dev
