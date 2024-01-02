import "./style.css";

import InputField from "../InputField";
import ButtonDefault from "../ButtonDefault";

const FormCustomer = ({onSubmit, onCancel}) => {
    return (
        <section className="section-form-customer">
            <form onSubmit={onSubmit}>
             <h2> Digite os dados do cliente</h2>
                <InputField label="Nome" placeholder="Digite seu nome" required={true}/>
                <InputField label="Cpf" placeholder="Digite seu cpf"  required={true}/>
                <InputField label="Data Nascimento" placeholder="Digite sua data de nascimento" type="date" required={true} />
                <InputField label="Email para contato" placeholder="Digite seu melhor email"/>
                <div className="buttons-form-customer">
                    <ButtonDefault name="Cancelar" isCancel={true} onClick={onCancel}/>
                    <ButtonDefault name="Salvar"/>
                </div>
            </form>
        </section>
    )
}

export default FormCustomer;