import styles from "./login.module.css";
import {
  FaLocationDot,
  FaShieldHalved,
  FaUsers,
  FaEnvelope,
  FaLock,
  FaEye,
  FaArrowRight,
} from "react-icons/fa6";
import { useState } from "react";
import AlertaDosistema from "./Alerta";

export default function Login() {

const [loginForm, setLoginForm ] = useState({
  email: "",
  password: "",
});

const handleInputChange = function(e){
  const { name, value } = e.target;

  setLoginForm({
    ...loginForm,
    [name]: value,
  });
}

const loginUser = async(e)=>{
  e.preventDefault();

  try{
    const response = await fetch("http://192.168.137.113:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(loginForm),
    });

    const dadosServer = await response.json();
    const token = dadosServer.access_token;
    localStorage.setItem("token_eu", token);
    
    if(response.ok){
      const alertAttributes = {
        icon: "success",
        title: "Login bem sucedido!",
        message: dadosServer.message,
      }

      AlertaDosistema(alertAttributes.icon, alertAttributes.title, alertAttributes.message);
      window.location.href = "/dashboard";
    }
    else{
      const alertAttributes = {
        icon: "error",
        title: "Falha ao fazer login!",
        message: dadosServer.message,
      }

      AlertaDosistema(alertAttributes.icon, alertAttributes.title, alertAttributes.message);
      return;
    }

  }catch(error){
    console.error("Falha ao fazer login: ", error);
    const alertAttributes = {
        icon: "error",
        title: "Falha interna no servidor.",
        message: "Erro no servidor. Tente mais tarde!",
      }

      AlertaDosistema(alertAttributes.icon, alertAttributes.title, alertAttributes.message);
  }
}

  return (
    <main className={styles.login_container}>
      <section className={styles.login_visual}>
        <div className={styles.visual_content}>
          <div className={styles.brand}>
            <div className={styles.brand_icon}>
              <i>
                <FaLocationDot />
              </i>
            </div>
            <span>
              SPSR<span className={styles.brand_dot}>.</span>
            </span>
          </div>

          <div className={styles.visual_text}>
            <span className={styles.tag}>
              <i>
                <FaShieldHalved />
              </i>
              SEGURANCA RODOVIARIA
            </span>

            <h1>Juntos por uma comunidade mais segura.</h1>

            <p>
              Acompanhe ocorrências, reporte situações e contribua para a
              segurança da sua zona.
            </p>
          </div>

          <div className={styles.visual_footer}>
            <i>
              <FaUsers />
            </i>
            <span>Uma comunidade. Um propósito.</span>
          </div>
        </div>
      </section>
      <section className={styles.login_form_section}>
        <div className={styles.login_form_wrapper}>
          <div className={styles.mobile_brand}>
            <i>
              <FaLocationDot />
            </i>
            Ocorrências<span>.</span>
          </div>

          <div className={styles.form_header}>
            <span className={styles.welcome_label}>BEM-VINDO DE VOLTA</span>

            <h2>Iniciar sessão</h2>

            <p>Entre na sua conta para continuar.</p>
          </div>

          <form onSubmit={loginUser}>
            <div className={styles.form_group}>
              <label htmlFor="email">E-mail</label>

              <div className={styles.input_wrapper}>
                <i>
                  <FaEnvelope />
                </i>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.form_group}>
              <div className={styles.label_row}>
                <label htmlFor="password">Palavra-passe</label>

                <button
                  type="button"
                  className={styles.forgot_password}
                  id="forgotPassword"
                >
                  Esqueceu-se?
                </button>
              </div>

              <div className={styles.input_wrapper}>
                <i>
                  <FaLock />
                </i>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Introduza a sua palavra-passe"
                  required
                  onChange={handleInputChange}
                />

                <button
                  type="button"
                  className={styles.toggle_password}
                  id="togglePassword"
                  aria-label="Mostrar palavra-passe"
                >
                  <i>
                    <FaEye />
                  </i>
                </button>
              </div>
            </div>

            <div className={styles.remember_container}>
              <label className={styles.remember_label}>
                <input type="checkbox" id="rememberMe" />
                <span>Manter sessão iniciada</span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.login_button}
              id="loginButton"
            >
              <span>Entrar na conta</span>
              <i>
                <FaArrowRight />
              </i>
            </button>
          </form>
          <div className={styles.register_link}>
            Ainda não tem uma conta?
            <a href="/cadastro">Criar conta</a>
          </div>
        </div>
      </section>
    </main>
  );
}
