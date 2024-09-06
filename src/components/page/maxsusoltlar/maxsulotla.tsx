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
  Dropdown,
  Checkbox,
} from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { LuPen } from "react-icons/lu";
import "./cssmax.css";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

type FieldType = {
  name?: string;
  category?: string;
  price?: string;
};

interface DataType {
  id: number;
  img: string;
  name: string;
  category: string;
  filters: number;
  price: number;
  qoshimcha: string;
}

const Kategoriyalar = () => {
  const [maxFood, setFoods] = useState<DataType[]>([]);
  const [visibleItems, setVisibleItems] = useState(7);
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editForm] = Form.useForm();
  const [selectedItem, setSelectedItem] = useState<DataType | null>(null);
  const [addForm] = Form.useForm();
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = queryString.parse(location.search, {
    parseNumbers: true,
    parseBooleans: true,
  });
  console.log({ ...params });

  const nUp = () => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/maxsulotlar")
      .then((res) => {
        const sorted = res.data.sort((a: DataType, b: DataType) =>
          a.name.localeCompare(b.name)
        );
        setFoods(sorted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const nDown = () => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/maxsulotlar")
      .then((res) => {
        const sorted = res.data.sort((a: DataType, b: DataType) =>
          b.name.localeCompare(a.name)
        );
        setFoods(sorted);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const bUp = () => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/maxsulotlar")
      .then((response) => {
        const sorted = response.data.sort(
          (a: any, b: any) => a.narxi - b.narxi
        );
        setFoods(sorted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const downN = () => {
    axios
      .get("https://e2ead815ad4a2894.mokky.dev/maxsulotlar")
      .then((res) => {
        const sorted = res.data.sort((a: any, b: any) => b.narxi - a.narxi);
        setFoods(sorted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const items = [
    {
      key: "1",
      label: <Checkbox onChange={nUp}>Nom bo’yicha (A-Z)</Checkbox>,
    },
    {
      key: "2",
      label: <Checkbox onChange={nDown}>Nom bo’yicha (Z-A)</Checkbox>,
    },
    {
      key: "3",
      label: <Checkbox onChange={bUp}>Narx soni (O’sish tartibida)</Checkbox>,
    },
    {
      key: "4",
      label: (
        <Checkbox onChange={downN}>Narx soni (Kamayish tartibida)</Checkbox>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    axios
      .delete(`https://e2ead815ad4a2894.mokky.dev/maxsulotlar/${id}`)
      .then(() => {
        setFoods(maxFood.filter((f) => f.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClose = () => {
    navigate("?" + queryString.stringify({ add: false }));
    // setOpen(false);
  };

  const showDrawer = () => {
    navigate("?" + queryString.stringify({ add: true }));
    // setOpen(true);
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
    editForm
      .validateFields()
      .then(() => {
        editForm.submit(); // Formani yuboring
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
    setSelectedItem(null);
  };

  const onFinishEdit = (values: any) => {
    if (selectedItem) {
      const url = `https://e2ead815ad4a2894.mokky.dev/maxsulotlar/${selectedItem.id}`;

      axios
        .patch(url, values)
        .then((res) => {
          setFoods((prevFoods) =>
            prevFoods.map((item) =>
              item.id === selectedItem.id ? { ...item, ...values } : item
            )
          );
          setIsModalOpenEdit(false); // Modalni yopish
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

  const searchIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .get(
        `https://e2ead815ad4a2894.mokky.dev/maxsulotlar?maxsulot=*${e.target.value}`
      )
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
            Yangi maxsulotlar
            <br />
            qo’shish
          </h2>
        </div>

        <div className="search ml-20 relative">
          <Input
            onChange={searchIn}
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
            // onChange={onChangeSearch}
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
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#ffffff",
              boxShadow: "4px 14px 18px rgba(114, 113, 113, 0.2)",
              height: "54px",
              width: "54px",
              marginLeft: "20px",
            }}
          >
            <CiFilter
              style={{
                fontSize: "22px",
              }}
            />
          </Button>
        </Dropdown>
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
                  justifyContent: "flex-start",
                  gap: 20,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{ width: `calc(100% / 5)` }}
                  className="flex justify-start gap-4 align-middle"
                >
                  <img
                    src={item.img}
                    alt="Maxsulot"
                    className="rounded-full w-11 h-11"
                  />
                  <div>
                    <p>{item.name}</p>
                  </div>
                </div>
                <div style={{ width: `calc(100% / 5)` }}>{item.category}</div>
                <div style={{ width: `calc(100% / 5)` }}>
                  {item.price.toLocaleString("en-US")} UZS
                </div>
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
        open={params.add as boolean}
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
            name="name"
            label="Maxsulot"
            rules={[{ required: true, message: "Please enter maxsulot" }]}
          >
            <Input placeholder="Please enter maxsulot" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategoriya"
            rules={[{ required: true, message: "Please enter kategoriya" }]}
          >
            <Input placeholder="Please enter kategoriya" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Narxi"
            rules={[{ required: true, message: "Please enter narxi" }]}
          >
            <Input placeholder="Please enter narxi" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kategoriyalar;
