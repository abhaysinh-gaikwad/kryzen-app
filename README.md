# Kryzen App

## Overview

Kryzen App is a Full Stack App built with Node.js, Express.js, React, and MySQL for managing products, user carts, and administrative tasks. It provides endpoints for CRUD operations on products, cart management, and user authentication using JWT tokens. The API is designed to be scalable, secure, and ready for deployment.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side application development.
- **Express.js**: Fast, minimalist web framework for Node.js.
- **MySQL**: Relational database for storing product and user data.
- **Sequelize**: Promise-based ORM for Node.js and MySQL.
- **React** : Used React for developing frontend
- **JWT (JSON Web Tokens)**: Secure method for authentication.
- **bcrypt**: Library for hashing passwords.
- **axios**: Promise-based HTTP client for making requests to other APIs.


## Features

- **Product Management**: CRUD operations for managing products.
- **User Cart Management**: Add to cart, remove from cart functionalities.
- **Dynamic URLs for Users**: Utilize dynamic URLs to provide personalized user experiences, such as accessing user-specific product and cart pages.
- **Authentication**: Secure signup and login endpoints using JWT.
- **Authorization**: Middleware for protecting routes using JWT tokens.
- **Error Handling**: Centralized error handling middleware.

## API Endpoints

### Authentication

- **Signup**: `POST /api/signup` - Register a new user.
- **Signin**: `POST /api/signin` - Authenticate an existing user.


## Products Management

### Add Product

- **Method**: `POST`
- **Path**: `/api/products/:username`
- **Description**: Add a new product for a specific user.

### Update Product

- **Method**: `PUT`
- **Path**: `/api/products/:username/:id`
- **Description**: Update an existing product by ID for a specific user.

### Delete Product

- **Method**: `DELETE`
- **Path**: `/api/products/:username/:id`
- **Description**: Delete a product by ID for a specific user.

### Get Products

- **Method**: `GET`
- **Path**: `/api/products/:username`
- **Description**: Fetch all products for a specific user.

## Cart Management

### Add to Cart

- **Method**: `POST`
- **Path**: `/api/products/:username/cart/add/:productId`
- **Description**: Add a product to the cart for a specific user.

### Get Cart Items

- **Method**: `GET`
- **Path**: `/api/products/:username/cart`
- **Description**: Fetch all items in the user's cart for a specific user.

### Remove from Cart

- **Method**: `DELETE`
- **Path**: `/api/products/:username/cart/remove/:id`
- **Description**: Remove an item from the cart by ID for a specific user.

### Schedule Add to Cart

- **Method**: `POST`
- **Path**: `/api/products/:username/cart/schedule/add/:productId`
- **Description**: Schedule adding a product to the cart for a specific user.


## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/kryzen-app.git
   cd kryzen-app
   ```

# Installation and Running Instructions

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
cd frontend
npm install
npm run dev
Start the frontend development server:
```
