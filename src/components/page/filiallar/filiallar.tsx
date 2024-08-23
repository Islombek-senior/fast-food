import {
  Button,
  Card,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Row,
  Space,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import "../filiallar/filial.css"; // Ensure this path is correct
import { HiOutlinePencil } from "react-icons/hi2";
import { LuPen } from "react-icons/lu";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import TextArea from "antd/es/input/TextArea";
import L from "leaflet"; // Leaflet import for custom icons

interface Product {
  id: number;
  nameuz: string;
  nameru: string;
  locate: string;
  hour: string;
}

const Filiallar: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [location, setLocation] = useState("");
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505,
    -0.09,
  ]); // Default position [Lat, Lng]

  const showDefaultDrawer = () => {
    setSize("default");
    setOpen(true);
  };

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  const LocationMap = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMapPosition([lat, lng]);

        // Convert latitude and longitude to an address using reverse geocoding
        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          )
          .then((res) => {
            const address = res.data.display_name;
            setLocation(address);
          })
          .catch((err) => {
            console.error("Geocoding error:", err);
          });
      },
    });
    return null;
  };

  const handleSave = () => {
    // Saqlash funksiyasini qo'shishingiz mumkin
    console.log("Location saved:", location);
    onClose(); // Modalni yopish
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
          className="flex items-center gap-5"
        >
          <Button
            onClick={showDefaultDrawer}
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
            Yangi filial <br />
            qo’shish
          </h2>
        </div>

        <div className="search ml-20 relative">
          <Input
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
      </div>

      <Row>
        <div
          style={{
            marginTop: "40px",
            marginBottom: "40px",
            width: "100%",
            height: "auto",
            padding: "23px",
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
            <p>Filial nomi (UZ)</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Filial nomi (Ru)</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Mo’ljal</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Ish vaqti</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>ACTION</p>
          </div>
        </div>
        {data.map((f) => (
          <Col span={24} style={{ padding: "13px", marginTop: -14 }} key={f.id}>
            <Card
              className="card-col" // Apply hover effect class
              style={{
                borderRadius: "8px",
                boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
                height: "80px",
              }}
              hoverable
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textAlign: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    alignItems: "center",
                    width: `calc(100% / 5)`,
                  }}
                >
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
                  <button
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      boxShadow: "0px 2px 2px 0px #AEB0B550",
                    }}
                    className="bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  >
                    <LuPen />
                  </button>
                  <button
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      boxShadow: "0px 2px 2px 0px #AEB0B550",
                    }}
                    className="bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title="Filial qo'shish"
        placement="right"
        closable
        onClose={onClose}
        open={open}
        size={size}
        footer={
          <Button
            type="primary"
            onClick={handleSave}
            style={{ borderRadius: "10px" }}
          >
            Saqlash
          </Button>
        }
      >
        <div>
          <Form layout="vertical">
            <Form.Item label="Filial nomi (UZ)">
              <Input placeholder="Filial nomi (UZ)" />
            </Form.Item>
            <Form.Item label="Filial nomi (RU)">
              <Input placeholder="Filial nomi (RU)" />
            </Form.Item>
            <Form.Item label="Mo’ljal">
              <Input placeholder="Mo’ljal" />
            </Form.Item>
            <Form.Item label="Ish vaqti">
              <TextArea rows={4} placeholder="Ish vaqti" />
            </Form.Item>
          </Form>
          <MapContainer
            center={mapPosition}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMap />
            <Marker
              position={mapPosition}
              icon={L.divIcon({ className: "custom-icon" })}
            />
          </MapContainer>
        </div>
      </Drawer>
    </div>
  );
};

export default Filiallar;
