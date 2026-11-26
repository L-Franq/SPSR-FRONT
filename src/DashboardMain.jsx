import styles from "./dashboard.module.css";
import DashboardHeader from "./components/Dashboards/user_header/DashboardHeader";
import DashboardFooter from "./components/Dashboards/user_footer/DashboardFooter";
import BannerInformativo from "./components/Dashboards/user_main/BannerInfo";
import MapaInteractivo from "./components/Dashboards/user_main/MapaInteractivo";
import VisualizarOcorrencia from "./components/Dashboards/user_main/VisualizarOcorrencia";
import ListaDeOcorrencias from "./components/Dashboards/user_main/ListaDeOcorrencia";
import RegistroDeOcorrencias from "./components/Dashboards/user_main/RegistroDeOcorrencia";
import Anuncios from "./components/Dashboards/user_main/Anuncios";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function DashboardMain() {
  const [zonaAtual, setZonaAtual] = useState("carregando...");
  const [nivelDeRisco, setNivelDeRisco] = useState("verificando...");
  const [painelRefresh, setPainelRefresh] = useState(false);

  // Em ecrãs menores, começam recolhidos (false) e expandem ao clicar
  const [historicoAberto, setHistoricoAberto] = useState(false);
  const [zonaAberta, setZonaAberta] = useState(false);

  useEffect(() => {
    const currentLocationDescription = async () => {
      try {
        const token = localStorage.getItem("token_eu") || "token";
        const response = await fetch("/", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const dadosServer = await response.json();
        if (dadosServer.current_location) {
          setZonaAtual(dadosServer.current_location);
        }
        if (dadosServer.risk_level) {
          setNivelDeRisco(dadosServer.risk_level);
        }
      } catch {
        // Mantém os estados iniciais se a rota "/" não devolver JSON neste ambiente
      }
    };

    currentLocationDescription();
  }, [painelRefresh]);

  const zonaDetalhes = {
    zonaAtual,
    nivelDeRisco,
  };

  const refreshInfoPainel = () => {
    setPainelRefresh((prev) => !prev);
  };

  return (
    <div className={styles.pagina_dashboard}>
      <DashboardHeader />

      <main className={styles.conteudo_principal}>
        <BannerInformativo
          zonaDetalhes={zonaDetalhes}
          isPainelRefresh={refreshInfoPainel}
        />

        <div className={styles.bento_grid}>
          {/* Ação principal sempre explícita */}
          <RegistroDeOcorrencias />

          {/* Mapa interativo */}
          <MapaInteractivo />

          {/* Meu Histórico (recolhido em ecrãs menores, expande ao clicar) */}
          <div className={styles.secao_colapsavel}>
            <button
              type="button"
              className={styles.toggle_mobile_card}
              aria-expanded={historicoAberto}
              onClick={() => setHistoricoAberto((prev) => !prev)}
            >
              <span>Meu Histórico</span>
              <FaChevronDown
                className={`${styles.icone_seta} ${
                  historicoAberto ? styles.seta_aberta : ""
                }`}
              />
            </button>
            <div
              className={`${styles.conteudo_colapsavel} ${
                historicoAberto ? styles.aberto : ""
              }`}
            >
              <VisualizarOcorrencia />
            </div>
          </div>

          {/* Ocorrências na Zona (recolhido em ecrãs menores, expande ao clicar) */}
          <div className={styles.secao_colapsavel}>
            <button
              type="button"
              className={styles.toggle_mobile_card}
              aria-expanded={zonaAberta}
              onClick={() => setZonaAberta((prev) => !prev)}
            >
              <span>Ocorrências na Zona</span>
              <FaChevronDown
                className={`${styles.icone_seta} ${
                  zonaAberta ? styles.seta_aberta : ""
                }`}
              />
            </button>
            <div
              className={`${styles.conteudo_colapsavel} ${
                zonaAberta ? styles.aberto : ""
              }`}
            >
              <ListaDeOcorrencias />
            </div>
          </div>

          {/* Anúncios */}
          <Anuncios />
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
