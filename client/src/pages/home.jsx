import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cart from "../components/cart";
import { Input, Card, Modal, Button, Dropdown } from "antd";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";

import GetAllProducts from "../api/getProducts";
import SearchBar from "../components/searchBar";
import HakimLogo from "../images/HakimLogo.png";

import Styles from "../styles/home.module.css";

const { Meta } = Card;

function Home() {
  // Product MODALS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartVisibility, setCartVisibility] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("productsInCart"));
    if (savedProducts) {
      setProductsInCart(savedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  const addToCart = (product) => {
    const existingProductIndex = productsInCart.findIndex(
      (p) => p._id === product._id
    );
    if (existingProductIndex !== -1) {
      const updatedProducts = [...productsInCart];
      updatedProducts[existingProductIndex].quantity += 1;
      setProductsInCart(updatedProducts);
    } else {
      setProductsInCart([...productsInCart, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (index) => {
    setProductsInCart(productsInCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedProducts = [...productsInCart];
    if (newQuantity <= 0) {
      updatedProducts.splice(index, 1);
    } else {
      updatedProducts[index].quantity = newQuantity;
    }
    setProductsInCart(updatedProducts);
  };

  const handleCartToggle = () => {
    setCartVisibility(!cartVisibility);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // Product MODALS END

  return (
    <>
      {/* Top AD section */}
      <div className={Styles.topad}>
        <a className={Styles.topAdLink}>Fri frakt på ditt första köp!</a>
      </div>

      {/* Search nav section */}
      <div className={Styles.heroNavContainer}>
        <ul className={Styles.SearchNav}>
          <li className={Styles.logo}>
            <a className={Styles.hakimLogo} href="/">
              <img src={HakimLogo} className={Styles.hakimLogo} alt="" />
            </a>
          </li>
          <li>
            <SearchBar showModal={showModal} addToCart={addToCart} />
          </li>
          <li>
            <Link to="/login" className={Styles.login}>
              <RxAvatar size={30} />{" "}
            </Link>
          </li>
          <li>
            <button onClick={handleCartToggle}>
              <FiShoppingCart size={30} />
            </button>
            {cartVisibility && (
              <Cart
                visibility={cartVisibility}
                products={productsInCart}
                removeProduct={removeProduct}
                onClose={() => setCartVisibility(false)}
                updateQuantity={updateQuantity}
              />
            )}
          </li>
        </ul>
      </div>

      {/* HERO HEADER  */}

      <div className={Styles.Heroheader}>
        <h2 className={Styles.herofont}>
          SAVE CASH <br /> NOT waste{" "}
        </h2>
      </div>

      {/* category select dropdown */}

      <div className={Styles.categoriesNavContainer}>
        <div className={Styles.Dropdown}>
          <h2 className={Styles.categoriesHeader}>Kategorier</h2>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("");
                }}
              >
                Alla
              </a>
            </li>

            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d443e33d1b3eb0dab7769");
                }}
              >
                Godis
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4ddf597af06970c47adb");
                }}
              >
                Mejeri
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4e08597af06970c47adc");
                }}
              >
                Kött
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4e25597af06970c47add");
                }}
              >
                Fisk
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4e48597af06970c47ade");
                }}
              >
                Bröd
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4e69597af06970c47adf");
                }}
              >
                Grönsaker
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4e89597af06970c47ae0");
                }}
              >
                Frukt
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("Kaffe");
                }}
              >
                Kaffe
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory("660d4ea9597af06970c47ae1");
                }}
              >
                Städartiklar
              </a>
            </li>
          </ul>
        </div>

        <div className={Styles.ProductDisplayContainer}>
          {/* Content for product display */}
          <div className={Styles.ProductDisplay}>
            <ul className={Styles.productCards}>
              <li>
                <GetAllProducts
                  selectedCategory={selectedCategory}
                  addToCart={addToCart}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
