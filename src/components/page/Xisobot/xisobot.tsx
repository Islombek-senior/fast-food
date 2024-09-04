import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { FiPenTool, FiPlus, FiTrash2 } from "react-icons/fi";
import "../Xisobot/xisobot.css";
import { HiMenuAlt4 } from "react-icons/hi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdRestartAlt } from "react-icons/md";
import { IoSearchOutline, IoShapesOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { RiInboxArchiveLine } from "react-icons/ri";
import Chart from "react-apexcharts";
import ApexCharts from "react-apexcharts";
import { Box } from "@mui/material";

interface Xisobot {
  id: number;
  filial: string;
  opName: string;
  orderSum: string;
  orderType: string;
  mijoz: string;
  customNum: string;
  dates: string;
  hours: string;
}

function Xisobot() {
  const [activeButton, setActiveButton] = useState("Yangi");
  const [xisobot, setXisobot] = useState<Xisobot[]>([]);
  const [switches, setSwitch] = useState<boolean>(false);
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();
  interface ApexOptions {
    chart?: {
      id?: string;
      type?:
        | "line"
        | "area"
        | "bar"
        | "pie"
        | "donut"
        | "radialBar"
        | "scatter"
        | "bubble"
        | "heatmap"
        | "candlestick"
        | "boxPlot"
        | "radar"
        | "polarArea"
        | "rangeBar"
        | "rangeArea"
        | "treemap";
    };
    xaxis?: {
      categories?: string[];
    };
    title?: {
      text?: string;
      align?: "left" | "center" | "right";
    };
    stroke?: {
      curve?: "smooth" | "straight" | "stepline" | "linestep" | "monotoneCubic";
    };
    yaxis?: {
      title?: {
        text?: string;
      };
    };
    // boshqa parametrlar...
  }

  const options1 = {
    chart: {
      id: "chart1",
    },
    colors: ["#19C655"], // Blue color for the first chart
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const options2 = {
    chart: {
      id: "chart2",
    },
    colors: ["#FA2738"], // Red color for the second chart
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };
  const series = [
    {
      name: "Sales",
      data: [30, 40, 35, 50, 49, 60],
    },
  ];

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const deleteX = (id: number) => {
    axios
      .delete(`https://e2ead815ad4a2894.mokky.dev/xisobot/${id}`)
      .then(() => {
        setXisobot(xisobot.filter((t) => t.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const switchesCom = (y: boolean) => {
    setSwitch(y);
  };

  const serachX = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .get(
        `https://e2ead815ad4a2894.mokky.dev/xisobot?mijoz=*${e.target.value}`
      )
      .then((res) => {
        setXisobot(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/xisobot")
      .then((res) => {
        setXisobot(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const nameUp = (e: CheckboxChangeEvent) => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/xisobot")
      .then((res) => {
        const sorted = res.data.sort((a: Xisobot, b: Xisobot) =>
          a.mijoz.localeCompare(b.mijoz)
        );
        setXisobot(sorted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const nameDown = (e: CheckboxChangeEvent) => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/xisobot")
      .then((res) => {
        const sorted = res.data.sort((a: Xisobot, b: Xisobot) =>
          b.mijoz.localeCompare(a.mijoz)
        );
        setXisobot(sorted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const orderSumUp = (e: CheckboxChangeEvent) => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/xisobot")
      .then((res) => {
        const sorted = res.data.sort(
          (a: any, b: any) => parseFloat(a.orderSum) - parseFloat(b.orderSum)
        );
        setXisobot(sorted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const orderSumDown = (e: CheckboxChangeEvent) => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/xisobot")
      .then((res) => {
        const sorted = res.data.sort(
          (a: any, b: any) => parseFloat(b.orderSum) - parseFloat(a.orderSum)
        );
        setXisobot(sorted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const items = [
    {
      key: "1",
      label: <Checkbox onChange={nameUp}>Nom bo’yicha (A-Z)</Checkbox>,
    },
    {
      key: "2",
      label: <Checkbox onChange={nameDown}>Nom bo’yicha (Z-A)</Checkbox>,
    },
    {
      key: "3",
      label: (
        <Checkbox onChange={orderSumUp}>Summa (O’sish tartibida)</Checkbox>
      ),
    },
    {
      key: "4",
      label: (
        <Checkbox onChange={orderSumDown}>Summa (Kamayish tartibida)</Checkbox>
      ),
    },
  ];
  return (
    <div>
      {/* <h1>{count}</h1> */}
      <div className="bg-white flex items-center">
        <div
          style={{
            borderRight: "1px solid #EDEFF3",
            borderLeft: "1px solid #EDEFF3",
            paddingLeft: "30px",
            padding: "30px",
            width: "220px",
          }}
          className="flex items-center gap-5"
        >
          <Button
            style={{
              borderRadius: "50%",
              backgroundColor: "#20D472",
              color: "white",
              width: "40px",
              height: "40px",
              paddingLeft: "2px",
            }}
            icon={<MdRestartAlt style={{ fontSize: "30px" }} />}
          />
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            Ma’lumotlarni
            <br />
            yangilash
          </h2>
        </div>

        <div className="search ml-20 relative">
          <Input
            onChange={serachX}
            style={{
              borderRadius: "24px",
              width: "300px",
              height: "44px",
              backgroundColor: "#EDEFF3",
              border: "none",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontSize: "16px",
              outline: "none",
            }}
            placeholder="Qidirish"
          />
          <IoSearchOutline
            style={{
              position: "absolute",
              top: "50%",
              right: "0%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              fontSize: "22px",
              color: "#8D9BA8",
            }}
          />
        </div>

        {/* filter */}

        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button
            style={{
              borderRadius: "50%",
              border: "1px solid lightgrey",
              backgroundColor: "#ffffff",
              boxShadow: "4px 4px 14px rgba(114, 113, 113, 0.2)",
              height: "44px",
              width: "44px",
              marginLeft: "20px",
            }}
          >
            <CiFilter
              style={{
                fontSize: "22px",
              }}
            />
          </Button>
        </Dropdown>

        {/* table,card */}

        <div
          style={{
            borderLeft: "1px solid #EDEFF3",
            width: "100%",
            marginLeft: "480px",
          }}
          className="flex items-center gap-5"
        >
          <div
            className="flex items-center justify-around"
            style={{
              width: "100%",
              height: "45px",
              background: "#EDEFF3",
              paddingRight: "10px",
              borderRadius: "30px",
              padding: "7px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <Button
              className="iconActiv"
              style={{
                background: switches === false ? "#EDEFF3" : "white",
                border: switches === false ? "none" : "white",
              }}
              onClick={() => switchesCom(false)}
            >
              <IoShapesOutline />
            </Button>
            <Button
              style={{
                background: switches === true ? "#EDEFF3" : "white",
                border: switches === false ? "none" : "white",
              }}
              onClick={() => switchesCom(true)}
            >
              <RiInboxArchiveLine />
            </Button>
          </div>
        </div>
      </div>

      {switches ? (
        <Row>
          <div
            style={{
              marginTop: "40px",
              marginBottom: "40px",
              width: "100%",
              height: "auto",
              padding: "13px",
              background: "white",
              display: "flex",
              justifyContent: "center",
              textAlign: "end",
              gap: "90px",
              alignContent: "center",
              fontWeight: "bolder",
              boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
            }}
          >
            <div className="flex gap-10 items-center">
              <p>FILIAL</p>
            </div>
            <div style={{ borderRight: "1px solid grey" }}></div>
            <div className="flex gap-10 items-center">
              <p>BUYURTMA SUMMASI</p>
            </div>
            <div style={{ borderRight: "1px solid grey" }}></div>
            <div className="flex gap-10 items-center">
              <p>MIJOZ</p>
            </div>
            <div style={{ borderRight: "1px solid grey" }}></div>
            <div className="flex gap-10 items-center">
              <p>SANA</p>
            </div>
            <div style={{ borderRight: "1px solid grey" }}></div>
            <div className="flex gap-10 items-center">
              <p>ACTION</p>
            </div>
          </div>
          <Col xs={24}>
            {xisobot.map((it) => (
              <Card
                key={it.id}
                style={{
                  marginLeft: "30px",
                  marginRight: "30px",
                  marginBottom: "10px",
                }}
                className="hover:translate-x-2, translate-y-2, shadow-lg"
              >
                <div className="flex justify-around align-middle w-full">
                  <div style={{ width: `calc(100 / 5)` }}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "revert",
                        marginBottom: "8px",
                      }}
                    >
                      {it.filial}
                    </p>
                    <p style={{ color: "grey" }}>{it.opName}</p>
                  </div>
                  <div style={{ width: `calc(100 / 5)` }}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "revert",
                        marginBottom: "8px",
                      }}
                    >
                      {it.orderSum},000
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "15px",
                        color: "grey",
                      }}
                    >
                      <span
                        style={{
                          width: "2px",
                          height: "2px",
                          borderRadius: "50%",
                          backgroundColor: "#64EDF4",
                          padding: "4px",
                        }}
                      ></span>
                      {it.orderType}
                    </div>
                  </div>

                  <div style={{ width: `calc(100 / 5)` }}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "revert",
                        marginBottom: "8px",
                      }}
                    >
                      {it.mijoz}
                    </p>
                    <p style={{ color: "grey" }}>{it.customNum}</p>
                  </div>
                  <div style={{ width: `calc(100 / 5)` }}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "revert",
                        marginBottom: "8px",
                      }}
                    >
                      {it.dates}
                    </p>
                    <p style={{ color: "grey" }}>{it.hours}</p>
                  </div>
                  <div style={{ width: `calc(100 / 5)` }}>
                    <Button
                      onClick={() => deleteX(it.id)}
                      style={{
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col
            span={11}
            style={{
              paddingTop: "10px",
              paddingLeft: "25px",
              marginRight: "25px",
            }}
          >
            <Card>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "30px",
                }}
              >
                <Box>
                  <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Sales Data
                  </h1>
                </Box>
                <Space>
                  <DatePicker onChange={onChange} />
                </Space>
              </Box>
              <ApexCharts
                options={options1}
                series={series}
                type="line"
                height={350}
              />
            </Card>
          </Col>
          <Col
            span={11}
            style={{
              paddingTop: "10px",
              paddingLeft: "25px",
              marginRight: "25px",
            }}
          >
            <Card title="Sales Data">
              <ApexCharts
                options={options2}
                series={series}
                type="line"
                height={350}
              />
            </Card>
          </Col>
          <Col
            span={11}
            style={{
              paddingTop: "10px",
              paddingLeft: "25px",
              marginRight: "25px",
            }}
          >
            <Card>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <Box>
                  <p>To’lov turlari | Xadra</p>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "30px",
                  }}
                >
                  <p>19.02.2020</p>
                  <Space>
                    <DatePicker onChange={onChange} />
                  </Space>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "2px",
                      height: "2px",
                      borderRadius: "50%",
                      backgroundColor: "#FCB600",
                      padding: "4px",
                    }}
                  ></span>
                  <p>Terminal - 1,200,000 UZS</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      background: "#FCB600",
                      padding: "5px",
                      width: "210px",
                      borderRadius: "10px",
                    }}
                  ></div>
                  <p>45%</p>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "2px",
                      height: "2px",
                      borderRadius: "50%",
                      backgroundColor: "#20D472",
                      padding: "4px",
                    }}
                  ></span>{" "}
                  <p>Naqd - 1,340,000 UZS</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      background: "#20D472",
                      padding: "5px",
                      width: "110px",
                      borderRadius: "10px",
                    }}
                  ></div>
                  <p>57%</p>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <span
                    style={{
                      width: "2px",
                      height: "2px",
                      borderRadius: "50%",
                      backgroundColor: "#64EDF4",
                      padding: "4px",
                    }}
                  ></span>{" "}
                  <p>Payme - 1,200,000 UZS</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      background: "#64EDF4",
                      padding: "5px",
                      width: "100px",
                      borderRadius: "10px",
                    }}
                  ></div>
                  <p>45%</p>
                </div>
              </Box>
              <Button style={{ marginTop: "20px" }}>3,740,000 UZS</Button>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Xisobot;
