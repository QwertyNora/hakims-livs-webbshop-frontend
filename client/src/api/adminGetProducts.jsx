import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import Styles from "../styles/getAllProducts.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Switch } from "antd";
import AdminEditProduct from "./adminEditProduct";

function AdminGetProducts({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchProducts = () => {
    fetch("https://hakims-livs-webbshop-1.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const deleteProduct = (id) => {
    fetch(`https://hakims-livs-webbshop-1.onrender.com/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json();
      })
      .then(() => {
        message.success("Product deleted successfully");
        fetchProducts(); // Refresh the product list
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error("Failed to delete product");
      });
  };

  const handleDelete = (product) => {
    setOpen(false); // Close the confirmation dialog
    deleteProduct(product._id); // Call deleteProduct with the product's ID
  };

  return (
    <>
      <Table dataSource={products} rowKey="_id">
        <Table.Column title="Product Title" dataIndex="title" key="title" />
        <Table.Column title="Price" dataIndex="price" key="price" />
        <Table.Column title="Quantity" dataIndex="quantity" key="quantity" />
        <Table.Column title="Brand" dataIndex="brand" key="brand" />
        <Table.Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => showEditModal(record)}>
                Edit <EditOutlined />
              </Button>
              <Popconfirm
                title="Are you sure to delete this product?"
                onConfirm={() => handleDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>
                  Delete <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      {showEditProductModal && (
        <AdminEditProduct
          showModal={showEditProductModal}
          setShowModal={setShowEditProductModal}
          selectedProduct={selectedProduct}
          fetchProducts={fetchProducts}
        />
      )}
    </>
  );
}

export default AdminGetProducts;
