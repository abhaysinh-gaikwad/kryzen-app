import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './CartPage.css'; // Import the CartPage.css file for styling

const CartPage = () => {
  // const 
  const [cartItems, setCartItems] = useState([]);
  const authToken = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
  const username = localStorage.getItem('username');
  const navigate = useNavigate(); // Using useNavigate for navigation


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
      // Handle error fetching cart items
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [authToken]);

  const handleRemoveFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`https://kryzen-app.onrender.com/api/products/abhay/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        fetchCartItems(); // Fetch updated cart items after removal
      } else {
        console.error('Failed to remove item from cart:', response.data);
        // Handle failure to remove item
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error removing item from cart
    }
  };

  const handleProducts = () => {
    navigate(`${localStorage.getItem('username')}/products`); // Navigate to the '/product' route
  };

  return (
    
    <div className="cart-page-container">
      <h1>My Cart</h1>
      <button className="action-button" onClick={handleProducts}>Products</button>
      <ul className="cart-item-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <p>Type: {item.type}</p>
            <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
