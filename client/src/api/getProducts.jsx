import React, { useState, useEffect } from "react";
import { Card, Modal, message } from "antd";
import Styles from "../styles/getAllProducts.module.css";

function GetAllProducts({ selectedCategory, addToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    fetch("https://hakims-livs-webbshop-1.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        if (selectedCategory) {
          const filtered = data.filter(
            (product) => product.category === selectedCategory
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedCategory]);

  const showModal = (index) => {
    setSelectedProductIndex(index);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productsToDisplay = selectedCategory ? filteredProducts : allProducts;

  const handleAddToCart = () => {
    // Using selectedProductIndex to add to cart
    if (selectedProductIndex !== null) {
      addToCart(productsToDisplay[selectedProductIndex]);
      message.success("Added product to cart");
    }
  };

  return (
    <div className={Styles.allProductsContainer}>
      {productsToDisplay.map((product, index) => (
        <Card
          className={Styles.productCard}
          key={product._id}
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              className={Styles.productImage}
              alt="example"
              src={product.imageURL}
              onClick={() => showModal(index)}
            />
          }
        >
          <Card.Meta title={product.title} />
          <p>{product.price}kr</p>
          <button
            className={Styles.productBtn}
            onClick={() => {
              addToCart(product);
              message.success("Added product to cart");
            }}
          >
            KÖP
          </button>
        </Card>
      ))}
      <Modal
        title={
          selectedProductIndex !== null &&
          productsToDisplay[selectedProductIndex].title
        }
        visible={isModalOpen}
        onOk={handleAddToCart}
        onCancel={handleCancel}
        okText="Lägg till i varukorg"
        cancelText="Stäng"
      >
        {selectedProductIndex !== null && (
          <>
            <img
              className={Styles.modalProductImg}
              src={productsToDisplay[selectedProductIndex].imageURL}
              alt=""
            />
            <h2 className={Styles.modalPrice}>
              {productsToDisplay[selectedProductIndex].price}kr
            </h2>
            <p className={Styles.modalDesc}>
              {productsToDisplay[selectedProductIndex].brand}
            </p>
            <p className={Styles.modalDesc}>
              {productsToDisplay[selectedProductIndex].weight}g
            </p>
            <p className={Styles.modalDesc}>
              {productsToDisplay[selectedProductIndex].description}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default GetAllProducts;
