import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import Styles from "../styles/getAllProducts.module.css";

function AdminGetProducts({ selectedCategory }) {
  const [products, setProducts] = useState([]); // State to hold fetched products

  useEffect(() => {
    fetch("https://hakims-livs-webbshop-1.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched products to state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Table dataSource={products} rowKey="id">
      <Table.Column title="Product Title" dataIndex="title" key="title" />
      <Table.Column title="Price" dataIndex="price" key="price" />
      <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
      <Table.Column title="Brand" dataIndex="brand" key="brand" />

      <Table.Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
}

export default AdminGetProducts;
