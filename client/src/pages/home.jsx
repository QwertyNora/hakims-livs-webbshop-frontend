import { Link } from "react-router-dom";
import { useState } from "react";
import { Input, Card, Modal, Button, Dropdown } from "antd";
import GetAllProducts from "../api/getProducts";
import SearchBar from "../components/searchBar";

import Styles from "../styles/home.module.css";

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
            <SearchBar showModal={showModal} />
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
