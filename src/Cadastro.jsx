import styles from "./cadastro.module.css";
import {
  FaLocationDot,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaArrowRight,
} from "react-icons/fa6";
import CadastroVisual from "./components/forms/CadastroVisual";
import CadastroFormHeader from "./components/forms/CadastroFormHeader";
import TermsAndCondictions from "./components/forms/TermsAndCondictions";
import PrivacyFooter from "./components/forms/PrivacyFooter";
import { useState } from "react";
import AlertaDosistema from "./Alerta";

export default function Cadastro() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  const registarUsuario = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://192.168.137.113:8000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const dadosServer = await response.json();

      if (response.ok) {
        let alertAttributes = {
          message: dadosServer.message,
          icon: "success",
          title: "Cadastrado com sucesso.",
        };

        AlertaDosistema(
          alertAttributes.icon,
          alertAttributes.title,
          alertAttributes.message,
        );

        return;
      } else {
        let alertAttributes = {
          message: dadosServer.message,
          icon: "error",
          title: "Falha ao cadastrar.",
        };

        AlertaDosistema(
          alertAttributes.icon,
          alertAttributes.title,
          alertAttributes.message,
        );

        return;
}
    } catch (error) {
      console.error("Falha ao cadastrar: ", error);

      let alertAttributes = {
        message: "Erro na conexao tente mais tarde!",
        icon: "error",
        title: "Falha ao cadastrar.",
      };

      AlertaDosistema(
        alertAttributes.icon,
        alertAttributes.title,
        alertAttributes.message,
      );
    }
  };

  return (
    <main className={styles.register_container}>
      <CadastroVisual />

      <section className={styles.register_form_section}>
        <div className={styles.register_form_wrapper}>
          <div className={styles.mobile_brand}>
            <i>
              <FaLocationDot />
            </i>
            Ocorrências<span>.</span>
          </div>

          <CadastroFormHeader />

          <form onSubmit={registarUsuario}>
            <div className={styles.form_group}>
              <label htmlFor="fullName">Nome completo</label>

              <div className={styles.input_wrapper}>
                <i>
                  <FaUser />
                </i>

                <input
                  type="text"
                  id="fullName"
                  name="name"
                  placeholder="Nome completo"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
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
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="phone">Número de telefone</label>

              <div className={styles.input_wrapper}>
                <i>
                  <FaPhone />
                </i>

                <input
                  id="phone"
                  name="phone"
                  placeholder="+244 9XX XXX XXX"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="password">Palavra-passe</label>

              <div className={styles.input_wrapper}>
                <i>
                  <FaLock />
                </i>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mínimo de 8 caracteres"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="confirmPassword">Confirmar palavra-passe</label>

              <div className={styles.input_wrapper}>
                <i>
                  <FaLock />
                </i>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repita a palavra-passe"
                />
              </div>
            </div>
            <div className={styles.privacy_checkbox}>
              <label htmlFor="privacy">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacyAccepted"
                  value="true"
                  required
                />

                <TermsAndCondictions />
              </label>
            </div>
            <button type="submit" className={styles.register_button}>
              <span>Criar conta</span>

              <i>
                <FaArrowRight />
              </i>
            </button>
          </form>
          <div className={styles.login_link}>
            Já possui uma conta?
            <a href="/login">Iniciar sessão</a>
          </div>
          <PrivacyFooter />
        </div>
      </section>
    </main>
  );
}
