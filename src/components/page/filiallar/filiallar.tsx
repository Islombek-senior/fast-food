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
import { LuPen } from "react-icons/lu";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import TextArea from "antd/es/input/TextArea";
import L from "leaflet"; // Leaflet import for custom icons
import { FaRegTrashCan } from "react-icons/fa6";

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
    51.505, -0.09,
  ]); // Default position [Lat, Lng]

  const [form] = Form.useForm(); // Ant Design Form instance

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
    form
      .validateFields()
      .then((values) => {
        const newData = {
          nameuz: values.nameuz,
          nameru: values.nameru,
          locate: location,
          hour: values.hour,
        };

        axios
          .post("https://4a39859802af3eec.mokky.dev/filiallar", newData)
          .then((res) => {
            console.log("Data saved successfully:", res.data);
            setData([...data, res.data]); // Add the new entry to the existing data
            onClose(); // Close the drawer
          })
          .catch((err) => {
            console.error("Error saving data:", err);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
            }}>
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
          }}>
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
                    }}
                    icon={<FaRegTrashCan />}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title="Yangi filial qo’shish"
        size={size}
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Bekor qilish</Button>
            <Button onClick={handleSave} type="primary">
              Saqlash
            </Button>
          </Space>
        }>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="nameuz"
            label="Filial nomi (UZ)"
            rules={[
              { required: true, message: "Iltimos, filial nomini kiriting!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="nameru"
            label="Filial nomi (RU)"
            rules={[
              { required: true, message: "Iltimos, filial nomini kiriting!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item name="hour" label="Ish vaqti">
            <Input />
          </Form.Item>

          <Form.Item label="Joylashuv">
            <MapContainer
              center={mapPosition}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "300px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={mapPosition} />
              <LocationMap />
            </MapContainer>
            <TextArea
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Filiallar;
