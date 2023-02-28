import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import SidebarComponent from "./component/SidebarComponent";
function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <SidebarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
