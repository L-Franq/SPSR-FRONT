import { useState, useEffect } from "react";
import { FaTriangleExclamation, FaUser, FaShieldHalved } from "react-icons/fa6";
import styles from "../dashboard.module.css";
import ActiveUserStatus from "./ActiveUSerStatus";
import InactiveUserStatus from "./InactiveUserStatus";
import Swal from "sweetalert2";

export default function DashboardHeader() {
  {
    /* Cabeçalho Principal / Navegação */
  }

  const [userName, setUserName] = useState("carregando...");
  const [userStatus, setUSerStatus] = useState(false);

  useEffect(() => {
    document.title = "SPSR - Dashboard do Utilizador";

    const buscarDadosUsuario = async () => {
      try {
        const token = localStorage.getItem("token_eu");
        const response = await fetch(
          "http://192.168.137.113:8000/api/v1/user",
          {
            method: "GET",
            headers: {
              "Content-type": "Application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const dadosServer = await response.json();
          const userName = dadosServer.name;
          const status = true;

          setUserName(userName);
          setUSerStatus(status);
        }

        setUSerStatus(false);
      } catch (error) {
        console.error("Erro na conexao: ", error);
        setUSerStatus(false);
      }
    };

    buscarDadosUsuario();
  }, []);

  const dispararAlertaEmergencia = function () {
    Swal.fire({
      title: "Emitir Alerta SOS?",
      text: "Isso irá enviar à sua localização atual imediatamente às autoridades.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#475569",
      confirmButtonText: "Confirmar SOS",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        Swal.fire({
          title: "Alerta Enviado!",
          text: "Sua localização foi transmitida para a central.",
          icon: "success",
          confirmButtonColor: "#0284C7",
        });
      }
    });
  };

  function goProfile(e) {
    e.stopPropagation();

    window.location = "/perfil";
  }

  return (
    <header className={styles.cabecalho_principal}>
      <div className={styles.cabecalho_conteudo}>
        <div className={styles.brand_area}>
          <div className={styles.brand_icone}>
            <i>
              <FaShieldHalved />
            </i>
          </div>
          <div className={styles.brand_texto}>
            <h1 className={styles.brand_titulo}>
              Painel de Actividade
            </h1>
            <p className={styles.brand_subtitulo}>
              Prevenção em Tempo Real
            </p>
          </div>
        </div>

        <div className={styles.user_actions_area}>
          <button onClick={dispararAlertaEmergencia} className={styles.btn_sos}>
            <i>
              <FaTriangleExclamation />
            </i>
            <span>Alerta SOS</span>
          </button>

          <div className={styles.divisor_vertical}></div>

          <div className={styles.user_profile}>
            <div className={styles.user_info}>
              <p className={styles.user_nome} id="nome-utilizador">
                {userName}
              </p>
              <span className={styles.user_status}>
                {userStatus ? (
                  <ActiveUserStatus />
                ) : (
                  <InactiveUserStatus StatusDescription="Inativo" />
                )}
              </span>
            </div>
            <div onClick={goProfile} className={styles.user_avatar}>
              <i>
                <FaUser />
              </i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
