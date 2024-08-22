import { Button, Input } from "antd";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import "../buyurtmalar/css.css"

function Buyurtmalar() {
  const [activeButton, setActiveButton] = useState('Yangi');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };
  return <div>

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

        <div
      className="flex items-center justify-between"
      style={{
        width: "591px",
        height: "48px",
        background: "#EDEFF3",
        borderRadius: "30px",
        padding: "5px",
        marginLeft: "50px",
      }}
    >
      <button
        className={activeButton === 'Yangi' ? 'activ' : 'inActiv'}
        onClick={() => handleButtonClick('Yangi')}
      >
        Yangi
      </button>
      <button
        className={activeButton === 'Qabul qilingan' ? 'activ' : 'inActiv'}
        onClick={() => handleButtonClick('Qabul qilingan')}
      >
        Qabul qilingan
      </button>
      <button
        className={activeButton === 'Jo’natilgan' ? 'activ' : 'inActiv'}
        onClick={() => handleButtonClick('Jo’natilgan')}
      >
        Jo’natilgan
      </button>
      <button
        className={activeButton === 'Yopilgan' ? 'activ' : 'inActiv'}
        onClick={() => handleButtonClick('Yopilgan')}
      >
        Yopilgan
      </button>
    </div>
      </div>
  </div>;
}

export default Buyurtmalar;
