# Kryzen App

## Overview

Kryzen App is a backend API built with Node.js, Express.js, and MySQL for managing products, user carts, and administrative tasks. It provides endpoints for CRUD operations on products, cart management, and user authentication using JWT tokens. The API is designed to be scalable, secure, and ready for deployment.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side application development.
- **Express.js**: Fast, minimalist web framework for Node.js.
- **MySQL**: Relational database for storing product and user data.
- **Sequelize**: Promise-based ORM for Node.js and MySQL.
- **JWT (JSON Web Tokens)**: Secure method for authentication.
- **bcrypt**: Library for hashing passwords.
- **axios**: Promise-based HTTP client for making requests to other APIs.

## Features

- **Product Management**: CRUD operations for managing products.
- **User Cart Management**: Add to cart, remove from cart functionalities.
- **Authentication**: Secure signup and login endpoints using JWT.
- **Authorization**: Middleware for protecting routes using JWT tokens.
- **Error Handling**: Centralized error handling middleware.
- **Deployment Ready**: Configuration for deployment on platforms like Render.

## API Endpoints

### Authentication

- **Signup**: `POST /api/signup` - Register a new user.
- **Signin**: `POST /api/signin` - Authenticate an existing user.

### Product Management

- **Add Product**: `POST /api/products/:username` - Add a new product.
- **Update Product**: `PUT /api/products/:username/:id` - Update an existing product.
- **Delete Product**: `DELETE /api/products/:username/:id` - Delete a product.
- **Get Products**: `GET /api/products/:username` - Fetch all products by username.

### Cart Management

- **Add to Cart**: `POST /api/products/:username/cart/add/:productId` - Add a product to the cart.
- **Get Cart Items**: `GET /api/products/:username/cart` - Fetch all items in the user's cart.
- **Remove from Cart**: `DELETE /api/products/:username/cart/remove/:id` - Remove an item from the cart.
- **Schedule Add to Cart**: `POST /api/products/:username/cart/schedule/add/:productId` - Schedule adding a product to the cart.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/kryzen-app.git
   cd kryzen-app
   ```

# Installation and Running Instructions

## Backend Setup

### Install Dependencies

```bash
npm install
```
### Set up Environment Variables

 - Create a .env file in the root directory and add the following:
 ```bash
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=kryzen_db
JWT_SECRET=your_jwt_secret_key
```

### Running Locally
 #### Start the server:
```bash
cd backend
npm install
npm start
The server will start locally at http://localhost:5000.
```
Frontend Setup

```bash
npm install
npm run dev
Start the frontend development server:
```