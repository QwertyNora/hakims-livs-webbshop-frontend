import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, Tag, Table, theme, Modal } from "antd";
import { Link } from "react-router-dom";
import Styles from "../styles/pickingList.module.css";

const { Column } = Table;
const { Header, Content, Footer } = Layout;

function AdminOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [customerInfoModalVisible, setCustomerInfoModalVisible] =
    useState(false);
  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/orders")
      .then((response) => response.json())
      .then((data) => {
        const orders = data.orders || [];

        const ordersWithData = orders.map((order) => ({
          ...order,
          products: order.products || [],
        }));
        setAllOrders(ordersWithData);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    { key: 1, label: "Storage", path: "/admin" },
    { key: 2, label: "Add products", path: "/admin/add/products" },
    { key: 3, label: "Orders", path: "/admin/orders" },
    { key: 4, label: "Categories", path: "/admin/categories" },
  ];

  const handlePickingListClick = (products) => {
    setSelectedProducts(products);
    setModalVisible(true);
  };

  const handleCustomerInfoClick = (customerInfo) => {
    setSelectedCustomerInfo(customerInfo);
    setCustomerInfoModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCustomerInfoModalVisible(false);
    setSelectedProducts([]);
    setSelectedCustomerInfo({});
  };

  const getStatusTagColor = (status) => {
    switch (status) {
      case "Ordered":
        return "red";
      case "Delivered":
        return "green";
      case "Out for delivery":
        return "blue";
      default:
        return "default";
    }
  };

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
          <Breadcrumb.Item>Orders</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Table dataSource={allOrders}>
            <Column title="Order ID" dataIndex="_id" key="_id" />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status) => (
                <Tag color={getStatusTagColor(status)}>{status}</Tag>
              )}
            />
            <Column
              title="Picking List"
              dataIndex="products"
              key="products"
              render={(products) => (
                <a onClick={() => handlePickingListClick(products)}>
                  View Picking List
                </a>
              )}
            />
            <Column
              title="Customer Info"
              key="customer"
              render={(text, info) => (
                <a onClick={() => handleCustomerInfoClick(info.customer)}>
                  View Customer Info
                </a>
              )}
            />
          </Table>
        </div>
        <Modal
          title="Picking List"
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {selectedProducts.map((product, index) => (
            <div key={index}>
              <ul>
                <li className={Styles.pickingList}>
                  {/* <p>{product.title}</p> */}
                  <p>{product.productId}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Unit Price: {product.unitPrice}</p>
                </li>
              </ul>
            </div>
          ))}
        </Modal>
        <Modal
          title="Customer Info"
          visible={customerInfoModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {selectedCustomerInfo && (
            <>
              <p>Name: {selectedCustomerInfo.name}</p>
              <p>Email: {selectedCustomerInfo.email}</p>
              <p>Phone Number: {selectedCustomerInfo.phoneNumber}</p>
              <p>Address: {selectedCustomerInfo.address}</p>
              <p>Invoice Address: {selectedCustomerInfo.invoiceAddress}</p>
            </>
          )}
        </Modal>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Hakims livs webbshop ©{new Date().getFullYear()} Created by Grupp 1
      </Footer>
    </Layout>
  );
}

export default AdminOrders;
