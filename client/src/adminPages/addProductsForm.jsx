import React from "react";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const AddProductsForm = () => (
  <>
    <Form
      {...formItemLayout}
      style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
      variant="filled"
    >
      <h1>Add New Product</h1>
      <Form.Item
        label="Product Title"
        name="Product Title"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Category"
        name="Product Category"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Brand"
        name="Product Brand"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Product Price"
        name="Product Price"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="Product Quantity"
        name="Product Quantity"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        label="Product Description"
        name="Product Description"
        rules={[
          {
            required: true,
            message: "Please input!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </>
);
export default AddProductsForm;
