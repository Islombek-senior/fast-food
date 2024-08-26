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
import { FiSlash } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

import { Select } from "antd";
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

  const actveNonActive = () => {
    axios
      .get(`https://e2ead815ad4a2894.mokky.dev/mijozlar`)
      .then((res) => {
        setFoods(
          res.data.map((item: any) => ({ ...item, status: item.status }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
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
      .then(() => {
        setFoods(maxFood.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        Modal.error({
          title: "Xatolik yuz berdi",
          content:
            "Ma'lumotlarni o'chirishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
        });
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
      {/* ... Other code remains unchanged ... */}
      {maxFood.map((f) => (
        <Col span={24} style={{ padding: "13px", marginTop: -14 }} key={f.id}>
          <Card
            className="card-col"
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
                {/* Action buttons */}
                <Button
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  icon={
                    f.status == true ? (
                      <IoMdCheckmarkCircleOutline />
                    ) : (
                      <FiSlash />
                    )
                  }
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
                  onClick={() => showModalEdit(f)}
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
                  onClick={() => handleDelete(f.id)}
                />
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default Kategoriyalar;
