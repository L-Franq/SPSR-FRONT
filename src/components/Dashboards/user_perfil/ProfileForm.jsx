import styles from "../../../userprofile.module.css";
import {
  FaUser,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaCakeCandles,
  FaAddressCard,
} from "react-icons/fa6";
import Swal from "sweetalert2";

export default function ProfileFrom() {
  function submeterAtualizacaoPerfil(evento) {
    evento.preventDefault(); // Impede o recarregamento nativo do html

    const nomeUtilizador = document.getElementById("nome").value;

    Swal.fire({
      title: "Atualizar Dados?",
      text: `Pretende guardar as altera��es efetuadas no perfil de ${nomeUtilizador}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0284C7",
      cancelButtonColor: "#475569",
      confirmButtonText: "Sim, Guardar",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        Swal.fire({
          title: "Sucesso!",
          text: "Os dados do perfil foram atualizados com sucesso.",
          icon: "success",
          confirmButtonColor: "#0284C7",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }

  return (
    <form className={styles.form_grid} onSubmit={submeterAtualizacaoPerfil}>
      <div className={styles.form_grupo}>
        <label htmlFor="nome">Nome Completo</label>
        <div className={styles.input_com_icone}>
          <i>
            <FaUser />
          </i>
          <input
            type="text"
            id="nome"
            name="nome"
            required
          />
        </div>
      </div>

      <div className={styles.form_grupo}>
        <label htmlFor="email">Endereço de E-mail</label>
        <div className={styles.input_com_icone}>
          <i>
            <FaEnvelope />
          </i>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
      </div>

      <div className={styles.form_grupo}>
        <label htmlFor="telemovel">Número de Telemóvel</label>
        <div className={styles.input_com_icone}>
          <i>
            <FaPhone />
          </i>
          <input
            type="tel"
            id="telemovel"
            name="telemovel"
            required
          />
        </div>
      </div>

      <div className={styles.form_grupo}>
        <label htmlFor="idade">Idade</label>
        <div className={styles.input_com_icone}>
          <i>
            <FaCakeCandles />
          </i>
          <input
            type="number"
            id="idade"
            name="idade"
            min="18"
            max="120"
            required
          />
        </div>
      </div>

      <div className={styles.form_grupo}>
        <label htmlFor="bi">Número do Bilhete de Identidade (BI)</label>
        <div className={styles.input_com_icone}>
          <i>
            <FaAddressCard />
          </i>
          <input
            type="text"
            id="bi"
            name="bi"
            required
          />
        </div>
      </div>

      <div className={styles.form_grupo}>
        <label htmlFor="morada">Morada Residencial</label>
        <div className={styles.input_com_icone}>
          <i>
            <FaLocationDot />
          </i>
          <input
            type="text"
            id="morada"
            name="morada"
            required
          />
        </div>
      </div>

      <div className={styles.form_acoes}>
        <button type="reset" className={styles.btn_secundario}>
          Cancelar Alterações
        </button>
        <button type="submit" className={styles.btn_primario}>
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}
