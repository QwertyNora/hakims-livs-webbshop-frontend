import React, { useState, useEffect } from 'react';
import Styles from '../styles/getAllProducts.module.css'; // Adjust as necessary for styling

function DisplayCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://hakims-livs-webbshop-1.onrender.com/categories')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend directly returns an array of categories
        setCategories(data);
        
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className={Styles.categoriesContainer}>
      <h2>Categories</h2>
      <ul className={Styles.categoryList}>
        {categories.map((category, index) => (
          // Continue using category name as key if it's unique, otherwise use index
          <li key={category.name || index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayCategories;
