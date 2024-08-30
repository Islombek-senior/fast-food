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
import { LuPen } from "react-icons/lu";

const { Title } = Typography;
const { confirm } = Modal;

interface DataType {
  id: number;
  branch: string;
  price: string;
  minimumPrice: string;
}

const YetkazishNarxi = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");

  const showDrawer = () => {
    form.resetFields();
    setCurrentItem(null);
    setIsEditing(false);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values: {
    branch: string;
    price: string;
    minimumPrice: string;
  }) => {
    if (isEditing && currentItem) {
      axios
        .put(
          `https://392e0f5b09d05ee3.mokky.dev/userss/${currentItem.id}`,
          values
        )
        .then((res) => {
          setData(
            data.map((item) => (item.id === currentItem.id ? res.data : item))
          );
          message.success("Maʼlumot muvaffaqiyatli yangilandi!");
        })
        .catch((error) => {
          console.log(error);
          message.error("Maʼlumotlarni yangilashda xatolik yuz berdi");
        });
    } else {
      axios
        .post("https://392e0f5b09d05ee3.mokky.dev/userss", values)
        .then((res) => {
          setData([...data, res.data]);
          message.success("Maʼlumot muvaffaqiyatli qoʻshildi!");
        })
        .catch((error) => {
          console.log(error);
          message.error("Maʼlumotlarni qoʻshishda xatolik yuz berdi");
        });
    }
    setOpen(false);
  };

  const handleEdit = (item: DataType) => {
    setCurrentItem(item);
    form.setFieldsValue(item);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    confirm({
      title: "Haqiqatan ham o'chirmoqchimisiz?",
      content: "O'chirilgan ma'lumotni qaytarib bo'lmaydi.",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        axios
          .delete(`https://392e0f5b09d05ee3.mokky.dev/userss/${id}`)
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter(
      (item) =>
        item.branch.toLowerCase().includes(query) ||
        item.price.toLowerCase().includes(query) ||
        item.minimumPrice.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    axios
      .get("https://392e0f5b09d05ee3.mokky.dev/userss")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            value={searchQuery}
            onChange={handleSearch}
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
          <p>Filial</p>
        </Col>
        <div style={{ borderRight: "1px solid grey", height: "100%" }}></div>
        <Col>
          <p>Narxi</p>
        </Col>
        <div style={{ borderRight: "1px solid grey", height: "100%" }}></div>
        <Col>
          <p>Minimal narx</p>
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
                  <p>{item.branch}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.price}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.minimumPrice}</p>
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
                    onClick={() => handleEdit(item)}
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
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Drawer
        title={isEditing ? "Ma'lumotni tahrirlash" : "Yangi qo'shish"}
        onClose={onClose}
        open={open}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="branch"
            label="Filial"
            rules={[
              {
                required: true,
                message: "Iltimos, filialni kiriting",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Narxi"
            rules={[
              {
                required: true,
                message: "Iltimos, narxini kiriting",
              },
            ]}
            className="mt-4">
            <Input />
          </Form.Item>
          <Form.Item
            name="minimumPrice"
            label="MinimalNarxi"
            rules={[
              {
                required: true,
                message: "Iltimos, minimal narxni kiriting",
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

export default YetkazishNarxi;
