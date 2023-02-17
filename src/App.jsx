import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Database from "tauri-plugin-sql-api";
import Home from "./pages/Home";
import "./index.css";
import SidebarComponent from "./component/SidebarComponent";
function App() {
  // async function greet() {
  //   const db = await Database.load("sqlite:haiya.db");
  //   await db.execute(`CREATE TABLE IF NOT EXISTS users (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT NOT NULL,
  //     email TEXT NOT NULL
  //   )`);
  // }

  return (
    <BrowserRouter>
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <SidebarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
