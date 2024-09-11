import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Filiallar from "../page/filiallar/filiallar";
import Maxsulotla from "../page/maxsusoltlar/maxsulotla";
import Buyurtmalar from "../page/bars/bars";
import Kategoriyalar from "../page/kategoriyalar/kategoriyalar";
import img_1 from "../../components/imgs/Bitmap.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaBookMedical, FaBoxArchive } from "react-icons/fa6";
import { LuMapPin, LuLayers } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa";
import Mijozlar from "../page/mijozlar/mijozlar";
import Xisobot from "../page/Xisobot/xisobot";
import ShikoyatFikrlar from "../page/shikoyatFikrlar/shikoyatFikrlar";
import YetkazishNarxi from "../page/yetkazishNarxi/yetkazishNarxi";
import Map from "../page/map";
import "./cssLay.css";
import Buyurtmalar2 from "../page/buyurtmalar/buyurtmalar";

const { Header, Content, Footer, Sider } = Layout;

const layoutStyle: React.CSSProperties = {
  height: "100vh",
  width: "100%",
};

const sider: React.CSSProperties = {
  background: "white",
};

const items = [
  {
    key: "1",
    icon: <IoMdCheckmarkCircleOutline />,
    label: <NavLink to="/buyurtmalar">Buyurtmalar</NavLink>,
  },
  {
    key: "2",
    icon: <FaBoxArchive />,
    label: <NavLink to="/maxsulotlar">Maxsulotlar</NavLink>,
  },
  {
    key: "3",
    icon: <LuLayers />,
    label: <NavLink to="/kategoriyalar">Kategoriyalar</NavLink>,
  },
  {
    key: "4",
    icon: <LuMapPin />,
    label: (
      <NavLink
        to="/filiallar"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Filiallar
      </NavLink>
    ),
  },
  {
    key: "5",
    icon: <FaMapMarkerAlt />,
    label: <NavLink to="/Map">Map</NavLink>,
  },
  {
    key: "6",
    icon: <FiUsers />,
    label: <NavLink to="/Mijozlar">Mijozlar</NavLink>,
  },
  {
    key: "7",
    icon: <FiUsers />,
    label: <NavLink to="/Xisobot">Xisobot</NavLink>,
  },
  {
    key: "8",
    icon: <FaBookMedical />,
    label: <NavLink to="/ShikoyatFikrlar">Shikoyat va Fikrlar</NavLink>,
  },
  {
    key: "9",
    icon: <FaLocationArrow />,
    label: <NavLink to="/YetkazishNarxi">Yetkazish narxi</NavLink>,
  },
];

const Lyout: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={layoutStyle}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          style={sider}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              alignItems: "center",
              marginBottom: "30px",
              paddingTop: 15,
            }}
          >
            <div>
              <img
                src={img_1}
                alt=""
                style={{ width: 50, objectFit: "cover", borderRadius: "50%" }}
              />
            </div>
            <div style={{ marginTop: "-16px" }}>
              <p style={{ fontSize: "19px", fontWeight: "bold" }}>Fast Food</p>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: "light",
                }}
              >
                Online maxsulot sotuvi
              </p>
            </div>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={items}
          />
        </Sider>
        <Layout style={{ height: "100%" }}>
          <Content style={{ height: "100%" }}>
            <div
              style={{
                height: "100%",
                overflow: "auto",
              }}
            >
              <Routes>
                <Route path="/buyurtmalar" element={<Buyurtmalar />} />
                <Route path="/filiallar" element={<Filiallar />} />
                <Route path="/Mijozlar" element={<Mijozlar />} />
                <Route path="/Xisobot" element={<Xisobot />} />
                <Route path="/maxsulotlar" element={<Maxsulotla />} />
                <Route path="/kategoriyalar" element={<Kategoriyalar />} />
                <Route path="/Map" element={<Map />} />
                <Route path="/ShikoyatFikrlar" element={<ShikoyatFikrlar />} />
                <Route path="/YetkazishNarxi" element={<YetkazishNarxi />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Lyout;
