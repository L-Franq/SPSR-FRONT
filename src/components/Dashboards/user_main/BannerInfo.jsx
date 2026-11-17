import styles from "../dashboard.module.css";
import { FaListUl, FaLocationDot, FaMapLocationDot, FaRotateRight } from "react-icons/fa6";
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
},)

    return (
        <>

                <section classNameName={styles.banner_zona}>
            <div classNameName={styles.banner_detalhes}>
                <div classNameName={styles.banner_icone}>
                    <i><FaLocationDot /></i>
                </div>
                <div classNameName={styles.banner_texto}>
                    <h2>Zona Atual: <span id="zona-atual" classNameName={styles.texto_destaque}>{zonaAtual}</span></h2>
                    <p>Nível de Risco: <span classNameName={styles.texto_alerta}>{nivelDeRisco}</span></p>
                </div>
            </div>
            <button onClick="{atualizarDadosPainel}" classNameName={styles.btn_atualizar}>
                <i id="icone-atualizar"><FaRotateRight /></i>
                <span>Atualizar Dados</span>
            </button>
        </section>

        <div className={styles.bento_grid}>

            <article className={styles.bento_card && styles.bento_mapa}>
                <div className={styles.card_cabecalho}>
                    <div className={styles.card_titulo}>
                        <i className={styles.icone_sky}><FaMapLocationDot /></i>
                        <h2>Mapa de Incidentes</h2>
                    </div>
                    <span className={styles.tag_status}>Atualizado ao vivo</span>
                </div>
                <div id="map"></div>
            </article>

            <article className={styles.bento_card && styles_bento-zona}>
                <div className={styles.card_cabecalho}>
                    <div className={styles.card_titulo}>
                        <i className={styles.icone_sky}><FaListUl /></i>
                        <h2>Ocorrências na Zona</h2>
                    </div>
                    <span id="contador-ocorrencias-zona" className={zz}>0</span>
                </div>

                <div id="lista-ocorrencias-zona" className="lista-scroll">
                    <p className="mensagem-vazia">A carregar ocorrências...</p>
                </div>
            </article>
            </div>
        </>
    );
}