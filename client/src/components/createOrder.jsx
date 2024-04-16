import React, { useState, useEffect } from "react";
import { Button, Row, Col, Typography } from "antd";
const { Title, Text } = Typography;

function CreateOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

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

  const calculateSubTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(total);
  };

  const shippingCost = 50; // Hardcoded shipping cost
  const totalCost = subTotal + shippingCost;

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
      <Button type="primary" style={{ marginTop: "20px" }}>
        Place Order
      </Button>
    </div>
  );
}

export default CreateOrder;
