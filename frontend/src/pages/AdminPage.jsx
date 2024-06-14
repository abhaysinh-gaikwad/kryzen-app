import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt-asc' // Default sorting
  });
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    image: '',
    price: '',
    type: ''
  });
  const [newProductFormData, setNewProductFormData] = useState({
    name: '',
    image: '',
    price: '',
    type: ''
  });
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [filters]); // Reload products when filters change

  const fetchProducts = async () => {
    try {
      // Prepare query parameters based on current filters state
      const { type, minPrice, maxPrice, sortBy } = filters;
      const queryParams = {
        type,
        minPrice,
        maxPrice,
        sortBy
      };

      const response = await axios.get('https://kryzen-app.onrender.com/api/products/abhay', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: queryParams // Pass query parameters
      });

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error fetching products
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`https://kryzen-app.onrender.com/api/products/admin/${productId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 204) {
        alert('Product deleted successfully!');
        fetchProducts(); // Refresh product list after deletion
      } else {
        console.error('Failed to delete product:', response.data);
        alert(`Failed to delete product: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again later.');
    }
  };

  const handleEdit = (product) => {
    setEditFormData({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      type: product.type
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://kryzen-app.onrender.com/api/products/admin/${editFormData.id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        alert('Product updated successfully!');
        setEditFormData({
          id: '',
          name: '',
          image: '',
          price: '',
          type: ''
        });
        fetchProducts(); // Refresh product list after update
      } else {
        console.error('Failed to update product:', response.data);
        alert(`Failed to update product: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again later.');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleNewProductFormChange = (e) => {
    const { name, value } = e.target;
    setNewProductFormData({
      ...newProductFormData,
      [name]: value
    });
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://kryzen-app.onrender.com/api/products/admin', newProductFormData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 201) {
        alert('Product added successfully!');
        setNewProductFormData({
          name: '',
          image: '',
          price: '',
          type: ''
        });
        fetchProducts(); // Refresh product list after adding new product
      } else {
        console.error('Failed to add product:', response.data);
        alert(`Failed to add product: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button>Cart</button>
      <button onClick={handleLogout}>Logout</button>

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

      {/* Add Product Form */}
      <div>
        <h2>Add New Product</h2>
        <form onSubmit={handleNewProductSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={newProductFormData.name} onChange={handleNewProductFormChange} required />
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={newProductFormData.image} onChange={handleNewProductFormChange} required />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={newProductFormData.price} onChange={handleNewProductFormChange} required />
          </label>
          <label>
            Type:
            <select name="type" value={newProductFormData.type} onChange={handleNewProductFormChange} required>
              <option value="">Select Type</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
              <option value="furniture">Furniture</option>
            </select>
          </label>
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Product List */}
      <ul>
        {/* Edit Product Form */}
        {editFormData.id && (
          <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} required />
              </label>
              <label>
                Image URL:
                <input type="text" name="image" value={editFormData.image} onChange={handleEditFormChange} required />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={editFormData.price} onChange={handleEditFormChange} required />
              </label>
              <label>
                Type:
                <select name="type" value={editFormData.type} onChange={handleEditFormChange} required>
                  <option value="">Select Type</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                  <option value="furniture">Furniture</option>
                </select>
              </label>
              <button type="submit">Update Product</button>
            </form>
          </div>
        )}

        {/* Render Product List */}
        {products.map((product) => (
          <li key={product.id} style={{ listStyle: 'none', border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Type: {product.type}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
