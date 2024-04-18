import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

const AddProductsForm = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const formRef = useRef();

  const onFinish = async (values) => {
    const { Category, ...otherProductData } = values;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/products/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...otherProductData, category: Category }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      message.success("Product added successfully!");
      formRef.current.setFieldsValue({}); // Reset form fields
      formRef.current.resetFields(); // Reset form state
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        ref={formRef}
        {...formItemLayout}
        style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
        onFinish={onFinish}
        initialValues={{}}
      >
        <h1>Add New Product</h1>
        <Form.Item
          label="Product Title"
          name="title"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Category"
          name="Category"
          rules={[{ required: true, message: "Please input!" }]}
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
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Weight"
          name="weight"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="imageURL"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Product Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductsForm;
