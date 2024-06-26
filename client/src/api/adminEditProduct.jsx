import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, InputNumber, Select } from "antd";

const AdminEditProduct = ({
  showModal,
  setShowModal,
  selectedProduct,
  fetchProducts,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setShowModal(false); // Use setShowModal to close the modal
    form.resetFields();
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/categories"
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  const onFinish = async (values) => {
    setLoading(true);

    if (!selectedProduct || !selectedProduct._id) {
      console.error("Product or product ID is undefined");
      setLoading(false);
      return;
    }

    console.log("Selected product ID:", selectedProduct._id);
    const updatedProduct = { ...values };

    fetch(
      process.env.REACT_APP_BACKEND_URL + `/products/${selectedProduct._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setLoading(false);
        setShowModal(false);
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <Modal
      open={showModal}
      title="Edit product"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <h3>{selectedProduct.title}</h3>
        <Form.Item
          label="Product Title"
          name="title"
          rules={[
            { required: false, message: "Please input the product title!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Category"
          name="category"
          rules={[
            { required: false, message: "Please input the product category!" },
          ]}
        >
          <Select
            name="._"
            defaultValue="Select Category"
            style={{ width: "100%" }}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Brand"
          name="brand"
          rules={[
            { required: false, message: "Please input the product brand!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[
            { required: false, message: "Please input the product price!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Product Quantity"
          name="quantity"
          rules={[
            { required: false, message: "Please input the product quantity!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: false,
              message: "Please input the product description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AdminEditProduct;
