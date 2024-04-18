import React, { useState, useEffect } from "react";
import { message, Button, Row, Col, Typography, Modal } from "antd";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

function CreateOrder({ customerDetails, cartItems, setCartItems }) {
  const [subTotal, setSubTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem("productsInCart");
      if (storedProducts) {
        const items = JSON.parse(storedProducts);
        setCartItems(items);
        calculateSubTotal(items);
      }
    };

    loadProducts();

    // Event listener for the custom event
    const handleStorageUpdate = () => {
      loadProducts();
    };

    window.addEventListener("localStorageUpdated", handleStorageUpdate);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageUpdate);
    };
  }, []);

  useEffect(() => {
    calculateSubTotal(cartItems);
  }, [cartItems]); // Re-calculate subtotal when cartItems changes

  const calculateSubTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(total);
  };

  const shippingCost = 50; // Hardcoded shipping cost
  const totalCost = subTotal + shippingCost;

  const handlePlaceOrder = async () => {
    if (!customerDetails || Object.keys(customerDetails).length === 0) {
      message.error(
        "No details saved. Please save your details before placing the order."
      );
      return;
    }

    const orderData = {
      customer: customerDetails,
      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
    };

    try {
      const response = await fetch("http://localhost:8080/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();
      setOrderDetails(result); // Save order details to state
      setIsModalVisible(true); // Show the modal on successful order placement
      localStorage.clear(); // Clear all local storage data
      setCartItems([]); // Clear cart items from state
    } catch (error) {
      console.error("Failed to place order:", error);
      message.error("Failed to place order. Please try again.");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div>
      <Title level={3} style={{ textAlign: "left" }}>
        Total of order
      </Title>
      <Row justify="space-between" style={{ margin: "10px 0" }}>
        <Col>
          <Text style={{ fontSize: "18px" }}>Sub total:</Text>
        </Col>
        <Col>
          <Text style={{ fontSize: "16px" }}>{subTotal.toFixed(2)} Kr</Text>
        </Col>
      </Row>
      <Row justify="space-between" style={{ margin: "10px 0" }}>
        <Col>
          <Text style={{ fontSize: "18px" }}>Shipping:</Text>
        </Col>
        <Col>
          <Text style={{ fontSize: "16px" }}>{shippingCost.toFixed(2)} Kr</Text>
        </Col>
      </Row>
      <Row justify="space-between" style={{ margin: "10px 0" }}>
        <Col>
          <Text style={{ fontSize: "19px", fontWeight: "bold" }}>Total:</Text>
        </Col>
        <Col>
          <Text style={{ fontSize: "18px" }}>{totalCost.toFixed(2)} Kr</Text>
        </Col>
      </Row>
      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
      <Modal
        title="Order placed successfully!"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={handleModalOk}>
            Back to homepage
          </Button>,
        ]}
      >
        <p>Order number: {orderDetails._id}</p>
        <p>Order details and invoice copy sent to {customerDetails.email}</p>
      </Modal>
    </div>
  );
}

export default CreateOrder;
