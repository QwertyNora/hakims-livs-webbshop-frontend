import React from "react";
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import Styles from "../styles/cart.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { GoTrash } from "react-icons/go";

const Cart = ({
  visibility,
  products,
  onClose,
  removeProduct,
  updateQuantity,
}) => {
  const total = products.reduce(
    (e, product) => e + product.price * product.quantity,
    0
  );

  return (
    <>
      <Button type="primary" onClick={visibility ? onClose : undefined}>
        {visibility ? "Close Cart" : "Open Cart"}
      </Button>
      <Drawer
        title="Shopping Cart"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visibility}
        footer={
          <div>
            <Button onClick={onClose}>Close</Button>
            <Link to="/checkout">
              <Button type="primary">Checkout</Button>
            </Link>
          </div>
        }
      >
        {products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className={Styles.productList}>
              {products.map((product, index) => (
                <li key={index} className={Styles.productItem}>
                  <img
                    className={Styles.cartImg}
                    src={product.imageURL}
                    alt={product.title}
                    style={{ width: 80, height: 80, marginRight: 10 }}
                  />
                  <br />
                  <span className={Styles.productTitle}>{product.title}</span>
                  <br />
                  <span>{product.price} Kr</span>
                  <br />
                  <button
                    className={Styles.removeBtn}
                    onClick={() => removeProduct(index)}
                  >
                    <GoTrash size={20} />
                  </button>
                  <button
                    className={Styles.decrementBtn}
                    onClick={() => updateQuantity(index, product.quantity - 1)}
                  >
                    <IoIosRemoveCircleOutline size={20} />
                  </button>
                  <span className={Styles.productQuantity}>
                    {product.quantity}
                  </span>
                  <button
                    className={Styles.addBtn}
                    onClick={() => updateQuantity(index, product.quantity + 1)}
                  >
                    <IoIosAddCircleOutline size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <h2>Total Price: {total} kr</h2>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default Cart;
