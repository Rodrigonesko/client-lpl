import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import './Formulario.css'

const Formulario = () => {

    const {id} = useParams()

    const [perguntas, setPerguntas] = useState([])
    const [pessoa, setPessoa] = useState({})

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

            setPerguntas(result.data.perguntas)

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const buscarInfoPessoa = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/pessoa/${id}`, { withCredentials: true })

            console.log(result);

            setPessoa(result.data.pessoa)

            console.log(result.data.pessoa._id);

            console.log(pessoa);

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
                        <InfoPessoaEntrevista></InfoPessoaEntrevista>
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
                                    <div key={e._id} className='div-pergunta'>
                                        <label htmlFor={e._id} className='label-pergunta'>{e.pergunta}</label>
                                        <input type="text" name={`pergunta-${e._id}`} id={e._id} className="input-pergunta" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Formulario