import styles from "../../../dashboard.module.css";
import { FaRectangleAd, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Swal from "sweetalert2"

export default function Anuncios() {

function navegarParaPortalAnuncios(evento) {
    evento.preventDefault();

    Swal.fire({
        title: 'Redirecionamento',
        text: 'A reencaminhar para o Portal de Anúncios...',
        icon: 'info',
        timer: 1200,
        showConfirmButton: false
    }).then(() => {
        window.location.href = '/portal-anuncios';
    });
}

  return (
    <article className={`${styles.bento_card} ${styles.bento_anuncios}`}>
      <div className={styles.anuncios_conteudo}>
        <div className={styles.card_cabecalhos}>
          <span className={styles.badge_parceiros}>Parceiros</span>
          <i className={styles.icone_muted}><FaRectangleAd /></i>
        </div>
        <h3>Portal de Serviços & Seguros</h3>
        <p>
          Consulte planos de assistência rodoviária e serviços mecânicos
          parceiros.
        </p>
      </div>
      <a
        onClick={navegarParaPortalAnuncios}
        className={styles.btn_portal}
      >
        Aceder ao Portal <i><FaArrowUpRightFromSquare /></i>
      </a>
    </article>
  );
}
