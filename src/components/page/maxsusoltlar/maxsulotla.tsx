import {
  Button,
  Form,
  FormProps,
  Input,
  Modal,
  Space,
  Table,
  TableProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter, CiPen } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import axios from "axios";
import "./cssmax.css";
import { Card, Col, Row } from "antd";

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
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null);
  const [addForm] = Form.useForm();
  const showModalAdd = () => {
    setIsModalOpenAdd(true);
  };

  const handleOkAdd = () => {
    setIsModalOpenAdd(false);
  };

  const handleCancelAdd = () => {
    setIsModalOpenAdd(false);
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

  const onFinishEdit: FormProps<FieldType>["onFinish"] = (values: any) => {
    if (selectedItem) {
      const url = `https://e2ead815ad4a2894.mokky.dev/maxsulotlar/${selectedItem.id}`;
      console.log("PUT so'rov manzili:", url);
      console.log("Tahrir qilinayotgan ma'lumotlar:", values);

      axios
        .put(url, values)
        .then((res) => {
          console.log("PUT so'rovi muvaffaqiyatli bo'ldi:", res.data);
          setFoods((prevFoods) =>
            prevFoods.map((item) =>
              item.id === selectedItem.id ? { ...item, ...values } : item
            )
          );

          handleOkEdit();
        })
        .catch((error) => {
          console.error("Xatolik yuz berdi:", error.response || error);
          // Xatolik xabarini foydalanuvchiga ko'rsatish
          Modal.error({
            title: "Xatolik yuz berdi",
            content:
              "Ma'lumotlarni tahrirlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
          });
        });
    }
  };

  const onFinishFailedEdit: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo: any
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishAdd: FormProps<FieldType>["onFinish"] = (values: any) => {
    axios
      .post(`https://e2ead815ad4a2894.mokky.dev/maxsulotlar`, values)
      .then((res) => {
        setFoods([...maxFood, res.data]);
        addForm.resetFields();
        handleOkAdd();
      });
  };

  const onFinishFailedAdd: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo: any
  ) => {
    console.log("Failed:", errorInfo);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Maxsulot",
      dataIndex: "maxsulot",
      key: "maxsulot",
    },
    {
      title: "Kategoriya",
      dataIndex: "kategoriya",
      key: "kategoriya",
    },
    {
      title: "Narxi",
      dataIndex: "narxi",
      key: "narxi",
    },
    {
      title: "Qo’shimcha",
      key: "qoshimcha",
      dataIndex: "qoshimcha",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space>
          <Button
            onClick={() => showModalEdit(record)}
            style={{ borderRadius: "50%", height: "45px" }}
          >
            <LuPen />
          </Button>
          <Button
            onClick={() => deletes(record.id)}
            style={{ borderRadius: "50%", height: "45px" }}
          >
            <FiTrash2 />
          </Button>
        </Space>
      ),
    },
  ];

  const deletes = (id: number) => {
    axios
      .delete(`https://e2ead815ad4a2894.mokky.dev/maxsulotlar/${id}`)
      .then((res) => {
        setFoods(maxFood.filter((f) => f.id !== id));
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

  const loadMore = () => {
    setVisibleItems((prev) => prev + 5);
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
            onClick={showModalAdd}
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

        {/* filter */}

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
            className=" bg-white"
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
                color: " #8D9BA8",
              }}
            />
          </button>
        </div>
      </div>

      {/* mahsulotlar content */}

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
          <p>KATEGORIYA</p>
          <p>NARXI</p>
          <p>QO’SHIMCHA</p>
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
                }}
              >
                <img src={f.img} alt="" className="w-10 h-10 rounded-full" />
                <p>{f.maxsulot}</p>
                <p>{f.kategoriya}</p>
                <p>{f.narxi}</p>
                <p>{f.qoshimcha}</p>
                <Space>
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
                    }}
                  >
                    <button
                      onClick={() => showModalEdit(f)}
                      className=" bg-white"
                      style={{
                        width: "42px",
                        height: "42px",
                        boxShadow: "0px 2px 2px 0px #AEB0B550",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LuPen
                        style={{
                          fontSize: "18px",
                        }}
                      />
                    </button>
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
                    }}
                  >
                    <button
                      onClick={() => deletes(f.id)}
                      className=" bg-white"
                      style={{
                        width: "42px",
                        height: "42px",
                        boxShadow: "0px 2px 2px 0px #AEB0B550",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FiTrash2
                        style={{
                          fontSize: "18px",
                        }}
                      />
                    </button>
                  </div>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Modal */}
      <Modal
        title="Yangi maxsulot qo’shish"
        open={isModalOpenAdd}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        footer={[
          <Button form="addForm" key="submit" htmlType="submit" type="primary">
            Saqlash
          </Button>,
        ]}
      >
        <Form
          name="addForm"
          form={addForm}
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
          // onReset={}
        >
          <Form.Item
            label="Rasm"
            name="rasm"
            rules={[{ required: true, message: "Iltimos, maxsulot kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Maxsulot"
            name="maxsulot"
            rules={[{ required: true, message: "Iltimos, maxsulot kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya"
            name="kategoriya"
            rules={[
              { required: true, message: "Iltimos, kategoriya kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Narxi"
            name="narxi"
            rules={[{ required: true, message: "Iltimos, narxi kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Qo’shimcha"
            name="qoshimcha"
            rules={[
              { required: true, message: "Iltimos, qo'shimcha kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Maxsulotni tahrirlash"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={[
          <Button form="editForm" key="submit" htmlType="submit" type="primary">
            Saqlash
          </Button>,
        ]}
      >
        <Form
          name="editForm"
          form={editForm}
          onFinish={onFinishEdit}
          onFinishFailed={onFinishFailedEdit}
        >
          <Form.Item
            label="Maxsulot"
            name="maxsulot"
            rules={[{ required: true, message: "Iltimos, maxsulot kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya"
            name="kategoriya"
            rules={[
              { required: true, message: "Iltimos, kategoriya kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Narxi"
            name="narxi"
            rules={[{ required: true, message: "Iltimos, narxi kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Qo’shimcha"
            name="qoshimcha"
            rules={[
              { required: true, message: "Iltimos, qo'shimcha kiriting!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kategoriyalar;
