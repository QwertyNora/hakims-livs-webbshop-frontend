import { useState, useEffect } from "react";
import Cart from "../components/cart";
import { Link } from "react-router-dom";
import { Button, Space, ConfigProvider } from "antd";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import GetAllProducts from "../api/getProducts";
import SearchBar from "../components/searchBar";
import HakimLogo from "../images/HakimLogo.png";
import DisplayCategories from "../api/getCategories";
import Styles from "../styles/home.module.css";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartVisibility, setCartVisibility] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("productsInCart"));
    if (savedProducts) {
      setProductsInCart(savedProducts);
      setCartItemCount(
        savedProducts.reduce((total, product) => total + product.quantity, 0)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

    setCartItemCount(
      productsInCart.reduce((total, product) => total + product.quantity, 0)
    );
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

  return (
    <>
      {/* Top AD section */}
      <div className={Styles.topad}>
        <a className={Styles.topAdLink}>Fri frakt på ditt första köp!</a>
      </div>

      <div className={Styles.heroNavContainer}>
        <div className={Styles.logo}>
          <a href="/">
            <img
              src={HakimLogo}
              alt="Hakim Logo"
              className={Styles.hakimLogo}
            />
          </a>
        </div>
        <div className={Styles.SearchNav}>
          <div>
            <SearchBar showModal={showModal} addToCart={addToCart} />
          </div>
          <div className={Styles.LoginCartContainer}>
            <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: "#82b874",

                  // Alias Token
                  colorBgContainer: "#f6ffed",
                },
              }}
            >
              <Space>
                <Link to="/admin">
                  <Button className={Styles.loginBtn}>
                    <RxAvatar size={25} style={{ marginRight: "8" }} />
                    admin
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className={Styles.loginBtn}>
                    <RxAvatar size={25} style={{ marginRight: "8" }} />
                    Log In
                  </Button>
                </Link>
                <Button
                  onClick={handleCartToggle}
                  type="primary"
                  className={Styles.loginBtn}
                >
                  <FiShoppingCart size={23} style={{ marginRight: "8" }} />
                  <span className={Styles.cartIcon}>
                    {cartItemCount > 0 && (
                      <span className={Styles.cartItemCount}>
                        {cartItemCount}
                      </span>
                    )}
                  </span>
                </Button>
              </Space>
            </ConfigProvider>
          </div>
          <div>
            {cartVisibility && (
              <Cart
                visibility={cartVisibility}
                products={productsInCart}
                removeProduct={removeProduct}
                onClose={() => setCartVisibility(false)}
                updateQuantity={updateQuantity}
              />
            )}
          </div>
        </div>
      </div>

      {/* HERO HEADER  */}

      <div className={Styles.Heroheader}>
        <h2 className={Styles.herofont}>
          SAVE CASH <br /> NOT waste{" "}
        </h2>
      </div>

      <div className={Styles.categoriesNavContainer}>
        <DisplayCategories onCategorySelect={setSelectedCategory} />

        <div className={Styles.ProductDisplayContainer}>
          <div className={Styles.ProductDisplay}>
            <GetAllProducts
              selectedCategory={selectedCategory}
              addToCart={addToCart}
            />
          </div>
        </div>
      </div>
      <DisplayCategories/>
      
    </>
  );
}

export default Home;
