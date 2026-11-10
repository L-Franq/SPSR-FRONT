import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cadastro from "./Cadastro"
import Login from "./Login"
import DashboardUser from "./DashUser"
import "tailwindcss"

export default function App() {
  return(
    <Routes>
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<DashboardUser />}/>
    </Routes>
  )
}
