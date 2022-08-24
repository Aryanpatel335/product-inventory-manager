import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { InProgress } from "./components/InProgress/InProgress";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { AddProduct } from "./components/AddProduct/AddProduct";
import { ProductTable } from "./components/ProductTable/ProductTable";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/inventory" element={<ProductTable />} />
          <Route path="/home" element={<InProgress />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/" element={<LoginPage />} />

          {/* <Route exact path="/" element={<Navigate replace to={'/auth'}/>} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
