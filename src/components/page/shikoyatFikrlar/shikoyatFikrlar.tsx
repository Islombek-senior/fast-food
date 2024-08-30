import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Drawer,
  Typography,
  Form,
  message,
  Modal,
} from "antd";
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

const { Title } = Typography;
const { confirm } = Modal;

interface DataType {
  id: number;
  name: string;
  type: string;
}

const ShikoyatFikrlar = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]); // New state for filtered data
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const showDrawer = () => {
    form.resetFields();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values: { name: string; type: string }) => {
    axios
      .post("https://392e0f5b09d05ee3.mokky.dev/users", values)
      .then((res) => {
        setData([...data, res.data]);
        setFilteredData([...data, res.data]); // Update filtered data
        message.success("Maʼlumot muvaffaqiyatli qoʻshildi!");
      })
      .catch((error) => {
        console.log(error);
        message.error("Maʼlumotlarni qoʻshishda xatolik yuz berdi");
      });
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    confirm({
      title: "Rostdan ham o'chirmoqchimisiz?",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        axios
          .delete(`https://392e0f5b09d05ee3.mokky.dev/users/${id}`)
          .then(() => {
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
            setFilteredData(updatedData); // Update filtered data
            message.success("Maʼlumot muvaffaqiyatli o'chirildi!");
          })
          .catch((error) => {
            console.error("Xatolik yuz berdi:", error);
            message.error("Maʼlumotlarni o'chirishda xatolik yuz berdi");
          });
      },
      onCancel() {
        message.info("O'chirish amalini bekor qildingiz");
      },
    });
  };

  useEffect(() => {
    axios
      .get("https://392e0f5b09d05ee3.mokky.dev/users")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data); // Set filtered data on initial load
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredData(
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase())
      )
    );
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
              padding: "0",
            }}
            icon={<FiPlus style={{ fontSize: "24px" }} />}
            onClick={showDrawer}
          />
          <h2
            style={{
              fontWeight: "bold",
            }}>
            Yangi qo’shish
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
            value={searchTerm}
            onChange={handleSearch} // Update search input handler
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

      <Row
        style={{
          marginTop: "40px",
          marginBottom: "40px",
          width: "100%",
          padding: "23px",
          background: "white",
          display: "flex",
          justifyContent: "space-evenly",
          textAlign: "end",
          gap: "90px",
          alignItems: "center",
          fontWeight: "bolder",
          boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
        }}>
        <Col>
          <p>Kimdan</p>
        </Col>
        <div style={{ borderRight: "1px solid grey", height: "100%" }}></div>
        <Col>
          <p>Turi</p>
        </Col>
        <div style={{ borderRight: "1px solid grey", height: "100%" }}></div>
        <Col>
          <p>ACTION</p>
        </Col>
      </Row>
      <Row gutter={16}>
        {filteredData.map((item: DataType) => (
          <Col
            span={24}
            style={{ padding: "13px", marginTop: -14 }}
            key={item.id}>
            <Card
              className="card-col"
              style={{
                borderRadius: "8px",
                boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
                height: "80px",
              }}>
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
                  <p>{item.name}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.type}</p>
                </div>
                <div>
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
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Drawer title="Yangi qo'shish" onClose={onClose} open={open}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Kimdan"
            rules={[
              {
                required: true,
                message: "Iltimos, kimdanligini kiriting",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Turi"
            rules={[
              {
                required: true,
                message: "Iltimos, turini kiriting",
              },
            ]}
            className="mt-4">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-10">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ShikoyatFikrlar;
