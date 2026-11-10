import "../dashboard.module.css";
import { FaLocationDot, FaRotateRight } from "react-icons/fa6";
import { useState, useEffect } from "react";

export default function BannerInformativo(){

const [ zonaAtual, setZonaAtual ] = useState("carregando...");
const [nivelDeRisco, setNivelDeRisco ] = useState("verificando...");

useEffect(()=>{
    const currentLocationDescription = async()=>{
        const token = "token";
        const response = await fetch("/", {
            method: "GET",
            header: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const dadosServer = await response.json();
        const zonaAtual = dadosServer.current_location;
        const nivelDeRisco = dadosServer.risk_level;

        setZonaAtual(zonaAtual);
        setNivelDeRisco(nivelDeRisco);
    }

    currentLocationDescription();
}, [])

    return (
        <div className="mb-6 bg-slate-800 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-600 rounded-xl">
                    <i className="text-lg"><FaLocationDot /></i>
                </div>
                <div>
                    <h2 className="font-semibold text-sm sm:text-base">Zona Atual: <span id="zona-atual" className="text-sky-400">{zonaAtual}</span></h2>
                    <p className="text-xs text-slate-300">Nível de Risco: <span className="text-amber-400 font-medium">{nivelDeRisco}</span></p>
                </div>
            </div>
            <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg transition text-slate-200 flex items-center gap-2 self-end sm:self-auto">
                <i id="icone-atualizar"><FaRotateRight /></i> Atualizar Dados
            </button>
        </div>
    );
}