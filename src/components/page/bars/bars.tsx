import React, { useState } from "react";
import { Button, Row, Col, Segmented } from "antd";
import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { FiUser, FiPhone } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { Box } from "@mui/material";

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
  {
    id: 8549,
    name: "Muhammad Jumayev",
    time: "00:24",
    phone: "(+99 893) 461-41-88",
    total: 40400,
    payment: "Payme",
    status: "yangi",
    operator: "Komilova M",
    branch: "Fast Food Maksim Gorkiy",
  },
  {
    id: 8534,
    name: "Deveeprasad Acharya",
    time: "00:34",
    phone: "(+99 893) 461-41-88",
    total: 40400,
    payment: "Payme",
    status: "yangi",
    operator: "Komilova M",
    branch: "Fast Food Maksim Gorkiy",
  },
  {
    id: 8522,
    name: "Thoma Fulloway",
    time: "00:50",
    phone: "(+99 893) 461-41-88",
    total: 40400,
    payment: "Payme",
    status: "yangi",
    operator: "Komilova M",
    branch: "Fast Food Chilonzor",
  },
  {
    id: 8512,
    name: "Jacquelin Likoki",
    time: "04:14",
    phone: "(+99 893) 461-41-88",
    total: 40400,
    payment: "Payme",
    status: "yangi",
    operator: "Komilova M",
    branch: "Fast Food Chilonzor",
  },
];

const Buyurtmalar = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState<string>("yangi");

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
  const filteredOrders = orders.filter(
    (order) => order.status === selectedStatus
  );

  return (
    <div style={{ padding: "20px" }}>
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
          {
            label: <span style={{ padding: "0 50px" }}>Yangi</span>,
            value: "yangi",
          },
          {
            label: <span style={{ padding: "0 50px" }}>Qabul qilingan</span>,
            value: "qabul qilingan",
          },
          {
            label: <span style={{ padding: "0 50px" }}>Jo'natilgan</span>,
            value: "jo'natilgan",
          },
          {
            label: <span style={{ padding: "0 50px" }}>Yopilgan</span>,
            value: "yopilgan",
          },
        ]}
        onChange={(value) => setSelectedStatus(value)}
      />

      <Row gutter={[16, 16]}>
        {filteredOrders.map((item) => (
          <Col span={24} key={item.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  border: "1px solid EDEFF3",
                  padding: "20px",
                  background: "white",
                  height: "200px",
                  marginTop: "20px",
                  marginLeft: "30px",
                  borderRadius: "10px",
                  borderBottomRightRadius: "0px",
                  borderTopRightRadius: "0px",
                  borderRight: "2px solid #EDEFF3",
                  width: "370px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "160px",
                    borderBottom: "1px solid #dfdede",
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      padding: "10px",
                      background: "#20D472",
                      textAlign: "center",
                      borderRadius: "50px",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <p>8549</p>
                  </div>
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      padding: "10px",
                      borderRadius: "50%",
                      fontSize: "16px",
                      textAlign: "center",
                      backgroundColor: "#EDEFF3",
                    }}
                  >
                    <CiBookmark
                      style={{ fontSize: "25px", fontWeight: "bolder" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "20px",
                    alignItems: "center",
                    paddingTop: "20px",
                  }}
                >
                  <GoClock style={{ fontSize: "20px" }} />
                  <p style={{ fontSize: "20px" }}>{item.time}</p>
                </div>
              </Box>
              <Box
                sx={{
                  border: "1px solid #EDEFF3",
                  padding: "20px",
                  background: "white",
                  height: "200px",
                  borderRadius: "10px",
                  borderRight: "2px solid #EDEFF3",
                  width: "370px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    borderBottom: "1px solid #dfdede",
                    textAlign: "center",
                    paddingBottom: "30px",
                  }}
                >
                 
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "15px",
                    alignItems: "baseline",
                  }}
                >
                  <FiUser style={{ fontSize: "20px", color: "#8D9BA8" }} />
                  <p style={{ fontSize: "20px" }}>{item.name}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    alignItems: "center",
                    marginTop: "20px",
                    paddingTop: "20px",
                  }}
                >
                  <FiPhone style={{ fontSize: "20px", color: "#8D9BA8" }} />
                  <p style={{ fontSize: "15px" }}>{item.phone}</p>
                </div>
              </Box>
              <Box
                sx={{
                  border: "1px solid #EDEFF3",
                  padding: "20px",
                  background: "white",
                  borderRight: "2px solid #EDEFF3",
                  width: "370px",
                  height: "200px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "30px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <CiBookmark style={{ color: "grey", fontSize: "20px" }} />
                      <p style={{ fontSize: "17px" }}>{item.total} UZS</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <CiDeliveryTruck
                        style={{ color: "grey", fontSize: "20px" }}
                      />
                      <p style={{ fontSize: "17px" }}>5,000 UZS</p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        background: "#14E5E4",
                        borderRadius: "50%",
                        padding: "6px",
                      }}
                    ></span>
                    <p style={{ fontSize: "15px" }}>{item.payment}</p>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    marginLeft: "18px",
                    paddingTop: "20px",
                  }}
                >
                  <p style={{ fontSize: "11px", color: "#8D9BA8" }}>
                    Umumiy summa
                  </p>
                  <p style={{ fontSize: "23px", color: "black" }}>
                    {item.total} UZS
                  </p>
                </div>
              </Box>
              <Box
                sx={{
                  border: "1px solid #EDEFF3",
                  borderRadius: "10px",
                  padding: "20px",
                  background: "white",
                  width: "370px",
                  height: "200px",
                  borderBottomLeftRadius: "0px",
                  borderTopLeftRadius: "0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "55px",
                  }}
                >
                  <div>
                    <p style={{ color: "#8D9BA8" }}>Operator:</p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.operator}
                    </p>
                  </div>
                  <div
                    style={{
                      marginRight: "-40px",
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: "50%",
                        width: "45px",
                        height: "45px",
                      }}
                      onClick={() => handleStatusChange(item.id)}
                    >
                      <IoMdCheckmark />
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "55px",
                    marginTop: "25px",
                  }}
                >
                  <div>
                    <p style={{ color: "#8D9BA8" }}>Filial:</p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.branch}
                    </p>
                  </div>
                </div>
              </Box>
            </Box>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Buyurtmalar;
