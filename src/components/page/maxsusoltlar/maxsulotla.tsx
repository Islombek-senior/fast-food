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
} from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import "./cssmax.css";
import { Select } from "antd";

type FieldType = {
  maxsulot?: string;
  kategoriya?: string;
  narxi?: string;
  qoshimcha: string;
};

interface DataType {
  id: number;
  img: string;
  maxsulot: string;
  kategoriya: string;
  narxi: string;
  qoshimcha: string;
}

const Kategoriyalar = () => {
  const [maxFood, setFoods] = useState<DataType[]>([]);
  const [visibleItems, setVisibleItems] = useState(7);
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
      .post(`https://e2ead815ad4a2894.mokky.dev/maxsulotlar`, values)
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
      const url = `https://e2ead815ad4a2894.mokky.dev/maxsulotlar/${selectedItem.id}`;

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
      .delete(`https://e2ead815ad4a2894.mokky.dev/maxsulotlar/${id}`)
      .then((res) => {
        setFoods(maxFood.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/maxsulotlar")
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
          <button
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
          </button>
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
            justifyContent: "space-around",
            textAlign: "left",
            gap: 30,
            alignContent: "center",
            fontWeight: "bolder",
            boxShadow: "5px 5px 5px rgba(124, 124, 124, 0.3)",
          }}
        >
          <p>MAXSULOT</p>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <p>KATEGORIYA</p>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <p>NARXI</p>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <p>QO’SHIMCHA</p>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <p>ACTION</p>
        </div>
        {maxFood.map((f) => (
          <Col span={24} style={{ padding: "13px", marginTop: -14 }} key={f.id}>
            <Card
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
                <div>
                  <img src={f.img} alt="" className="w-10 h-10 rounded-full" />
                  <p>{f.maxsulot}</p>
                </div>
                <div className="flex justify-between text-start">
                  <p>{f.kategoriya}</p>
                  <p>{f.narxi}</p>
                  <p>{f.qoshimcha}</p>
                </div>

                {/* <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "8px", verticalAlign: "middle" }}>
                        <img
                          src={f.img}
                          alt=""
                          className="w-10 h-10 rounded-full"
                          style={{ display: "block", margin: "0 auto" }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        <p>{f.maxsulot}</p>
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        <p>{f.kategoriya}</p>
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        <p>{f.narxi}</p>
                      </td>
                      <td
                        style={{
                          padding: "8px",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        <p>{f.qoshimcha}</p>
                      </td>
                    </tr>
                  </tbody>
                </table> */}

                <div className="flex space-x-2 mt-2">
                  <button
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      boxShadow: "0px 2px 2px 0px #AEB0B550",
                    }}
                    className="bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    onClick={() => showModalEdit(f)}
                  >
                    <LuPen size={18} />
                  </button>
                  <button
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      boxShadow: "0px 2px 2px 0px #AEB0B550",
                    }}
                    className="bg-white flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    onClick={() => handleDelete(f.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title="Yangi mahsulot qo'shish"
        placement="right"
        onClose={onClose}
        open={open}
        width={380}
      >
        <Form
          form={addForm}
          name="addProduct"
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Rasm"
            name="rasm"
            rules={[{ required: true, message: "Maxsulot nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Maxsulot nomi"
            name="maxsulot"
            rules={[{ required: true, message: "Maxsulot nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "10px",
              gap: "5px",
            }}
          >
            <p style={{ color: "red" }}>*</p> Kategoriya
          </p>
          <Select
            onChange={onChange}
            style={{ width: "100%", marginBottom: "20px" }}
            defaultValue="Burger"
          >
            {maxFood.map((t) => (
              <Select.Option>{t.kategoriya}</Select.Option>
            ))}
          </Select>

          <Form.Item
            label="Narxi"
            name="narxi"
            rules={[{ required: true, message: "Narxni kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Qo'shimcha" name="qoshimcha">
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Qo'shish
              </Button>
              <Button onClick={onClose}>Bekor qilish</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title="Maxsulotni tahrirlash"
        open={isModalOpenEdit}
        onOk={editForm.submit}
        onCancel={handleCancelEdit}
      >
        <Form
          form={editForm}
          name="editProduct"
          onFinish={onFinishEdit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Maxsulot nomi"
            name="maxsulot"
            rules={[{ required: true, message: "Maxsulot nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya"
            name="kategoriya"
            rules={[{ required: true, message: "Kategoriya kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Narxi"
            name="narxi"
            rules={[{ required: true, message: "Narxni kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Qo'shimcha" name="qoshimcha">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kategoriyalar;
