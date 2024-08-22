import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Filiallar from "../page/filiallar";
import Maxsulotla from "../page/maxsusoltlar/maxsulotla";
import Buyurtmalar from "../page/buyurtmalar";
import Kategoriyalar from "../page/kategoriyalar";
import img_1 from "../../components/imgs/Bitmap.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaBoxArchive } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import "./cssLay.css";

const { Header, Content, Footer, Sider } = Layout;

const layoutStyle: React.CSSProperties = {
  height: "100vh",
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
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 560,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/buyurtmalar" element={<Buyurtmalar />} />
                <Route path="/filiallar" element={<Filiallar />} />
                <Route path="/maxsulotlar" element={<Maxsulotla />} />
                <Route path="/kategoriyalar" element={<Kategoriyalar />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default Lyout;
