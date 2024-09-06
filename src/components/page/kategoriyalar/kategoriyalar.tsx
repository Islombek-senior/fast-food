import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Drawer,
  Typography,
  Form,
  message,
  Col,
  Row,
  Card,
  Modal,
} from "antd";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
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
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<DataType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<DataType | null>(null);

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
        const newCategory = { ...res.data };
        setData((prevData) => [...prevData, newCategory]);
        setFilteredData((prevData) => [...prevData, newCategory]);
        closeDrawer();
        message.success("Added successfully");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to add category");
      });
  };

  const editCategory = (values: DataType) => {
    if (editingCategory) {
      const url = `https://392e0f5b09d05ee3.mokky.dev/fas-food/${editingCategory.id}`;
      axios
        .patch(url, values)
        .then((res) => {
          const updatedCategory = { ...editingCategory, ...values };
          setData((prevData) =>
            prevData.map((item) =>
              item.id === editingCategory.id ? updatedCategory : item
            )
          );
          setFilteredData((prevData) =>
            prevData.map((item) =>
              item.id === editingCategory.id ? updatedCategory : item
            )
          );
          closeDrawer();
          message.success("Successfully updated");
        })
        .catch((err) => {
          console.error(err);
          message.error("Failed to update category");
        });
    }
  };

  const handleDelete = (id: number) => {
    confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .delete(`https://392e0f5b09d05ee3.mokky.dev/fas-food/${id}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            setFilteredData((prevData) =>
              prevData.filter((item) => item.id !== id)
            );
            message.success("Category deleted successfully");
          })
          .catch((error) => {
            console.error(error);
            message.error("Failed to delete category");
          });
      },
    });
  };

  useEffect(() => {
    axios
      .get("https://392e0f5b09d05ee3.mokky.dev/fas-food")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to fetch categories");
      });
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.nameUz.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

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
            }}
          >
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          }}
        >
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
        {filteredData.map((item) => (
          <Col
            span={24}
            style={{ padding: "13px", marginTop: -14 }}
            key={item.id}
          >
            <Card
              className="card-col"
              style={{
                borderRadius: "8px",
                boxShadow: "1px 1px 10px rgba(124, 124, 124, 0.3)",
                height: "80px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  textAlign: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    alignItems: "center",
                    width: `calc(100% / 5)`,
                  }}
                >
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
                  style={{ width: `calc(100% / 5)` }}
                >
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
                    onClick={() => showDrawer(item)}
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
        title={
          editingCategory
            ? "Kategoriyani tahrirlash"
            : "Yangi kategoriya qo'shish"
        }
        placement="right"
        onClose={closeDrawer}
        open={drawer}
        width={400}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="nameUz"
            label="Kategoriya nomi (UZ)"
            rules={[
              {
                required: true,
                message: "Iltimos, kategoriya nomini kiriting",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nameRu"
            label="Kategoriya nomi (RU)"
            rules={[
              {
                required: true,
                message: "Iltimos, kategoriya nomini kiriting",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Bosh kategoriya"
            rules={[
              { required: true, message: "Iltimos, bosh kategoriyani tanlang" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? "Yangilash" : "Qo'shish"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Kategoriyalar;
