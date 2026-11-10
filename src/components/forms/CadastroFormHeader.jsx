import styles from "../../cadastro.module.css"

export default function CadastroFormHeader(){
    return(
        <div className={styles.form_header}>
            <span className={styles.welcome_label}>JUNTE-SE À COMUNIDADE</span>

            <h2>Criar uma conta</h2>

            <p>Preencha os seus dados para começar.</p>
          </div>
    )
}