import styles from "../dashboard.module.css";
import { FaPlusCircle, FaBullhorn } from "react-icons/fa";
import Swal from "sweetalert2";

export default function RegistroDeOcorrencias() {
  function abrirModalReportar() {
    Swal.fire({
      title: "Reportar Ocorrência",
      text: "Deseja abrir o formulário detalhado de registo de ocorrências?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0284C7",
      cancelButtonColor: "#475569",
      confirmButtonText: "Sim, Abrir Formulário",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        window.location.href = "/ocorrencias/novo";
      }
    });
  }

  return (
    <article className={styles.bento_card && styles.bento_reportar}>
      <div className={styles.reportar_conteudo}>
        <div className={styles.reportar_badge}>
          <i>
            <FaBullhorn />
          </i>
          <span>Ação Rápida</span>
        </div>
        <h2>Presenciou uma Ocorrência?</h2>
        <p>
          Reporte acidentes, vias bloqueadas ou buracos graves para alertar
          outros condutores.
        </p>
      </div>
      <button onClick={abrirModalReportar} className={styles.btn_reportar_acao}>
        <i>
          <FaPlusCircle />
        </i>
        Reportar Nova Ocorrência
      </button>
    </article>
  );
}
