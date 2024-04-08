import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import StorageTable from "./storageTable";

const { Header, Content, Footer } = Layout;

const AdminStartPage = () => {
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
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Admin panel</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content starts here  */}
          Storage
          <StorageTable />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Hakims livs webbshop ©{new Date().getFullYear()} Created by Grupp 1
      </Footer>
    </Layout>
  );
};

export default AdminStartPage;
