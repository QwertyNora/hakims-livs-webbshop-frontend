import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, InputNumber } from "antd";
import Styles from "../styles/cartTable.module.css";
import { DeleteOutlined } from "@ant-design/icons";

function CartItems({ productsInCart }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("productsInCart"));
    if (items) {
      // Assume unitPrice needs to be added to the items the first time
      const updatedItems = items.map((item) => ({
        ...item,
        unitPrice: item.price / item.quantity, // Calculate unit price if not present
      }));
      setCartItems(updatedItems);
      localStorage.setItem("productsInCart", JSON.stringify(updatedItems));
    }
  }, []);

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity,
            price: item.unitPrice * quantity, // Recalculate the total price based on new quantity
          };
        }
        return item;
      });
      localStorage.setItem("productsInCart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const deleteItem = (id) => {
    setCartItems((prevItems) => {
      const filteredItems = prevItems.filter((item) => item._id !== id);
      localStorage.setItem("productsInCart", JSON.stringify(filteredItems));
      return filteredItems;
    });
  };

  const columns = [
    {
      title: "",
      dataIndex: "imageURL",
      key: "imageURL",
      render: (imageURL) => (
        <img alt="Product" src={imageURL} className={Styles.productImage} />
      ),
    },
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record._id, value)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => `${record.price.toFixed(2)} Kr`, // Show the recalculated price
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button danger onClick={() => deleteItem(record._id)}>
            Delete <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={cartItems} columns={columns}></Table>
    </>
  );
}

export default CartItems;
