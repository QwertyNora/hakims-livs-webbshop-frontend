import React, { useState, useEffect } from "react";
import { AutoComplete, Modal, Button, message } from "antd";
import Styles from "../styles/home.module.css";
import { SearchOutlined } from "@ant-design/icons";

function SearchBar({ addToCart }) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/products"
      );
      const data = await response.json();
      const newOptions = data.map((product) => ({
        value: product.title,
        label: product.title,
        product: product,
      }));
      setOptions(newOptions);
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDropdownVisibleChange = (open) => {
    if (open && options.length === 0) {
      fetchProducts();
    }
  };

  const onSelect = (value, option) => {
    setInput(value);
    setSelectedProduct(option.product);
    setModalVisible(true);
  };

  const onSearch = (searchText) => {
    setInput(searchText);
    if (searchText) {
      const filteredOptions = allProducts
        .filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
        )
        .map((product) => ({
          value: product.title,
          label: product.title,
          product: product,
        }));
      setOptions(filteredOptions);
    } else {
      setOptions(
        allProducts.map((product) => ({
          value: `${product.title} (${product.imageURL})`,
          label: product.title,
          product: product,
        }))
      );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      message.success("Added product to cart");
      closeModal();
    }
  };

  return (
    <div className={Styles.heroNavContainer}>
      <ul className={Styles.SearchNav}>
        <li>
          <AutoComplete
            options={options}
            style={{ width: 500 }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Search products"
            onDropdownVisibleChange={handleDropdownVisibleChange}
            value={input}
          />
        </li>
        <SearchOutlined />
      </ul>
      <Modal
        title={selectedProduct ? selectedProduct.title : ""}
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="addToCart" type="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <img
              src={selectedProduct.imageURL}
              alt={selectedProduct.title}
              style={{ maxWidth: "100%" }}
            />
            <h2>{selectedProduct.price}Kr</h2>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.brand}</p>
            <p>{selectedProduct.weight}g</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SearchBar;
