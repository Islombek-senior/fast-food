import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Filiallar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  

  const handleSubmit = (values: any) => {
    console.log(values);
    setIsModalOpen(false);
  };

  return (
    <div>
     <div className=" bg-white" >
     <div style={{
      borderRight: "1px solid grey",
      borderLeft: "1px solid grey",
      padding: "20px",
      paddingLeft: "50px",
      width:"270px",
      
     }}  className=" flex items-center gap-5" >
      <button onClick={() => setIsModalOpen(true)}  style={{
        borderRadius:"50%",
        backgroundColor:"#20D472",
        color:"white",
        width:"40px",
        height:"40px",
        paddingLeft:"6px",
      }}>
      <FiPlus style={{
        cursor: "pointer",
        fontSize:"30px",

      }} />
      </button>
      <h2 style={{
        fontWeight:"bold"
      }} className="">Yangi filial
         <br />
      qo’shish</h2>
      </div>
     </div>

      <Modal
        title="Kategoriya Qo'shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Kategoriya(Uz)"
            name="nameUz"
            rules={[{ required: true, message: "Iltimos, kategoriyani kiriting!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kategoriya(Ru)"
            name="nameRu"
            rules={[{ required: true, message: "Iltimos, kategoriyani kiriting!" }]}
          >
            <Input />
          </Form.Item>

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

export default Filiallar;
