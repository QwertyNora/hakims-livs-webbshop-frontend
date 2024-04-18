import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message, Breadcrumb, Layout, Row, Col, Typography, theme } from "antd";
import CartItems from "../components/cartItems";
import CreateOrder from "../components/createOrder";
import CustomerForm from "../components/customerForm";
import Styles from "../styles/customerForm.module.css";

const { Title } = Typography;

const { Header, Content, Footer } = Layout;

function Checkout() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleSaveCustomerDetails = (details) => {
    setCustomerDetails(details);
    message.success("Details saved successfully!");
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
      </Header>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Col
          xs={{
            span: 5,
            offset: 0.5,
          }}
          lg={{
            span: 15,
            offset: 0.5,
          }}
        >
          <Content
            style={{
              padding: "0 48px",
            }}
          >
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Title level={3} style={{ textAlign: "left" }}>
                Your Cart
              </Title>
              <CartItems />
              <div className={Styles.container}>
                <CustomerForm
                  onSaveCustomerDetails={handleSaveCustomerDetails}
                />
              </div>
            </div>
          </Content>
        </Col>
        <Col
          xs={{
            span: 6,
            offset: 0.5,
          }}
          lg={{
            span: 8,
            offset: 0.5,
          }}
        >
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
              maxWidth: 700,
            }}
          >
            <CreateOrder
              customerDetails={customerDetails}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
        </Col>
      </Row>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Hakims livs webbshop ©{new Date().getFullYear()} Created by Grupp 1
      </Footer>
    </Layout>
  );
}

export default Checkout;
