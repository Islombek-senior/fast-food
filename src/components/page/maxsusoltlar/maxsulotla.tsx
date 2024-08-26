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
import { FaRegTrashCan } from "react-icons/fa6";
import "../../../App.css";

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
    editForm.submit(); // Formani yuboring
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
            <p>MAXSULOT</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>KATEGORIYA</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>NARXI</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>QO’SHIMCHA</p>
          </div>
          <div style={{ borderRight: "1px solid grey" }}></div>
          <div className="flex gap-10 items-center">
            <p>ACTION</p>
          </div>
        </div>
        <Col xs={24}>
          {maxFood.map((item) => (
            <Card key={item.id} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: `calc(100% / 5)`,
                  }}
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p>{item.maxsulot}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.kategoriya}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.narxi}</p>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>
                  <p>{item.qoshimcha}</p>
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
                  <img
                    src={item.img}
                    alt="Maxsulot"
                    className="rounded-full w-11 h-11"
                  />
                  {item.maxsulot}
                </div>
                <div style={{ width: `calc(100% / 5)` }}></div>
                <div style={{ width: `calc(100% / 5)` }}>{item.kategoriya}</div>
                <div style={{ width: `calc(100% / 5)` }}>{item.narxi}</div>
                <div style={{ width: `calc(100% / 5)` }}>{item.qoshimcha}</div>
                <div className="flex gap-4">
                  <Button onClick={() => showModalEdit(item)}>
                    <LuPen />
                  </Button>
                  <Button onClick={() => handleDelete(item.id)}>
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Col>
      </Row>

      <Drawer
        title="Maxsulot qo'shish"
        width={520}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          onFinish={onFinishAdd}
          onFinishFailed={onFinishFailedAdd}
          form={addForm}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="img"
                label="Maxsulot rasmi"
                rules={[{ required: true, message: "Please enter rasm" }]}
              >
                <Input placeholder="Please enter maxsulot rasmi" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxsulot"
                label="Maxsulot nomi"
                rules={[{ required: true, message: "Please enter maxsulot" }]}
              >
                <Input placeholder="Please enter maxsulot" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="kategoriya"
                label="Kategoriya"
                rules={[{ required: true, message: "Please enter kategoriya" }]}
              >
                <Input placeholder="Please enter kategoriya" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="narxi"
                label="Narxi"
                rules={[{ required: true, message: "Please enter narxi" }]}
              >
                <Input placeholder="Please enter narxi" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="qoshimcha"
                label="Qoshimcha"
                rules={[{ required: true, message: "Please enter qoshimcha" }]}
              >
                <Input placeholder="Please enter qoshimcha" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              style={{ backgroundColor: "#20D472", color: "white" }}
              htmlType="submit"
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        title="Maxsulotni tahrirlash"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
      >
        <Form
          form={editForm}
          onFinish={onFinishEdit}
          layout="vertical"
          initialValues={selectedItem || {}}
        >
          <Form.Item
            name="img"
            label="Rasm"
            rules={[{ required: true, message: "Please enter rasm" }]}
          >
            <Input placeholder="Please enter rasm" />
          </Form.Item>
          <Form.Item
            name="maxsulot"
            label="Maxsulot"
            rules={[{ required: true, message: "Please enter maxsulot" }]}
          >
            <Input placeholder="Please enter maxsulot" />
          </Form.Item>
          <Form.Item
            name="kategoriya"
            label="Kategoriya"
            rules={[{ required: true, message: "Please enter kategoriya" }]}
          >
            <Input placeholder="Please enter kategoriya" />
          </Form.Item>
          <Form.Item
            name="narxi"
            label="Narxi"
            rules={[{ required: true, message: "Please enter narxi" }]}
          >
            <Input placeholder="Please enter narxi" />
          </Form.Item>
          <Form.Item
            name="qoshimcha"
            label="Qoshimcha"
            rules={[{ required: true, message: "Please enter qoshimcha" }]}
          >
            <Input placeholder="Please enter qoshimcha" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kategoriyalar;
