import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; // Import the CartPage.css file for styling

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const authToken = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
  const username = localStorage.getItem('username'); // Get the username from localStorage
  const navigate = useNavigate(); // Using useNavigate for navigation

  // Function to fetch cart items from the server
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`https://kryzen-app.onrender.com/api/products/${username}/cart`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Optionally handle the error, e.g., show a message to the user
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [authToken]); // Dependency array ensures this runs when the component mounts and when authToken changes

  // Function to remove an item from the cart
  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`https://kryzen-app.onrender.com/api/products/${username}/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        fetchCartItems(); // Fetch updated cart items after successful removal
      } else {
        console.error('Failed to remove item from cart:', response.data);
        // Optionally handle the failure, e.g., show a message to the user
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Optionally handle the error, e.g., show a message to the user
    }
  };

  // Function to navigate back to the products page
  const handleProducts = () => {
    navigate(`/${username}/products`); // Navigate to the products page for the current user
  };

  return (
    <div className="cart-page-container">
      <h1>My Cart</h1>
      <button className="action-button" onClick={handleProducts}>Products</button>
      <ul className="cart-item-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>
              <p>Type: {item.type}</p>
              <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </ul>
    </div>
  );
};

export default CartPage;
