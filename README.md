# API Documentation

## Overview
This API provides endpoints for user authentication, task management, and secure operations using JWT-based authentication. 

### Base URL
`http://<your-domain-or-ip>:<port>`

---

## Authentication Endpoints

### 1. **Signup**  
**POST** `/auth/signup`  
Create a new user account.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response
- **201 Created**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```
- **400 Bad Request**: Missing fields or email already exists.

---

### 2. **Login**  
**POST** `/auth/login`  
Authenticate a user and generate a JWT.

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response
- **200 OK**
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "token": "jwt-token"
}
```
- **401 Unauthorized**: Invalid credentials.

---
## Task Management Endpoints

### 1. **Add Task**  
**POST** `/tasks`  
Create a new task.

#### Request Body
```json
{
  "title": "Task Title",
  "description": "Task Description",
  "userId": "user-id",
  "category": "Work"
}
```

#### Response
- **201 Created**
```json
{
  "success": true,
  "data": {
    "id": "task-id",
    "title": "Task Title",
    "description": "Task Description",
    "userId": "user-id",
    "category": "Work"
  }
}
```
- **400 Bad Request**: Missing required fields.

---

### 2. **Get Task By ID**  
**GET** `/tasks/:id`  
Retrieve a specific task by its ID.

#### Response
- **200 OK**
```json
{
  "success": true,
  "data": {
    "id": "task-id",
    "title": "Task Title",
    "description": "Task Description",
    "userId": "user-id",
    "category": "Work"
  }
}
```
- **404 Not Found**: Task not found.

---

### 3. **Get Tasks By User ID**  
**GET** `/tasks/user/:userId`  
Retrieve tasks for a specific user.

#### Response
- **200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "task-id-1",
      "title": "Task 1",
      "description": "Description for Task 1",
      "userId": "user-id",
      "category": "Work"
    },
    {
      "id": "task-id-2",
      "title": "Task 2",
      "description": "Description for Task 2",
      "userId": "user-id",
      "category": "Personal"
    }
  ]
}
```

---

### 4. **Update Task**  
**PUT** `/tasks/:id`  
Update an existing task by its ID.

#### Request Body
```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description"
}
```

#### Response
- **200 OK**
```json
{
  "success": true,
  "data": {
    "id": "task-id",
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "userId": "user-id",
    "category": "Work"
  }
}
```
- **404 Not Found**: Task not found.

---

### 5. **Delete Task**  
**DELETE** `/tasks/:id`  
Delete a specific task by its ID.

#### Response
- **200 OK**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```
- **404 Not Found**: Task not found.

---

### 6. **Get Tasks By Category**  
**GET** `/tasks/category/:category`  
Retrieve tasks by their category.

#### Response
- **200 OK**
```json
{
  "success": true,
  "data": [
    {
      "id": "task-id-1",
      "title": "Task 1",
      "description": "Description for Task 1",
      "userId": "user-id",
      "category": "Work"
    },
    {
      "id": "task-id-2",
      "title": "Task 2",
      "description": "Description for Task 2",
      "userId": "user-id",
      "category": "Work"
    }
  ]
}
```

---

### Database Connection
Ensure the database connection is established using the provided environment variable for the MongoDB connection string.

```javascript
require('dotenv').config();
const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connection Successful");
  } catch (error) {
    console.error(`Database Connection Failed: ${error.message}`);
    process.exit(1);
  }
};
```

---
