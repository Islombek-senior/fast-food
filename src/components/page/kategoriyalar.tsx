import React, { useEffect, useState } from "react";
import { Space, Table, Button, Modal, Form, Input } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

interface DataType {
  key: string;
  nameUz: string;
  nameRu: string;
  boshKategoriya: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "KATEGORIYA(UZ)",
    dataIndex: "nameUz",
    key: "nameUz",
    render: (text) => <a>{text}</a>,
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
    render: (_, record) => (
      <Space style={{ fontSize: 23 }}>
        <a>
          <MdOutlineEdit />
        </a>
        <a style={{ color: "red" }}>
          <MdOutlineDelete />
        </a>
      </Space>
    ),
  },
];

const Kategoriyalar = () => {
  const [fasFood, setFasFood] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    categories();
  }, []);

  const categories = () => {
    axios
      .get("https://392e0f5b09d05ee3.mokky.dev/fas-food")
      .then((res: any) => {
        setFasFood(res.data);
      });
  };

  const category = (value: any) => {
    axios
      .post("https://392e0f5b09d05ee3.mokky.dev/fas-food", value)
      .then(() => {
        form.resetFields();
        setIsModalOpen(false);
        categories();
      });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Kategoriya Qo'shish
      </Button>

      <Table columns={columns} dataSource={fasFood} style={{ marginTop: 20 }} />

      <Modal
        title="Kategoriya Qo'shish"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}>
        <Form form={form} onFinish={category}>
          <Form.Item
            label="Kategoriya(Uz)"
            name="nameUz"
            rules={[
              { required: true, message: "Iltimos, kategoriyani kiriting!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya(Ru)"
            name="nameRu"
            rules={[
              { required: true, message: "Iltimos, kategoriyani kiriting!" },
            ]}>
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Bosh Kategoriya"
            name="boshKategoriya"
            rules={[
              {
                required: true,
                message: "Iltimos, bosh kategoriyani kiriting!",
              },
            ]}>
            <Input />
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kategoriyalar;