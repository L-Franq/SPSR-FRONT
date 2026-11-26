import "./App.css";
import { Routes, Route } from "react-router-dom";
import Cadastro from "./Cadastro"
import Login from "./Login"
import DashboardUser from "./DashboardMain";
import UserProfile from "./ProfileMain";

export default function App() {
  return(
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/cadastro" element={<Cadastro />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<DashboardUser />}/>
      <Route path="/perfil" element={<UserProfile />}/>
    </Routes>
  )
}
