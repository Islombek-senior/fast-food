import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";


const Kategoriyalar = () => {

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
    Yangi mijoz
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

        <div style={{
          marginLeft: "30px",
          width: "44px",
          height: "44px",
          background:"#EDEFF3",
          borderRadius:"50%",
          cursor:"pointer",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}>
           <button className=" bg-white" style={{
            width: "32px",
            height: "32px",
            boxShadow: "0px 2px 2px 0px #AEB0B550",
            borderRadius:"50%",
            cursor:"pointer",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
           }}>
           <CiFilter style={{
            color:" #8D9BA8"
           }} />
           </button>
        </div>
        

      </div>

    
{/* mahsulotlar content */}

      <div style={{
        marginLeft:"20px",
        marginTop:"20px",
        borderRadius:"10px",
        width:"1300px",
        height:"auto",
        padding:"10px"
      }} className="tableContainer">
  {/* tabel shu yerga qoyiladi */}
  
      </div>
    </div>
  );
};

export default Kategoriyalar;