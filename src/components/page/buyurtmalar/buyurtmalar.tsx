import { Button, Card, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import "../buyurtmalar/css.css";
import { HiMenuAlt4 } from "react-icons/hi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import axios from "axios";
import { LuPen } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
interface Product {
  id: number;
  nameuz: string;
  nameru: string;
  locate: string;
  hour: string;
}

function Buyurtmalar() {
  const [activeButton, setActiveButton] = useState("Yangi");
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://4a39859802af3eec.mokky.dev/filiallar")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return (
    <div>
      <div className="bg-white flex items-center">
        <div
          style={{
            borderRight: "1px solid #EDEFF3",
            borderLeft: "1px solid #EDEFF3",
            padding: "20px",
            paddingLeft: "50px",
            width: "270px",
          }}
          className="flex items-center gap-5">
          <Button
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
            }}>
            Yangi filial
            <br />
            qo’shish
          </h2>
        </div>

        {/* activpage */}
        <div
          className="flex items-center justify-between"
          style={{
            width: "591px",
            height: "48px",
            background: "#EDEFF3",
            borderRadius: "30px",
            padding: "5px",
            marginLeft: "50px",
          }}>
          <button
            className={activeButton === "Yangi" ? "activ" : "inActiv"}
            onClick={() => handleButtonClick("Yangi")}>
            Yangi
          </button>
          <button
            className={activeButton === "Qabul qilingan" ? "activ" : "inActiv"}
            onClick={() => handleButtonClick("Qabul qilingan")}>
            Qabul qilingan
          </button>
          <button
            className={activeButton === "Jo’natilgan" ? "activ" : "inActiv"}
            onClick={() => handleButtonClick("Jo’natilgan")}>
            Jo’natilgan
          </button>
          <button
            className={activeButton === "Yopilgan" ? "activ" : "inActiv"}
            onClick={() => handleButtonClick("Yopilgan")}>
            Yopilgan
          </button>
        </div>

        {/* table,card */}

        <div
          style={{
            borderLeft: "1px solid #EDEFF3",
            width: "100px",
            marginLeft: "290px",
          }}
          className="flex items-center gap-5">
          <div
            className=" flex items-center justify-between"
            style={{
              width: "120px",
              height: "45px",
              background: "#EDEFF3",
              paddingRight: "10px",
              borderRadius: "30px",
              padding: "7px",
              marginLeft: "20px",
            }}>
            <Button className="iconActiv">
              <HiMenuAlt4 />
            </Button>
            <Button>
              <HiOutlineMenuAlt3 />
            </Button>
          </div>
        </div>
      </div>

      <Row>
        <div className=" mt-10 w-full">
          {data.map((f) => (
            <Col
              span={24}
              style={{ padding: "13px", marginTop: -14 }}
              key={f.id}>
              <Card
                style={{
                  borderRadius: "8px",
                  boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
                  height: "180px",
                }}
                hoverable>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    textAlign: "start",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "30px",
                      alignItems: "center",
                      width: `calc(100% / 5)`,
                    }}>
                    <p>{f.nameuz}</p>
                  </div>
                  <div style={{ width: `calc(100% / 5)` }}>
                    <p>{f.nameru}</p>
                  </div>
                  <div style={{ width: `calc(100% / 5)` }}>
                    <p>{f.locate}</p>
                  </div>
                  <div style={{ width: `calc(100% / 5)` }}>
                    <p>{f.hour}</p>
                  </div>

                  <div className="flex space-x-2 mt-2">
                    <Button
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      icon={<LuPen />}
                    />
                    <Button
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "red",
                      }}
                      icon={<FaRegTrashCan />}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </div>
      </Row>
    </div>
  );
}

export default Buyurtmalar;
