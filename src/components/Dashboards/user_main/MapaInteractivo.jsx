import styles from "../../../dashboard.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaMapLocationDot, FaExclamation } from "react-icons/fa6";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Correção para o ícone padrão do marcador aparecer corretamente no Vite
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function MapaInteractivo() {
  const marcadores = [
    {
      id: 1,
      tipo: "Obras na Pista",
      local: "Via Expressa - KM 14",
      lat: -8.83833,
      lon: 13.23444,
    },
    {
      id: 2,
      tipo: "Buraco Grave",
      local: "Avenida Fidel Castro",
      lat: -8.85,
      lon: 13.25,
    },
  ];

  // Centro inicial focado em Luanda (média das coordenadas)
  const centroMapa = [-8.844, 13.242];

  return (
    <article className={`${styles.bento_card} ${styles.bento_mapa}`}>
      <div className={styles.card_cabecalhos}>
        <div className={styles.card_titulo}>
          <i className={styles.icone_sky}>
            <FaMapLocationDot />
          </i>
          <h2>Mapa de Incidentes</h2>
        </div>
        <span className={styles.tag_status}>Atualizado ao vivo</span>
      </div>

      <div
        style={{
          width: "100%",
          height: "350px",
          borderRadius: "12px",
          overflow: "hidden",
          marginTop: "1rem",
        }}
      >
        <MapContainer
          center={centroMapa}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          {/* 4. TileLayer em vez de ImageOverlay */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {marcadores.map((propriedades) => (
            <Marker
              key={propriedades.id}
              position={[propriedades.lat, propriedades.lon]}
            >
              <Popup>
                <h3 style={{ textAlign: "center", margin: "0 0 5px 0" }}>
                  <FaMapLocationDot />
                  &nbsp;{propriedades.local}
                </h3>
                <hr />
                <p
                  style={{
                    textAlign: "left",
                    letterSpacing: "1px",
                    fontWeight: "bold",
                    margin: "5px 0 0 0",
                  }}
                >
                  <FaExclamation />
                  &nbsp;DESCRIÇÃO: {propriedades.tipo}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </article>
  );
}
