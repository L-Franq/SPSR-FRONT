import styles from "../dashboard.module.css";
import BannerInformativo from "./BannerInfo";
import MapaInteractivo from "./MapaInteractivo";
import VisualizarOcorrencia from "./VisualizarOcorrencia";
import ListaDeOcorrencias from "./ListaDeOcorrencia";
import RegistroDeOcorrencias from "./RegistroDeOcorrencia";
import Anuncios from "./Anuncios";
import { useState, useEffect } from "react";

export default function DashboardMain() {
  const [zonaAtual, setZonaAtual] = useState("carregando...");
  const [nivelDeRisco, setNivelDeRisco] = useState("verificando...");

  useEffect(() => {
    const currentLocationDescription = async () => {
      const token = "token";
      const response = await fetch("/", {
        method: "GET",
        header: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const dadosServer = await response.json();
      const zonaAtual = dadosServer.current_location;
      const nivelDeRisco = dadosServer.risk_level;

      setZonaAtual(zonaAtual);
      setNivelDeRisco(nivelDeRisco);
    };

    currentLocationDescription();
  }, []);

  const zonaDetalhes = {
    zonaAtual: zonaAtual,
    nivelDeRisco: nivelDeRisco,
  };

  const [painelRefresh, setPainelRefresh] = useState(false);

  const refreshInfoPainel = () => {
    setPainelRefresh(!painelRefresh);
  };

  return (
    <div className={styles.pagina_dashboard}>
      <main className={styles.conteudo_principal}>
        <BannerInformativo
          zonaDetalhes={zonaDetalhes}
          isPainelRefresh={refreshInfoPainel}
        />

        <div className={styles.bento_grid}>
          <MapaInteractivo />

          <VisualizarOcorrencia />

          <ListaDeOcorrencias />

          <RegistroDeOcorrencias />

          <Anuncios />
        </div>
      </main>
    </div>
  );
}
