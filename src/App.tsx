import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Filiallar from "./components/filiallar";
import Buyurtmalar from "./components/buyurtmalar";
import Maxsulotla from "./components/maxsulotla";
import Kategoriyalar from "./components/kategoriyalar";
import Layouts from "./components/layout/layout";

function App() {
  return (
    <>
      <Layouts />
    </>
  );
}

export default App;
