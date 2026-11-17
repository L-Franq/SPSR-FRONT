import styles from "../dashboard.module.css";
import { useEffect } from "react";
import Leaflet from "leaflet";
import { FaMapLocationDot } from "react-icons/fa6";

export default function MapaInteractivo() {
  useEffect(() => {
    let mapaLeaflet = null;

    // Garante o disparo seguro ao carregar a página
    document.addEventListener("DOMContentLoaded", function () {
      inicializarMapa();
    });

    /* ==========================================================================
   1. INICIALIZAÇÃO DO MAPA E MARCADORES ESTÁTICOS
   ========================================================================== */
    function inicializarMapa() {
      const elementoMapa = document.getElementById("map");
      if (!elementoMapa) return;

      const coordenadasIniciais = [-8.83833, 13.23444];

      mapaLeaflet = Leaflet.map(elementoMapa).setView(coordenadasIniciais, 13);

      Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapaLeaflet);

      // Marcadores estáticos posicionados diretamente no mapa
      const marcadores = [
        {
          tipo: "Obras na Pista",
          local: "Via Expressa - KM 14",
          lat: -8.83833,
          lng: 13.23444,
        },
        {
          tipo: "Buraco Grave",
          local: "Avenida Fidel Castro",
          lat: -8.85,
          lng: 13.25,
        },
      ];

      marcadores.forEach((item) => {
        Leaflet.marker([item.lat, item.lng])
          .addTo(mapaLeaflet)
          .bindPopup(`<b>${item.tipo}</b><br>${item.local}`);
      });

      // Correção de Bug do Chrome onde o mapa por vezes carrega incompleto
      setTimeout(() => {
        mapaLeaflet.invalidateSize();
      }, 200);
    }
  });

  return (
    <article className={styles.bento_card && styles.bento_mapa}>
      <div className={styles.card_cabecalho}>
        <div className={styles.card_titulo}>
          <i className={styles.icone_sky}>
            <FaMapLocationDot />
          </i>
          <h2>Mapa de Incidentes</h2>
        </div>
        <span className={styles.tag_status}>Atualizado ao vivo</span>
      </div>
      <div id="map"></div>
    </article>
  );
}
