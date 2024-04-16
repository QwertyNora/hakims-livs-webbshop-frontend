import React, { useState } from "react";
import { Input } from "antd";
import Styles from "../styles/home.module.css";

const { Search } = Input;

function SearchBar() {
  const [input, setInput] = useState("");

  const fetchProducts = (value) => {
    fetch("https://hakims-livs-webbshop-1.onrender.com/products");
    // console.log("Searching for:", value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInput(value);
    fetchProducts(value);
  };

  return (
    <div className={Styles.heroNavContainer}>
      <ul className={Styles.SearchNav}>
        <li>
          <Search
            className={Styles.Searchbar}
            placeholder="SÖK PRODUKTER"
            style={{ width: 800, borderRadius: "4px" }}
            value={input}
            size="large"
            onChange={handleChange} // Changed to onChange
          />
        </li>
      </ul>
    </div>
  );
}

export default SearchBar;
