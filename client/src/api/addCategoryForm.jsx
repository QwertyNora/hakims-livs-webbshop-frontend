import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";

function AddCategoryForm({ showModal, setShowModal, fetchCategories }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShowModal(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields() // First, ensure all fields are validated.
      .then(() => {
        form.submit(); // Submit the form if validation is successful.
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const onFinish = async (values) => {
    setConfirmLoading(true);
    fetch("http://localhost:8080/categories/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setShowModal(false);
        fetchCategories();
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <>
      <Modal
        title="Add Category"
        open={showModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name:"
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the category description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddCategoryForm;
