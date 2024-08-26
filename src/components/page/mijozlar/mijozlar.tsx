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
  Select,
  Dropdown,
} from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import { FiSlash } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate } from "react-router-dom";
import "../../../App.css";

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
            }}
          />
        </div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button
            style={{
              borderRadius: "24px",
              border: "none",
              backgroundColor: "#EDEFF3",
              height: "44px",
              marginLeft: "20px",
            }}
          >
            <CiFilter
              style={{
                fontSize: "22px",
              }}
            />
            <span>Filtr</span>
            <DownOutlined style={{ fontSize: "16px", marginLeft: "10px" }} />
          </Button>
        </Dropdown>
      </div>

      <Drawer
        title="Yangi maxsulot qo’shish"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
          initialValues={{ qoshimcha: "" }}
        >
          <Form.Item
            name="maxsulot"
            label="Maxsulot"
            rules={[{ required: true, message: "Maxsulotni kiriting!" }]}
          >
            <Input placeholder="Maxsulot" />
          </Form.Item>
          <Form.Item
            name="kategoriya"
            label="Kategoriya"
            rules={[{ required: true, message: "Kategoriya tanlang!" }]}
          >
            <Select placeholder="Kategoriya" onChange={onChange}>
              <Select.Option value="option1">Option 1</Select.Option>
              <Select.Option value="option2">Option 2</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="narxi"
            label="Narxi"
            rules={[{ required: true, message: "Narxni kiriting!" }]}
          >
            <Input placeholder="Narxi" />
          </Form.Item>
          <Form.Item
            name="qoshimcha"
            label="Qo'shimcha"
            rules={[{ required: true, message: "Qo'shimchani kiriting!" }]}
          >
            <Input placeholder="Qo'shimcha" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Saqlash
              </Button>
              <Button onClick={onClose}>Bekor qilish</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title="Maxsulotni tahrirlash"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={[
          <Button key="back" onClick={handleCancelEdit}>
            Bekor qilish
          </Button>,
          <Button key="submit" type="primary" onClick={() => editForm.submit()}>
            Saqlash
          </Button>,
        ]}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={onFinishEdit}
          requiredMark={false}
        >
          <Form.Item
            name="mijozIsmi"
            label="Mijoz ismi"
            rules={[{ required: true, message: "Mijoz ismini kiriting!" }]}
          >
            <Input placeholder="Mijoz ismi" />
          </Form.Item>
          <Form.Item
            name="telefonRaqam"
            label="Telefon raqam"
            rules={[{ required: true, message: "Telefon raqamni kiriting!" }]}
          >
            <Input placeholder="Telefon raqam" />
          </Form.Item>
          <Form.Item
            name="buyurtmalarSoni"
            label="Buyurtmalar soni"
            rules={[
              { required: true, message: "Buyurtmalar sonini kiriting!" },
            ]}
          >
            <Input placeholder="Buyurtmalar soni" />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Checkbox>Status</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <div
        style={{
          border: "1px solid #EDEFF3",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div className="products">
          {maxFood.slice(0, visibleItems).map((item) => (
            <Card
              key={item.id}
              style={{
                marginBottom: "20px",
                borderRadius: "10px",
                border: "1px solid #EDEFF3",
              }}
            >
              <Row>
                <Col span={18}>
                  <h3>{item.mijozIsmi}</h3>
                  <p>{item.telefonRaqam}</p>
                  <p>Buyurtmalar soni: {item.buyurtmalarSoni}</p>
                  <p>Status: {item.status ? "Aktiv" : "Bloklangan"}</p>
                </Col>
                <Col span={6} style={{ textAlign: "right" }}>
                  <Button
                    onClick={() => showModalEdit(item)}
                    style={{ marginRight: "10px" }}
                    icon={<LuPen />}
                  />
                  <Button
                    onClick={() => handleDelete(item.id)}
                    icon={<FaRegTrashCan />}
                  />
                </Col>
              </Row>
            </Card>
          ))}
          {visibleItems < maxFood.length && (
            <Button
              style={{
                width: "100%",
                borderRadius: "24px",
                marginTop: "20px",
              }}
              onClick={() => setVisibleItems(visibleItems + 7)}
            >
              Ko'proq ko'rsatish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kategoriyalar;
