import React, { useState } from "react";
import { Button, Card, Row, Col, Segmented } from "antd";  // Import Card and Segmented from Ant Design
import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";  // Import necessary icons
import { GoClock } from "react-icons/go";  // Import clock icon
import { FiUser, FiPhone } from "react-icons/fi";  // Import user and phone icons
import { IoMdCheckmark } from "react-icons/io";  // Import checkmark icon

// Buyurtma interfeysi
interface Order {
  id: number;
  name: string;
  time: string;
  phone: string;
  total: number;
  payment: string;
  status: string;
  operator: string;
  branch: string;
}

// Boshlang'ich buyurtmalar ro'yxati
const initialOrders: Order[] = [
  { id: 8549, name: "Muhammad Jumayev", time: "00:24", phone: "(+99 893) 461-41-88", total: 40400, payment: "Payme", status: "yangi", operator: "Komilova M", branch: "Fast Food Maksim Gorkiy" },
  { id: 8534, name: "Deveeprasad Acharya", time: "00:34", phone: "(+99 893) 461-41-88", total: 40400, payment: "Payme", status: "yangi", operator: "Komilova M", branch: "Fast Food Maksim Gorkiy" },
  { id: 8522, name: "Thoma Fulloway", time: "00:50", phone: "(+99 893) 461-41-88", total: 40400, payment: "Payme", status: "yangi", operator: "Komilova M", branch: "Fast Food Chilonzor" },
  { id: 8512, name: "Jacquelin Likoki", time: "04:14", phone: "(+99 893) 461-41-88", total: 40400, payment: "Payme", status: "yangi", operator: "Komilova M", branch: "Fast Food Chilonzor" },
  { id: 8522, name: "Thoma Fulloway", time: "00:50", phone: "(+99 893) 461-41-88", total: 40400, payment: "Payme", status: "yangi", operator: "Komilova M", branch: "Fast Food Chilonzor" },
  { id: 8512, name: "Jacquelin Likoki", time: "04:14", phone: "(+99 893) 461-41-88", total: 40400, payment: "Payme", status: "yangi", operator: "Komilova M", branch: "Fast Food Chilonzor" },
];

const Buyurtmalar = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>('yangi');

  // Statusni yangilash funksiyasi
  const handleStatusChange = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          let newStatus = order.status;
          if (order.status === "yangi") {
            newStatus = "qabul qilingan";
          } else if (order.status === "qabul qilingan") {
            newStatus = "jo'natilgan";
          } else if (order.status === "jo'natilgan") {
            newStatus = "yopilgan";
          }
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  // Status bo'yicha buyurtmalarni filtrlash
  const filteredOrders = orders.filter(order => order.status === selectedStatus);

  return (
    <div>
      <Segmented<string>
        size="large"
        style={{
          padding: "5px 20px",
          borderRadius: 50,
          width: "100%",
          marginBottom: "20px",
        }}
        value={selectedStatus}
        options={[
          { label: <span style={{ padding: "0 50px" }}>Yangi</span>, value: "yangi" },
          { label: <span style={{ padding: "0 50px" }}>Qabul qilingan</span>, value: "qabul qilingan" },
          { label: <span style={{ padding: "0 50px" }}>Jo'natilgan</span>, value: "jo'natilgan" },
          { label: <span style={{ padding: "0 50px" }}>Yopilgan</span>, value: "yopilgan" },
        ]}
        onChange={(value) => setSelectedStatus(value)}
      />

      <Row gutter={[16, 16]}>
        {filteredOrders.map((item) => (
          <Col span={8} key={item.id}>
            <Card
              title={`ID: ${item.id}`}
              extra={<CiBookmark style={{ fontSize: "25px", color: "grey" }} />}
              style={{ marginBottom: "20px" }}
              actions={[
                <Button
                  type="primary"
                  icon={<IoMdCheckmark />}
                  onClick={() => handleStatusChange(item.id)}
                >
                  {item.status}
                </Button>
              ]}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <GoClock style={{ fontSize: "20px", marginRight: "8px" }} />
                <span>{item.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <FiUser style={{ fontSize: "20px", color: "#8D9BA8", marginRight: "8px" }} />
                <span>{item.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                <FiPhone style={{ fontSize: "20px", color: "#8D9BA8", marginRight: "8px" }} />
                <span>{item.phone}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <CiBookmark style={{ color: "grey", fontSize: "20px", marginRight: "8px" }} />
                    <span>{item.total} UZS</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CiDeliveryTruck style={{ color: "grey", fontSize: "20px", marginRight: "8px" }} />
                    <span>5,000 UZS</span>
                  </div>
                </div>
                <div>
                  <span style={{ background: "#14E5E4", borderRadius: "50%", padding: "6px", color: "white" }}>
                    {item.payment}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Buyurtmalar;
