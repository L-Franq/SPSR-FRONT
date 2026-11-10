import "tailwindcss"
import { useState, useEffect } from "react";
import { FaTriangleExclamation, FaUser, FaShieldHalved } from "react-icons/fa6";
import "../dashboard.module.css";
import ActiveUserStatus from "./ActiveUSerStatus";
import InactiveUserStatus from "./InactiveUserStatus"

export default function DashboardHeader(){
    {/* Cabeçalho Principal / Navegação */}

    const [userName, setUserName ] = useState("carregando...");
    const [userStatus, setUSerStatus ] = useState(true);

    useEffect(()=>{
        document.title = "dashboard";

        const buscarDadosUsuario = async()=>{
            const token = localStorage.getItem("token_eu");
            const response = await fetch("http://192.168.137.113:8000/api/v1/user", {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            const dadosServer = await response.json();
            const userName = dadosServer.name;
            const status = true;

            setUserName(userName);
            setUSerStatus(status);
        }

        buscarDadosUsuario();
    }, [])


    return ( 
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                    <FaShieldHalved />
                </div>
                <div>
                    <h1 className="font-bold text-slate-800 leading-tight text-base sm:text-lg">Painel de Segurança Rodoviária</h1>
                    <p className="text-xs text-slate-500 hidden sm:block">Prevenção e Segurança em Tempo Real</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 border border-red-200">
                    <FaTriangleExclamation />
                    <span className="hidden sm:inline">Alerta SOS</span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-800" id="nome-utilizador">{userName}</p>
                        <span className="text-xs text-emerald-600 flex items-center justify-end gap-1">
                            {userStatus ? <ActiveUserStatus StatusDescription="ATIVO" /> : <InactiveUserStatus StatusDescription="INATIVO" />}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 font-medium">
                        <FaUser />
                    </div>
                </div>
            </div>
        </div>
    </header>
    );
}