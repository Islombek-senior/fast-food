import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Drawer,
  Form,
  Input,
  Space,
  Row,
  Col,
  Card,
  Modal,
  Checkbox,
} from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import { FiSlash } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { Select } from "antd";
import { Dropdown } from "antd";
import "../../../App.css";
import { DownOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate } from "react-router-dom";

type FieldType = {
  maxsulot?: string;
  kategoriya?: string;
  narxi?: string;
  qoshimcha: string;
};

interface DataType {
  id: number;
  mijozIsmi: string;
  telefonRaqam: string;
  buyurtmalarSoni: number;
  status: boolean;
}

const Kategoriyalar = () => {
  const [maxFood, setFoods] = useState<DataType[]>([]);
  const [visibleItems, setVisibleItems] = useState(7);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null);
  const [addForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onCnge = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/mijozlar")
      .then((res) => {
        const sortedData = res.data.sort((a: DataType, b: DataType) =>
          isChecked
            ? a.mijozIsmi.localeCompare(b.mijozIsmi)
            : b.mijozIsmi.localeCompare(a.mijozIsmi)
        );
        setFoods(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log("Checked:", isChecked);
  };

  const items = [
    {
      key: "1",
      label: <Checkbox onChange={onCnge}>Nom bo’yicha (A-Z)</Checkbox>,
    },
    {
      key: "2",
      label: <Checkbox>Nom bo’yicha (Z-A)</Checkbox>,
    },
    {
      key: "3",
      label: <Checkbox>Buyurtmalar soni (O’sish tartibida)</Checkbox>,
    },
    {
      key: "4",
      label: <Checkbox>Buyurtmalar soni (Kamayish tartibida)</Checkbox>,
    },
    {
      key: "5",
      label: <Checkbox>Blocklangan mijozlar</Checkbox>,
    },
    {
      key: "6",
      label: <Checkbox>Aktiv mijozlar</Checkbox>,
    },
  ];

  const handleStatusChange = (id: number) => {
    const updatedFoods = maxFood.map((item) => {
      if (item.id === id) {
        const updatedStatus = !item.status;

        axios
          .put(`https://e2ead815ad4a2894.mokky.dev/mijozlar/${id}`, {
            ...item,
            status: updatedStatus,
          })
          .then((res) => {
            console.log("Status o'zgartirildi:", res.data);
          })
          .catch((error) => {
            console.error("Status o'zgartirishda xatolik yuz berdi:", error);
          });

        return { ...item, status: updatedStatus };
      }
      return item;
    });

    setFoods(updatedFoods);
  };

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
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
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
            }}>
            Yangi maxsulot
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
            width: "54px",
            height: "54px",
            background: "#EDEFF3",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
<<<<<<< HEAD
          }}>
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
            }}>
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
          }}>
          <div className="flex gap-10 items-center">
            <p>Mijoz ismi</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Telefon raqam</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Buyurtmalar soni</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Status</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>ACTION</p>
          </div>
        </div>
        {maxFood.map((f) => (
          <Col span={24} style={{ padding: "13px", marginTop: -14 }} key={f.id}>
            <Card
              className="card-col" // Apply hover effect class
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
                  <p>{f.mijozIsmi}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{f.telefonRaqam}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{f.buyurtmalarSoni}</p>
                </div>
                <div
                  style={{
                    width: `calc(100% / 5)`,
                    color: f.status == true ? "green" : "red",
                  }}>
                  <p>{f.status == true ? "Active" : "Block"}</p>
                </div>
                <div className="flex space-x-2 mt-2">
=======
          }}
        >
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Button
                  style={{
                    width: "42px",
                    height: "42px",
                    boxShadow: "0px 2px 2px 0px #AEB0B550",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    backgroundColor: "#EDEFF3",
                  }}
                  icon={<CiFilter style={{ fontSize: "30px" }} />}
                />
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>

      <div className="px-10 py-8" style={{ backgroundColor: "#f7f7f7" }}>
        <Row gutter={16}>
          {maxFood.map((item) => (
            <Col key={item.id} xs={24}>
              <Card
                style={{
                  borderRadius: "10px",
                  marginBottom: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex justify-between items-center">
                  <h3>{item.mijozIsmi}</h3>
                  <p>{item.telefonRaqam}</p>
                  <p>{item.buyurtmalarSoni} ta buyurtma</p>
>>>>>>> 6dadf95 (mijozlar)
                  <Button
                    type="link"
                    icon={
                      item.status ? (
                        <IoMdCheckmarkCircleOutline
                          style={{ color: "#20D472" }}
                        />
                      ) : (
                        <FiSlash style={{ color: "#FF4D4F" }} />
                      )
                    }
<<<<<<< HEAD
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
=======
                    onClick={() => handleStatusChange(item.id)}
                  >
                    {item.status ? "Aktiv" : "Block"}
                  </Button>
                  <Space>
                    <Button
                      type="text"
                      onClick={() => showModalEdit(item)}
                      icon={<LuPen />}
                    />
                    <Button
                      type="text"
                      danger
                      onClick={() => handleDelete(item.id)}
                      icon={<FaRegTrashCan />}
                    />
                  </Space>
>>>>>>> 6dadf95 (mijozlar)
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {visibleItems < maxFood.length && (
          <div className="text-center mt-8">
            <Button
              style={{
                borderRadius: "30px",
                backgroundColor: "#20D472",
                color: "white",
                paddingLeft: "40px",
                paddingRight: "40px",
              }}
              onClick={() => setVisibleItems((prev) => prev + 7)}
            >
              Ko'proq ko'rsatish
            </Button>
          </div>
        )}
      </div>

      <Drawer
        title="Yangi maxsulot qo’shish"
        width={720}
        onClose={onClose}
        open={open}
<<<<<<< HEAD
        width={380}>
=======
        bodyStyle={{ paddingBottom: 80 }}
      >
>>>>>>> 6dadf95 (mijozlar)
        <Form
          form={addForm}
          layout="vertical"
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
<<<<<<< HEAD
          autoComplete="off"
          layout="vertical">
          <Form.Item
            label="Rasm"
            name="rasm"
            rules={[{ required: true, message: "Maxsulot nomini kiriting!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Maxsulot nomi"
            name="maxsulot"
            rules={[{ required: true, message: "Maxsulot nomini kiriting!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Narxi"
            name="narxi"
            rules={[{ required: true, message: "Narxni kiriting!" }]}>
            <Input />
=======
        >
          <Form.Item
            name="mijozIsmi"
            label="Mijoz ismi"
            rules={[
              { required: true, message: "Mijoz ismi kiritilishi kerak" },
            ]}
          >
            <Input placeholder="Mijoz ismi" />
          </Form.Item>

          <Form.Item
            name="telefonRaqam"
            label="Telefon raqami"
            rules={[
              { required: true, message: "Telefon raqami kiritilishi kerak" },
            ]}
          >
            <Input placeholder="Telefon raqami" />
>>>>>>> 6dadf95 (mijozlar)
          </Form.Item>

          <Form.Item
            name="buyurtmalarSoni"
            label="Buyurtmalar soni"
            rules={[
              {
                required: true,
                message: "Buyurtmalar soni kiritilishi kerak",
              },
            ]}
          >
            <Input placeholder="Buyurtmalar soni" />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select placeholder="Statusni tanlang">
              <Select.Option value="true">Aktiv</Select.Option>
              <Select.Option value="false">Blocklangan</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title="Ma'lumotlarni tahrirlash"
        open={isModalOpenEdit}
        onOk={editForm.submit}
        onCancel={handleCancelEdit}>
        <Form
          form={editForm}
<<<<<<< HEAD
          name="editProduct"
          onFinish={onFinishEdit}
          autoComplete="off"
          layout="vertical">
          <Form.Item
            label="Maxsulot nomi"
            name="maxsulot"
            rules={[{ required: true, message: "Maxsulot nomini kiriting!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya"
            name="kategoriya"
            rules={[{ required: true, message: "Kategoriya kiriting!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Narxi"
            name="narxi"
            rules={[{ required: true, message: "Narxni kiriting!" }]}>
            <Input />
=======
          layout="vertical"
          onFinish={onFinishEdit}
          initialValues={selectedItem || {}}
        >
          <Form.Item
            name="mijozIsmi"
            label="Mijoz ismi"
            rules={[
              { required: true, message: "Mijoz ismi kiritilishi kerak" },
            ]}
          >
            <Input placeholder="Mijoz ismi" />
          </Form.Item>

          <Form.Item
            name="telefonRaqam"
            label="Telefon raqami"
            rules={[
              { required: true, message: "Telefon raqami kiritilishi kerak" },
            ]}
          >
            <Input placeholder="Telefon raqami" />
          </Form.Item>

          <Form.Item
            name="buyurtmalarSoni"
            label="Buyurtmalar soni"
            rules={[
              {
                required: true,
                message: "Buyurtmalar soni kiritilishi kerak",
              },
            ]}
          >
            <Input placeholder="Buyurtmalar soni" />
>>>>>>> 6dadf95 (mijozlar)
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select placeholder="Statusni tanlang">
              <Select.Option value="true">Aktiv</Select.Option>
              <Select.Option value="false">Blocklangan</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kategoriyalar;
