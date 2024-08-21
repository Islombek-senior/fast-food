import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Filiallar from "./components/page/filiallar";
import Buyurtmalar from "./components/page/buyurtmalar";
import Maxsulotla from "./components/page/maxsusoltlar/maxsulotla";
import Kategoriyalar from "./components/page/kategoriyalar";
import Layouts from "./components/layout/layout";
import Logout from "./components/page/logout";

function App() {
  return (
    <>
      <Logout />
    </>
  );
}

export default App;
