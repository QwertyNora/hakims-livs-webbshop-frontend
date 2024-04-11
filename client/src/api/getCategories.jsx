import React, { useState, useEffect } from 'react';
import Styles from '../styles/getAllCategories.module.css'; // Adjust as necessary for styling

// Update this line to accept `onCategorySelect` as a prop
function DisplayCategories({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/categories')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend directly returns an array of categories
        setCategories(data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className={Styles.dropdownContainer}>
      <h2>Categories</h2>
      <select 
        className={Styles.categoryDropdown} 
        onChange={(e) => onCategorySelect(e.target.value)} // Use the prop here
      >
        {/* Optionally add an option for selecting all categories */}
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={category.name || index} value={category.id || category.name}>
          {category.name}
        </option>
        ))}
      </select>
    </div>
  );
}

export default DisplayCategories;
