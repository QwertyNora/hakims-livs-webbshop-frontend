import React, { useState, useEffect } from "react";
import { Card, Modal, Button } from "antd";
import Styles from "../styles/getAllProducts.module.css";

function GetAllProducts({ selectedCategory }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const productsToDisplay = selectedCategory ? filteredProducts : allProducts;

  return (
    <div className={Styles.allProductsContainer}>
      {productsToDisplay.map((product) => (
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
              onClick={() => showModal(product)}
            />
          }
        >
          <Card.Meta title={product.title} />
          <p>{product.price}kr</p>
          <button className={Styles.productBtn}>KÖP</button>
        </Card>
      ))}
      <Modal
        title={selectedProduct && selectedProduct.title}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Lägg till i varukorg"
        cancelText="Stäng"
      >
        {selectedProduct && (
          <img
            className={Styles.modalProductImg}
            src={selectedProduct.imageURL}
            alt=""
          />
        )}
        <h2 className={Styles.modalPrice}>
          {selectedProduct && selectedProduct.price}kr
        </h2>
        <p className={Styles.modalDesc}>
          {selectedProduct && selectedProduct.brand}
        </p>
        <p className={Styles.modalDesc}>
          {selectedProduct && selectedProduct.weight}g
        </p>
        <p className={Styles.modalDesc}>
          {selectedProduct && selectedProduct.description}
        </p>
      </Modal>
    </div>
  );
}

export default GetAllProducts;
