import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ProductPage.css'; // Import the CSS file

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt-asc' // Default sorting
  });
  const [delay, setDelay] = useState(''); // State to hold scheduling delay
  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // For managing URL query params

  useEffect(() => {
    const type = searchParams.get('type') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt-asc';

    setFilters({ type, minPrice, maxPrice, sortBy });
    fetchProducts();
    fetchCartItems(); // Fetch cart items when component mounts
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://kryzen-app.onrender.com/api/products/${username}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: filters // Pass current filters as query parameters
      });

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error fetching products
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`https://kryzen-app.onrender.com/api/products/${username}/cart`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCartItems(response.data); // Update cart items state
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error fetching cart items
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(`https://kryzen-app.onrender.com/api/products/${username}/cart/add/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Product added to cart successfully!');
        fetchCartItems(); // Refresh cart items after adding
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart. Please try again later.');
    }
  };

  const handleScheduleAddToCart = async (productId) => {
    try {
      const response = await axios.post(`https://kryzen-app.onrender.com/api/products/${username}/cart/schedule/add/${productId}`, { delay }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Product scheduled to be added to cart after ${delay} minutes!`);
        fetchProducts(); // Refresh products list after scheduling
      } else {
        alert('Failed to schedule adding product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error scheduling product addition to cart:', error);
      alert('Error scheduling product addition to cart. Please try again later.');
    }
  };

  const handleMyCart = () => {
    navigate(`/cart/${username}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update URL query parameters with the new filter values
    setSearchParams(filters);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Function to check if a product is in the cart
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <div className="product-page-container">
      <h1>Product List</h1>
      <div className="action-buttons">
        <button onClick={handleMyCart}>Cart</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
            <option value="furniture">Furniture</option>
          </select>
        </label>
        <label>
          Min Price:
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
        </label>
        <label>
          Max Price:
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        </label>
        <label>
          Sort By:
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="createdAt-asc">Date Ascending</option>
            <option value="createdAt-desc">Date Descending</option>
            <option value="price-asc">Price Ascending</option>
            <option value="price-desc">Price Descending</option>
          </select>
        </label>
        <button type="submit">Apply Filters</button>
      </form>

      {/* Product List */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Type: {product.type}</p>
            <div className="action-group">
              {isProductInCart(product.id) ? (
                <p className="in-cart">Already in cart</p>
              ) : (
                <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
              )}
              <div>
                <input
                  type="number"
                  placeholder="Enter minutes to schedule"
                  value={delay}
                  onChange={(e) => setDelay(e.target.value)}
                  className="schedule-input"
                  disabled={isProductInCart(product.id)} // Disable scheduling if already in cart
                />
                <button
                  onClick={() => handleScheduleAddToCart(product.id)}
                  className="schedule-button"
                  disabled={isProductInCart(product.id)} // Disable scheduling if already in cart
                >
                  Schedule Add to Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
