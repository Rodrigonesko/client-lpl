import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import Pergunta from "../../../components/Pergunta/Pergunta";
import subPergunta from "../../../components/SubPergunta/SubPergunta";
import './Formulario.css'

let respostas = {

}

let subRespostas = {

}

let simOuNao = {

}

const Formulario = () => {

    const { id } = useParams()

    const [perguntas, setPerguntas] = useState([])
    const [pessoa, setPessoa] = useState({})

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

            setPerguntas(result.data.perguntas)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarInfoPessoa = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/pessoa/${id}`, { withCredentials: true })

            setPessoa(result.data.pessoa)

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (item) => {
        respostas[`${item.id}`] = item.value
    }

    const handleChangeSub = (item) => {
        subRespostas[`${item.id}`] = item.value
    }

    const handleSimOuNao = (item) => {
        let split = item.name.split('-')
        simOuNao[`${split[1]}`] = item.value
    }

    const enviarDados = async () => {
        try {
            console.log(respostas);

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/formulario`, {
                respostas: respostas,
                subRespostas: subRespostas,
                pessoa,
                simOuNao
            }, {
                withCredentials: true
            })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPerguntas()
        buscarInfoPessoa()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-formulario-container">
                <div className="formulario-container">
                    <div className="title">
                        <h3>Entrevista Qualificativa</h3>
                    </div>
                    <div className="info-adicional">
                        <button>Informações Adicionais</button>
                    </div>
                    <RoteiroTeleEntrevista></RoteiroTeleEntrevista>
                    <div className="info-pessoa-entrevista-container">
                        <div className="title">
                            <h3>Questionário Médico</h3>
                        </div>
                        <InfoPessoaEntrevista pessoa={pessoa}></InfoPessoaEntrevista>
                    </div>
                    <div className="observacoes-entrevista">
                        <div className="title">
                            <h3>Observações</h3>
                        </div>
                    </div>
                    <div className="formulario">
                        {
                            perguntas.map(e => {

                                return (
                                    <>
                                        <Pergunta handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="btn-enviar-form-btn">
                        <button onClick={enviarDados} >Enviar</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Formulario