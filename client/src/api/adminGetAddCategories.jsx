import React, { useState, useEffect } from "react";
import { Form, Input, Table, Button, Space } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddCategoryForm from "./addCategoryForm";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function AdminGetAddCategories() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://hakims-livs-webbshop-1.onrender.com/categories"
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

  const showAddModal = () => {
    setShowAddCategoryModal(true);
  };

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

        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              showAddModal();
            }}
          >
            Add Category <PlusCircleOutlined />
          </Button>
        </Space>

        {showAddCategoryModal && (
          <AddCategoryForm
            showModal={showAddCategoryModal}
            setShowModal={setShowAddCategoryModal}
            fetchCategories={fetchCategories}
          />
        )}
      </div>
    </>
  );
}

export default AdminGetAddCategories;
