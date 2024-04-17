import React from "react";
import { Form, Input, Button } from "antd";
import Styles from "../styles/customerForm.module.css";
import { Typography } from "antd";
const { Title, Text } = Typography;

function CustomerForm({ onSaveCustomerDetails }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    onSaveCustomerDetails(values);
  };

  return (
    <>
      <div className={Styles.formContainer}>
        <Title level={3} style={{ textAlign: "left" }}>
          Details
        </Title>
        <Form
          form={form}
          name="customerForm"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            invoiceAddress: "",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="invoiceAddress"
            label="Invoice Address"
            rules={[
              { required: true, message: "Please input your invoice address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save my details
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default CustomerForm;
