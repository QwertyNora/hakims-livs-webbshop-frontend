import React, { useState, useEffect } from "react";
import Styles from "../styles/home.module.css";

function DisplayCategories({ onCategorySelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://hakims-livs-webbshop-1.onrender.com/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategorySelect = (categoryId, event) => {
    event.preventDefault();
    onCategorySelect(categoryId);
  };

  return (
    <div className={`${Styles.categoryContainer} ${Styles.SideNav}`}>
      <h2 className={Styles.categoriesHeader}>Categories</h2>
      <ul className={Styles.categoryList}>
        <li>
          <a
            href="#"
            className={Styles.categoryLink}
            onClick={(e) => handleCategorySelect("", e)}
          >
            All
          </a>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
            <a
              href="#"
              className={Styles.categoryLink}
              onClick={(e) => handleCategorySelect(category._id, e)}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayCategories;
