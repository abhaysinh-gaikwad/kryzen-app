import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const authToken = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
  const navigate = useNavigate(); // Using useNavigate for navigation

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/abhay/cart', {
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
      const response = await axios.delete(`http://localhost:5000/api/products/abhay/cart/remove/${itemId}`, {
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
    navigate('/products'); // Navigate to the '/product' route
  };

  return (
    <div>
      <h1>My Cart</h1>
      <button onClick={handleProducts}>Products</button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} style={{ listStyle: 'none', border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <h3>{item.name}</h3>
            <p>Price: {item.price}</p>
            <p>Type: {item.type}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
