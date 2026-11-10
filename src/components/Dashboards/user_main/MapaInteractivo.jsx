import styles from "../dashboard.module.css";
import { useEffect } from "react";
import Leaflet from "leaflet";
import { FaLocationDot } from "react-icons/fa6";

export default function MapaInteractivo() {
  function inicializarMapa() {
    // Coordenadas geogr�ficas padr�o (Luanda, Angola)
    const coordenadasIniciais = [-8.83833, 13.23444];

    const mapaLeaflet = Leaflet.map("map").setView(coordenadasIniciais, 13);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapaLeaflet);
  }

  useEffect(() => {
    document.onload = function () {
      inicializarMapa();
    };
  });

  return (
    <div className={styles.bento_card && styles.bento_map && "flex flex-col justify-between"}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <i className="text-sky-600">
            <FaLocationDot />
          </i>
          <h2 className="font-bold text-slate-800">Mapa de Incidentes</h2>
        </div>
        <span className="text-xs text-slate-500">Atualizado ao vivo</span>
      </div>
      <div id="map"></div>
    </div>
  );
}
