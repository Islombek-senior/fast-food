import {
  Button,
  Card,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Modal,
  Row,
  Space,
  message,
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
  nameUz: string;
  nameRu: string;
  target: string;
  workingTime: string;
}

const Filiallar: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]); // State for filtered data
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>("default");
  const [location, setLocation] = useState("");
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    51.505, -0.09,
  ]);
  const [editingItem, setEditingItem] = useState<Product | null>(null); // State for editing
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [form] = Form.useForm();

  const showDrawer = (item?: Product) => {
    if (item) {
      // If editing, set the form with the selected item data
      setEditingItem(item);
      setLocation(item.target);
      setMapPosition([51.505, -0.09]); // Adjust this to item’s real location
      form.setFieldsValue(item); // Pre-fill the form with the item’s data
    } else {
      setEditingItem(null);
      form.resetFields(); // Clear the form when adding a new item
      setLocation("");
      setMapPosition([51.505, -0.09]);
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Haqiqatan ham o'chirmoqchimisiz?",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        axios
          .delete(`https://392e0f5b09d05ee3.mokky.dev/filiallar/${id}`)
          .then(() => {
            setData(data.filter((item) => item.id !== id));
            setFilteredData(filteredData.filter((item) => item.id !== id));
            message.success("Maʼlumot muvaffaqiyatli o'chirildi!");
          })
          .catch((error) => {
            console.log(error);
            message.error("Maʼlumotlarni o'chirishda xatolik yuz berdi");
          });
      },
    });
  };

  useEffect(() => {
    axios
      .get("https://392e0f5b09d05ee3.mokky.dev/filiallar")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data); // Initialize filtered data
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    // Filter data based on search query
    if (searchQuery) {
      setFilteredData(
        data.filter(
          (product) =>
            product.nameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.nameRu.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const LocationMap = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMapPosition([lat, lng]);
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
    form.validateFields().then((values) => {
      const newData = {
        ...values,
        target: location,
      };
      if (editingItem) {
        // If editing, send PUT request
        axios
          .patch(
            `https://392e0f5b09d05ee3.mokky.dev/filiallar/${editingItem.id}`,
            newData
          )
          .then((res) => {
            setData(
              data.map((item) =>
                item.id === editingItem.id ? { ...item, ...res.data } : item
              )
            );
            setFilteredData(
              filteredData.map((item) =>
                item.id === editingItem.id ? { ...item, ...res.data } : item
              )
            );
            message.success("Maʼlumot muvaffaqiyatli yangilandi!");
            setOpen(false); // Close drawer after editing
            form.resetFields(); // Clear the form after saving
          })
          .catch((error) => {
            console.error("Error updating data:", error);
            message.error("Xatolik yuz berdi, ma'lumot yangilanmadi.");
          });
      } else {
        // If adding a new item, send POST request
        axios
          .post("https://392e0f5b09d05ee3.mokky.dev/filiallar", newData)
          .then((res) => {
            setData([...data, res.data]);
            setFilteredData([...filteredData, res.data]); // Update filtered data
            message.success("Maʼlumot muvaffaqiyatli qoʻshildi!");
            setOpen(false); // Close drawer after adding
            form.resetFields(); // Clear the form after saving
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            message.error("Xatolik yuz berdi, ma'lumot saqlanmadi.");
          });
      }
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
            onClick={() => showDrawer()} // No item means adding a new one
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
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
            justifyContent: "space-evenly",
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
            <p>Filial nomi (RU)</p>
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
        {filteredData.map((product) => (
          <Col key={product.id} style={{ width: "100%" }}>
            <Card className="mb-3">
              <Row>
                <Col span={6}>
                  <p>{product.nameUz}</p>
                </Col>
                <Col span={6}>
                  <p>{product.nameRu}</p>
                </Col>
                <Col span={6}>
                  <p>{product.target}</p>
                </Col>
                <Col span={3}>
                  <p>{product.workingTime}</p>
                </Col>
                <Col span={3}>
                  <div className="flex space-x-2 mt-2 justify-end">
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
                      onClick={() => showDrawer(product)}
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
                      onClick={() => handleDelete(product.id)}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title={editingItem ? "Filialni tahrirlash" : "Yangi filial qo'shish"}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}>
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nameUz"
                label="Filial nomi (UZ)"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, filial nomini kiriting",
                  },
                ]}>
                <Input placeholder="Masalan: Tashkent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nameRu"
                label="Filial nomi (RU)"
                rules={[
                  {
                    required: true,
                    message: "Iltimos, filial nomini kiriting",
                  },
                ]}>
                <Input placeholder="Например: Ташкент" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="target"
                label="Mo'ljal"
                rules={[
                  { required: true, message: "Iltimos, mo'ljalni kiriting" },
                ]}>
                <TextArea value={location} placeholder="Mo'ljal" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="workingTime"
                label="Ish vaqti"
                rules={[
                  { required: true, message: "Iltimos, ish vaqtini kiriting" },
                ]}>
                <Input placeholder="09:00-18:00" />
              </Form.Item>
            </Col>
          </Row>

          <MapContainer
            center={mapPosition}
            zoom={13}
            style={{ height: "300px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={mapPosition} />
            <LocationMap />
          </MapContainer>

          <Row>
            <Col span={24} style={{ textAlign: "right", marginTop: "10px" }}>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Bekor qilish
              </Button>
              <Button type="primary" htmlType="submit">
                {"Saqlash"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Filiallar;
