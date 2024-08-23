import { Button, Input } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const Filiallar: React.FC = () => {
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
              paddingLeft: "2px",
            }}
            icon={<FiPlus style={{ fontSize: "30px" }} />}
          />
          <h2
            style={{
              fontWeight: "bold",
            }}
          >
            Yangi filial
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

      {/* Table */}
      <div className="bg-white p-4 flex justify-around items-center mt-6" style={{ width: "100%", boxShadow: "0px 3px 6px 0px #8D9BA85C", fontWeight: "bold" }}>
        <h3>Filial nomi (UZ)</h3>
        <h3>Filial nomi (Ru)</h3>
        <h3>Mo’ljal</h3>
        <h3>Ish vaqti</h3>
        <h3>ACTION</h3>
      </div>

      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          style={{
            width: "1266px",
            height: "46px",
            marginLeft: "40px",
            borderRadius: "10px",
            boxShadow: "0px 2px 2px 0px #AEB0B550",
            padding: "10px 0px 0px 10px",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          className="mt-5 bg-white w-full flex justify-around items-center hover:transform hover:translate-y-[-5px] hover:shadow-lg"
        >
          <h2>Shaxrishton</h2>
          <h2>Shaxrishton</h2>
          <h2>Metro ro’parasida</h2>
          <h2>09:00 - 20:00</h2>
          <div className="flex justify-center gap-4">
            <button>locate</button>
            <button>edit</button>
            <button>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filiallar;
