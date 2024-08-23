import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Drawer,
  Typography,
  Form,
  message,
  Space,
  Card,
  Col,
  Row,
  Modal,
} from "antd";
import axios from "axios";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { LuPen } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

const { Title } = Typography;
const { confirm } = Modal;

interface DataType {
  id: number;
  nameUz: string;
  nameRu: string;
  category: string;
}

const Kategoriyalar = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<DataType | null>(null);

  const showDrawer = (r?: DataType) => {
    setEditingCategory(r || null);
    form.setFieldsValue(r || { nameUz: "", nameRu: "", category: "" });
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
    confirm({
      title: "Rostdan ham o'chirmoqchimisiz?",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",
      onOk() {
        axios
          .delete(`https://392e0f5b09d05ee3.mokky.dev/fas-food/${id}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item.id !== id));
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
          id: item._id,
        }));
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to fetch categories");
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
            <p>Kategoriya (UZ)</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Kategoriya (Ru)</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>Bosh kategoriya</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>ACTION</p>
          </div>
        </div>
        {data.map((item) => (
          <Col
            span={24}
            style={{ padding: "13px", marginTop: -14 }}
            key={item.id}>
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
                  <p>{item.nameUz}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.nameRu}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.category}</p>
                </div>
                <div
                  className="flex space-x-2 mt-2"
                  style={{ width: `calc(100% / 5)` }}>
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
            name="category"
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
