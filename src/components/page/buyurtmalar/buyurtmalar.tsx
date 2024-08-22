import { Button, Input } from "antd";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

function Buyurtmalar() {
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

     <div style={{
      width: "591px",
      height: "48px",
      opacity: "0.3px",
      background:" #EDEFF3",
      borderRadius:"30px",
      padding:"5px",
      marginLeft:"50px"

      
     }}>
 <button></button>
     </div>
      </div>
  </div>;
}

export default Buyurtmalar;
