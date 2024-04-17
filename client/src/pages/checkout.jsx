import React from "react";
import { Breadcrumb, Layout, Menu, theme, Row, Col } from "antd";
import Cart from "../components/cart";
import CartItems from "../components/cartItems";

const { Header, Content, Footer } = Layout;
const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

function Checkout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        <Breadcrumb.Item>Home</Breadcrumb.Item>
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
              <h2>Your cart</h2>
              <CartItems />
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
            }}
          >
            Order
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
