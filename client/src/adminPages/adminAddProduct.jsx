import React from "react";
import { Link } from "react-router-dom";
import AddProductsForm from "./addProductsForm";

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer } = Layout;

const AdminAddProducts = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    { key: 1, label: "Storage", path: "/admin" },
    { key: 2, label: "Add products", path: "/admin/add/products" },
    { key: 3, label: "Order Products" },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: "0 68px" }}>
        <Breadcrumb style={{ margin: "20px 0" }}>
          <Breadcrumb.Item>Add product</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Content STARTS HERE  */}

          <AddProductsForm />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Hakims livs webbshop ©{new Date().getFullYear()} Created by Grupp 1
      </Footer>
    </Layout>
  );
};

export default AdminAddProducts;
