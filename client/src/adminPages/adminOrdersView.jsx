import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  Tag,
  Table,
  theme,
  Modal,
  Button,
  Popconfirm,
  Input,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/orders")
      .then((response) => response.json())
      .then((data) => {
        setAllOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const showEditModal = (record) => {
    setSelectedOrderForEdit(record);
    setEditedStatus(record.status); // Set initial status in the input field
    setEditModalVisible(true);
  };

  const handleDelete = (record) => {
    deleteOrder(record._id);
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${orderId}/delete`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      message.success("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order");
    }
  };

  const handleEditStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${selectedOrderForEdit._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: editedStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      // If successful, close modal and fetch updated orders
      setEditModalVisible(false);
      fetchOrders();
      message.success("Successfully edited status");
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  const handleInputChange = (e) => {
    setEditedStatus(e.target.value);
  };

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
    setEditModalVisible(false); // Close edit modal on general close
    setSelectedProducts([]);
    setSelectedCustomerInfo({});
    setSelectedOrderForEdit(null);
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
            <Column
              title="Edit Status"
              key="edit"
              render={(text, record) => (
                <Button type="primary" onClick={() => showEditModal(record)}>
                  Edit Status <EditOutlined />
                </Button>
              )}
            />
            <Column
              title="Delete"
              key="delete"
              render={(text, record) => (
                <Popconfirm
                  title="Are you sure to delete this order?"
                  onConfirm={() => handleDelete(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>
                    Delete <DeleteOutlined />
                  </Button>
                </Popconfirm>
              )}
            />
          </Table>
        </div>
        {/* Edit Status Modal */}
        <Modal
          title="Edit Status"
          visible={editModalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleEditStatus}>
              Submit
            </Button>,
          ]}
        >
          <Input value={editedStatus} onChange={handleInputChange} />
        </Modal>
        {/* Picking List Modal */}
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
                  <p>{product.title}</p>
                  <p>{product.productId}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Unit Price: {product.unitPrice}</p>
                </li>
                <Button type="primary">Skriv ut </Button>
              </ul>
            </div>
          ))}
        </Modal>
        {/* Customer Info Modal */}
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
              <Button type="primary">Skriv ut </Button>
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
