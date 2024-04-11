import { Link } from "react-router-dom";
import { useState } from "react";
import { Input, Card, Modal, Button, Dropdown } from "antd";
import GetAllProducts from "../api/getProducts";
import DisplayCategories from "../api/getCategories";

import Styles from "../styles/home.module.css";

const Search = Input.Search;
const { Meta } = Card;

function Home() {
  // Product MODALS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
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
              HAKIM LIVS
            </a>
          </li>
          <li>
            <Search
              className={Styles.Searchbar}
              placeholder="SÖK PRODUKTER"
              style={{
                width: 800,
                borderRadius: "4px",
              }}
              size={"large"}
              onSearch={(value) => console.log(value)}
            />
          </li>
          <li>
            <Link to="/login" className={Styles.login}>
              Logga in{" "}
            </Link>
          </li>
          <li>
            <Link to="/Checkout" className={Styles.login}>
              Till kassan{" "}
            </Link>{" "}
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
      <DisplayCategories onCategorySelect={handleCategorySelect} />

      <div className={Styles.categoriesNavContainer}>
        {/* Remove the hardcoded category list from here */}
        
        <div className={Styles.ProductDisplayContainer}>
          {/* Content for product display */}
          <div className={Styles.ProductDisplay}>
            <ul className={Styles.productCards}>
              <li>
                <GetAllProducts selectedCategory={selectedCategory} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Home;
