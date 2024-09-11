import React, { useState, useEffect } from "react";
import { Button, Row, Col, Segmented } from "antd";
import { CiBookmark, CiDeliveryTruck } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { FiUser, FiPhone, FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { Box, Drawer } from "@mui/material";
import axios from "axios"; // axiosni o'rnatish kerak: `npm install axios`
import { BedTwoTone } from "@mui/icons-material";
import { HiMenuAlt4, HiOutlineMenuAlt3 } from "react-icons/hi";
import Drawers from "./drawer";
import Buyurtmalar2 from "../buyurtmalar/buyurtmalar";
import DrawerManager from "../bars/drawer"; // To'g'ri yo'lni tekshiring

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

interface Product {
  id: number;
  mijoz: string;
  customNum: string;
  orderSum: number;
  opName: string;
  filial: string;
  hours: string;
  statuss: string;
}

const Buyurtmalar = () => {
  const [orders, setOrders] = useState<Product[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("yangi");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [drawerSize, setDrawerSize] = useState<"small" | "default" | "large">(
    "default"
  );
  // Drawer ochilish uchun funksiya
  const handleDrawerOpen = () => {
    console.log("Drawer opened");
  };

  // Drawer o'lchamini o'zgartirish uchun funksiyani qo'shish
  const openDrawer = () => {
    setDrawerSize("large");
  };

  // API orqali buyurtmalarni olish
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://e2ead815ad4a2894.mokky.dev/xisobot"
        ); // API URL manzilini yozing
        setOrders(response.data); // Foydalanuvchi buyurtmalarni API'dan oladi
      } catch (error) {
        console.error("Buyurtmalarni yuklashda xato:", error);
      }
    };
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://e2ead815ad4a2894.mokky.dev/xisobot"
      );
      setOrders(response.data); // Foydalanuvchi buyurtmalarni API'dan oladi
    } catch (error) {
      console.error("Buyurtmalarni yuklashda xato:", error);
    }
  };

  // Statusni yangilash funksiyasi
  const handleStatusChange = async (orderId: number) => {
    console.log(orderId);
    try {
      const newOrder = orders.find((order) => orderId === order.id);
      if (newOrder?.statuss === "yangi") {
        newOrder.statuss = "qabul qilingan";
      } else if (newOrder?.statuss === "qabul qilingan") {
        newOrder.statuss = "jo'natilgan";
      } else if (newOrder?.statuss === "jo'natilgan") {
        newOrder.statuss = "yopilgan";
      }
      console.log(newOrder);

      await axios.patch(
        `https://e2ead815ad4a2894.mokky.dev/xisobot/${orderId}`,
        newOrder
      );
      fetchOrders();
    } catch (error) {
      console.error("Statusni yangilashda xato:", error);
    }
  };

  const handleStatusBack = async (orderId: number) => {
    try {
      const backOrder = orders.find((order) => orderId === order.id);
      if (backOrder?.statuss === "yopilgan") {
        backOrder.statuss = "jo'natilgan";
      } else if (backOrder?.statuss === "jo'natilgan") {
        backOrder.statuss = "qabul qilingan";
      } else if (backOrder?.statuss === "qabul qilingan") {
        backOrder.statuss = "yangi";
      }
      await axios.patch(
        `https://e2ead815ad4a2894.mokky.dev/xisobot/${orderId}`,
        backOrder
      );
      fetchOrders();
    } catch (err) {
      console.error("Statusni qayta to'lashda xato:", err);
    }
  };

  const filteredOrders = orders.filter(
    (order) => order.statuss === selectedStatus
  );

  return (
    <div style={{ width: "100%" }}>
      <div
        className="bg-white"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRight: "1px solid #EDEFF3",
            borderLeft: "1px solid #EDEFF3",
            padding: "20px",
            paddingLeft: "50px",
            width: "270px",
          }}
          className="flex items-center gap-5"
        >
          <Button
            onClick={handleDrawerOpen}
            style={{
              borderRadius: "50%",
              backgroundColor: "#20D472",
              color: "white",
              width: "40px",
              height: "40px",
              paddingLeft: "2px",
            }}
            icon={<FiPlus style={{ fontSize: "30px" }} />}
          />
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            Yangi buyurtma
            <br />
            qo’shish
          </h2>
        </div>
        <div style={{ padding: "10px" }}>
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
                label: (
                  <span style={{ padding: "0 50px" }}>Qabul qilingan</span>
                ),
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
        </div>
        <div
          style={{
            borderLeft: "1px solid #EDEFF3",
            width: "100px",
            marginRight: "30px",
          }}
          className="flex items-center gap-5"
        >
          <div
            className=" flex items-center justify-between gap-3"
            style={{
              width: "120px",
              height: "45px",
              background: "#EDEFF3",
              paddingRight: "10px",
              borderRadius: "30px",
              padding: "7px",
            }}
          >
            <Button className="iconActiv">
              <HiMenuAlt4 />
            </Button>
            <Button>
              <HiOutlineMenuAlt3 />
            </Button>
          </div>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {filteredOrders.map((item) => (
          <Col span={23} key={item.id} style={{ marginTop: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  border: "1px solid EDEFF3",
                  padding: "20px",
                  background: "white",
                  height: "200px",
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
                  <p style={{ fontSize: "20px" }}>{item.hours}</p>
                </div>
              </Box>
              <Box
                sx={{
                  border: "1px solid #EDEFF3",
                  padding: "20px",
                  background: "white",
                  height: "200px",
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
                ></div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "15px",
                    alignItems: "baseline",
                  }}
                >
                  <FiUser style={{ fontSize: "20px", color: "#8D9BA8" }} />
                  <p style={{ fontSize: "20px" }}>{item.mijoz}</p>
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
                  <p style={{ fontSize: "15px" }}>{item.customNum}</p>
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
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: "30px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <CiBookmark style={{ color: "grey", fontSize: "20px" }} />
                      <p style={{ fontSize: "17px" }}>{item.orderSum} UZS</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
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
                    <p style={{ fontSize: "15px" }}>Payme</p>
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
                    {item.orderSum} UZS
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
                      {item.opName}
                    </p>
                  </div>
                  <div
                    style={{
                      marginRight: "-40px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: "50%",
                        width: "45px",
                        height: "45px",
                        marginBottom: "20px",
                      }}
                      onClick={() => handleStatusChange(item.id)}
                    >
                      <IoMdCheckmark />
                    </Button>
                    <Button
                      style={{
                        borderRadius: "50%",
                        width: "45px",
                        height: "45px",
                      }}
                      onClick={() => handleStatusBack(item.id)}
                    >
                      X
                    </Button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "55px",
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
                      {item.filial}
                    </p>
                  </div>
                </div>
              </Box>
            </Box>
          </Col>
        ))}
      </Row>
      <DrawerManager onDrawerOpen={handleDrawerOpen} drawerSize={"large"} />
    </div>
  );
};

export default Buyurtmalar;
