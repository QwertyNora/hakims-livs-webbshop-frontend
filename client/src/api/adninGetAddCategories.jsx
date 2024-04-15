import React, { useState, useEffect } from "react";
import { Form, Input, Table } from "antd";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function AdminGetAddCategories() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/categories");
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

  return (
    <>
      <div style={{ width: "100%", maxWidth: "50%", margin: "0 auto" }}>
        <Table dataSource={categories} rowKey="_id">
          <Table.Column title="Category Name" dataIndex="name" key="name" />
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
          />
        </Table>

        <Form style={{ width: "70%", maxWidth: "600px", margin: "0 auto" }}>
          <h3>Add Category:</h3>
          <Form.Item
            label="Category Name"
            name="name"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category Description"
            name="description"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default AdminGetAddCategories;
