import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Drawer,
  Typography,
  Form,
  message,
  Space,
  Table,
  Modal,
  Card,
  Row,
  Col,
} from "antd";
import axios from "axios";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuPen } from "react-icons/lu";

const { Title } = Typography;
const { confirm } = Modal;

interface DataType {
  id: number;
  nameUz: string;
  nameRu: string;
  boshKategoriya: string;
}

const Kategoriyalar = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<DataType | null>(null);

  const showDrawer = (r?: DataType) => {
    setEditingCategory(r || null);
    form.setFieldsValue(r || { nameUz: "", nameRu: "", boshKategoriya: "" });
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
    form.resetFields();
    setEditingCategory(null);
  };

  const onFinish = (values: DataType) => {
    if (editingCategory) {
      editCategory(values);
    } else {
      addCategory(values);
    }
  };

  const addCategory = (values: DataType) => {
    axios
      .post("https://392e0f5b09d05ee3.mokky.dev/fas-food", values)
      .then((res) => {
        const newCategory = { ...res.data, id: res.data._id };
        setData((prevData) => [...prevData, newCategory]);
        closeDrawer();
        message.success("Added successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to add category");
      });
  };

  const editCategory = (values: DataType) => {
    if (!editingCategory) return;

    axios
      .put(
        `https://392e0f5b09d05ee3.mokky.dev/fas-food/${editingCategory.id}`,
        values
      )
      .then((res) => {
        const updatedCategory = { ...res.data, id: res.data._id };
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editingCategory.id ? updatedCategory : item
          )
        );
        closeDrawer();
        message.success("Category updated successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update category");
      });
  };

  const handleDelete = (id: number) => {
    console.log(`Attempting to delete category with ID: ${id}`);
    confirm({
      title: "Rostdan ham o'chirmoqchimisiz?",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        axios
          .delete(`https://392e0f5b09d05ee3.mokky.dev/fas-food/${id}`)
          .then(() => {
            console.log("Delete successful");
            setData((prevData) => {
              const updatedData = prevData.filter((item) => item.id !== id);
              return updatedData;
            });
            message.success("Muvaffaqiyatli o'chirildi");
          })
          .catch((error) => {
            console.error("Delete failed", error);
            message.error("Kategoriya o'chirilishi muvaffaqiyatsiz bo'ldi");
          });
      },
      onCancel() {
        message.info("O'chirish amalini bekor qildingiz");
      },
    });
  };

  useEffect(() => {
    axios
      .get("https://392e0f5b09d05ee3.mokky.dev/fas-food")
      .then((res) => {
        const fetchedData = res.data.map((item: any) => ({
          ...item,
          id: item._id, // Ensure this matches with the `id` field in the DataType
        }));
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch categories");
      });
  }, []);

  const columns = [
    {
      title: "KATEGORIYA(UZ)",
      dataIndex: "nameUz",
      key: "nameUz",
    },
    {
      title: "KATEGORIYA(RU)",
      dataIndex: "nameRu",
      key: "nameRu",
    },
    {
      title: "BOSH KATEGORIYA",
      dataIndex: "boshKategoriya",
      key: "boshKategoriya",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space style={{ fontSize: 23 }}>
          <Button
            style={{
              borderRadius: "50%",
              border: "3px solid gray",
              width: "40px",
              height: "40px",
            }}
            icon={<LuPen style={{ fontSize: "20px" }} />}
            onClick={() => showDrawer(record)}
          />
          <Button
            style={{
              borderRadius: "50%",
              border: "3px solid gray",
              color: "red",
              width: "40px",
              height: "40px",
            }}
            icon={<FiTrash2 style={{ fontSize: "20px" }} />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

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
            onClick={() => showDrawer()}
          />
          <h2
            style={{
              fontWeight: "bold",
            }}>
            Yangi kategoriya
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
      </div>

      <div
        style={{
          marginLeft: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          width: "1300px",
          height: "auto",
          padding: "10px",
        }}
        className="tableContainer">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <Drawer
        title={
          editingCategory
            ? "Kategoriyani tahrirlash"
            : "Yangi kategoriya qo'shish"
        }
        placement="right"
        onClose={closeDrawer}
        open={drawer}
        width={360}>
        <Form form={form} onFinish={onFinish}>
          <Title style={{ color: "gray" }} level={5}>
            Kategoriya nomi uz
          </Title>
          <Form.Item
            name="nameUz"
            rules={[
              { required: true, message: "Kategoriya nomi uzni kiriting" },
            ]}>
            <Input />
          </Form.Item>

          <Title style={{ color: "gray" }} level={5} className="mt-4">
            Kategoriya nomi ru
          </Title>
          <Form.Item
            name="nameRu"
            rules={[
              { required: true, message: "Kategoriya nomi runi kiriting" },
            ]}>
            <Input />
          </Form.Item>

          <Title style={{ color: "gray" }} level={5} className="mt-4">
            Bosh Kategoriya
          </Title>
          <Form.Item
            name="boshKategoriya"
            rules={[{ required: true, message: "Bosh Kategoriyani kiriting" }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              className="bg-green-400 text-white">
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Kategoriyalar;
