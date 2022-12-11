import React from "react";

const DadosAngariador = ({
    cpfCorretor,
    setCpfCorretor,
    nomeCorretor,
    setNomeCorretor,
    telefoneCorretor,
    setTelefoneCorretor,
    cpfSupervisor,
    setCpfSupervisor,
    nomeSupervisor,
    setNomeSupervisor,
    telefoneSupervisor,
    setTelefoneSupervisor
}) => {

    const handleChange = (set, value) => {
        set(value)
    }

    return (
        <div className="container-pre-processamento">
            <div className="title">
                <h3>Dados Angariador</h3>
            </div>
            <div className="sub-bloco-pre-processamento">
                <div className="dados-angariador">
                    <div className="title">
                        <h4>Corretor</h4>
                    </div>
                    <div className="">
                        <label htmlFor="cpf-corretor">CPF:</label>
                        <input type="text" name="cpf-corretor" id="cpf-corretor" defaultValue={cpfCorretor} onKeyUp={e => {
                            handleChange(setCpfCorretor, e.target.value)
                        }} />
                        <label htmlFor="nome-corretor">Nome:</label>
                        <input type="text" name="nome-corretor" id="nome-corretor" defaultValue={nomeCorretor} onKeyUp={e => {
                            handleChange(setNomeCorretor, e.target.value)
                        }} />
                        <label htmlFor="telefone-corretor">Telefone:</label>
                        <input type="text" name="telefone-corretor" id="telefone-corretor" defaultValue={telefoneCorretor} onKeyUp={e => {
                            handleChange(setTelefoneCorretor, e.target.value)
                        }} />
                    </div>
                </div>
                <div className="dados-angariador">
                    <div className="title">
                        <h4>Supervisor</h4>
                    </div>
                    <div className="">
                        <label htmlFor="cpf-supervisor">CPF:</label>
                        <input type="text" name="cpf-supervisor" id="cpf-supervisor" defaultValue={cpfSupervisor} onKeyUp={e => {
                            handleChange(setCpfSupervisor, e.target.value)
                        }} />
                        <label htmlFor="nome-supervisor">Nome:</label>
                        <input type="text" name="nome-supervisor" id="nome-supervisor" defaultValue={nomeSupervisor} onKeyUp={e => {
                            handleChange(setNomeSupervisor, e.target.value)
                        }} />
                        <label htmlFor="telefone-supervisor">Telefone:</label>
                        <input type="text" name="telefone-supervisor" id="telefone-supervisor" defaultValue={telefoneSupervisor} onKeyUp={e => {
                            handleChange(setTelefoneSupervisor, e.target.value)
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DadosAngariador