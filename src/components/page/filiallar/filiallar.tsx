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
import { FiEdit, FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import "../filiallar/filial.css";
import { HiOutlinePencil } from "react-icons/hi2";
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
            form.setFieldsValue({ location: address });
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

      <div
        className="table-container"
        style={{ height: "90vh", overflowY: "auto" }}>
        <table className="w-full px-5 border-separate border-spacing-y-2">
          <thead className="h-20 bg-white sticky top-0">
            <tr>
              <th className="font-medium rounded-l-md">Mijoz ismi</th>
              <th className="font-medium">
                <span className="text-gray-400">|</span> Telefon raqam
              </th>
              <th className="font-medium">
                <span className="text-gray-400">|</span> Buyurtmalar soni
              </th>
              <th className="font-medium">
                <span className="text-gray-400">|</span> Status
              </th>
              <th className="font-medium rounded-r-md">
                <span className="text-gray-400">|</span> ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              return (
                <tr
                  key={item.id}
                  className="h-20 bg-white text-center rounded-md">
                  <td className="border-l border-t border-b border-gray-200 rounded-l-md text-center align-middle w-1/4">
                    {item.nameuz}
                  </td>
                  <td className="border-t border-b border-gray-200 w-1/5">
                    {item.nameru}
                  </td>
                  <td className="border-t border-b border-gray-200 w-1/5 font-medium">
                    {item.locate}
                  </td>
                  <td className="border-t border-b border-gray-200 w-1/5 font-medium">
                    {item.hour}
                  </td>
                  <td className="border-t border-b border-r border-gray-200 rounded-r-md w-1/6">
                    <Button className="p-2 border-4 rounded-full border-gray-200 me-4">
                      <FiEdit2 />
                    </Button>
                    <Button className="p-2 border-4 rounded-full border-gray-200">
                      <FaRegTrashCan />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Drawer
        title="Filial qo’shish"
        placement="right"
        onClose={onClose}
        open={open}
        size={size}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{}}
          style={{ maxWidth: 600 }}>
          <Form.Item
            name="nameuz"
            label="Filial nomi (Uzbek)"
            rules={[{ required: true, message: "Filial nomini kiriting" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="nameru"
            label="Filial nomi (Rus)"
            rules={[{ required: true, message: "Filial nomini kiriting" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="hour"
            label="Ish soatlari"
            rules={[{ required: true, message: "Ish soatlarini kiriting" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="location"
            label="Manzil"
            rules={[{ required: true, message: "Manzilni kiriting" }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSave}>
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Filiallar;
