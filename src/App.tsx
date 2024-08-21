import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Filiallar from "./components/page/filiallar";
import Buyurtmalar from "./components/page/buyurtmalar";
import Maxsulotla from "./components/page/maxsulotla";
import Kategoriyalar from "./components/page/kategoriyalar";
import Layouts from "./components/layout/layout";

function App() {
  return (
    <>
      <Layouts />
      {/* salom islom ko't */}
    </>
  );
}

export default App;
