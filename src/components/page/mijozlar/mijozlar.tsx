import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Drawer, Form, Input, Row, Col, Card, Modal } from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "../../../App.css";

type FieldType = {
  mijozIsmi: string;
  telefonR: string;
  buyurtma: string;
  status: boolean;
};

interface DataType {
  id: number;
  mijozIsmi: string;
  telefonRaqam: string;
  buyurtmalarSoni: string;
  status: boolean;
}

const Mijozlar = () => {
  const [maxFood, setFoods] = useState<DataType[]>([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null);
  const [addForm] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onFinishAdd = (values: any) => {
    axios
      .post(`https://e2ead815ad4a2894.mokky.dev/mijozlar`, values)
      .then((res) => {
        setFoods([...maxFood, res.data]);
        addForm.resetFields();
        onClose();
      });
  };

  const onFinishFailedAdd = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const showModalEdit = (item: DataType) => {
    setSelectedItem(item);
    editForm.setFieldsValue(item);
    setIsModalOpenEdit(true);
  };

  const handleOkEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setSelectedItem(null);
  };

  const onFinishEdit = (values: any) => {
    if (selectedItem) {
      const url = `https://e2ead815ad4a2894.mokky.dev/mijozlar/${selectedItem.id}`;
      axios
        .put(url, values)
        .then((res) => {
          setFoods((prevFoods) =>
            prevFoods.map((item) =>
              item.id === selectedItem.id ? { ...item, ...values } : item
            )
          );
          handleOkEdit();
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi:", error.response || error);
          Modal.error({
            title: "Xatolik yuz berdi",
            content:
              "Ma'lumotlarni tahrirlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
          });
        });
    }
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://e2ead815ad4a2894.mokky.dev/mijozlar/${id}`)
      .then((res) => {
        setFoods(maxFood.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/mijozlar")
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
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
          className="flex items-center gap-5"
        >
          <Button
            onClick={showDrawer}
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
            Yangi mahsulot
            <br />
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

        <div
          style={{
            marginLeft: "30px",
            width: "44px",
            height: "44px",
            background: "#EDEFF3",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            className="bg-white"
            style={{
              width: "32px",
              height: "32px",
              boxShadow: "0px 2px 2px 0px #AEB0B550",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CiFilter
              style={{
                color: "#8D9BA8",
              }}
            />
          </Button>
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
            <p>MIJOZ ISMI</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>TELEFON RAQAM</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>BUYURTMALAR SONI</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>STATUS</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>AMALLAR</p>
          </div>
        </div>

        {maxFood.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card>
              <h3>{item.mijozIsmi}</h3>
              <p>{item.telefonRaqam}</p>
              <p>{item.buyurtmalarSoni}</p>
              <p>{item.status ? "Active" : "Inactive"}</p>
              <div className="flex gap-4">
                <Button onClick={() => showModalEdit(item)}>
                  <LuPen />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  style={{ color: "red" }}
                >
                  <FaRegTrashCan />
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title="Yangi mahsulot qo’shish"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Bekor qilish
            </Button>
            <Button onClick={() => addForm.submit()} type="primary">
              Saqlash
            </Button>
          </div>
        }
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mijozIsmi"
                label="Mijoz Ismi"
                rules={[{ required: true, message: "Mijoz ismini kiriting" }]}
              >
                <Input placeholder="Mijoz ismi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="telefonRaqam"
                label="Telefon Raqam"
                rules={[
                  {
                    required: true,
                    message: "Telefon raqamni kiriting",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="+998 (__) ___-__-__"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="buyurtmalarSoni"
                label="Buyurtmalar Soni"
                rules={[
                  {
                    required: true,
                    message: "Buyurtmalar sonini kiriting",
                  },
                ]}
              >
                <Input placeholder="Buyurtmalar soni" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Statusni tanlang",
                  },
                ]}
              >
                <Input placeholder="Status" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>

      <Modal
        title="Mijoz ma'lumotlarini tahrirlash"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Form form={editForm} layout="vertical" onFinish={onFinishEdit}>
          <Form.Item
            name="mijozIsmi"
            label="Mijoz Ismi"
            rules={[{ required: true, message: "Mijoz ismini kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefonRaqam"
            label="Telefon Raqam"
            rules={[{ required: true, message: "Telefon raqamni kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="buyurtmalarSoni"
            label="Buyurtmalar Soni"
            rules={[{ required: true, message: "Buyurtmalar sonini kiriting" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Statusni tanlang" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Mijozlar;
