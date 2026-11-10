import "tailwindcss";
import "../dashboard.module.css";
import BannerInformativo from "./BannerInfo";
import MapaInteractivo from "./MapaInteractivo";
import VisualizarOcorrencia from "./VisualizarOcorrencia";
import ListaDeOcorrencias from "./ListaDeOcorrencia";
import RegistroDeOcorrencias from "./RegistroDeOcorrencia";
import Anuncios from "./Anuncios";

export default function DashboardMain() {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <BannerInformativo />

      <div className="bento-grid">
        <MapaInteractivo />

        <VisualizarOcorrencia />

        <ListaDeOcorrencias />

        <RegistroDeOcorrencias />

        <Anuncios />
      </div>
    </main>
  );
}
