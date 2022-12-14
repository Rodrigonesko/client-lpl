import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import './AnaliseElegibilidadeDetalhes.css'
import StatusGeral from "./StatusGeral";
import DadosElegibilidade from "./DadosElegebilidade";

const AnaliseElegibilidadeDetalhes = () => {

    const { id } = useParams()

    const [proposta, setProposta] = useState({})

    const buscarDados = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })
        setProposta(result.data.proposta)

        if (result.data.proposta.status === 'A iniciar') {
            await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/proposta/alterarStatus`, {
                id
            }, {
                withCredentials: true
            })

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })
            setProposta(result.data.proposta)
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-analise-detalhes">
                <div>
                    <div className="title">
                        <h3>1° fase: {proposta.analistaPreProcessamento}</h3>
                    </div>
                    <div className="title">
                        <h3>2° fase: {proposta.analista}</h3>
                    </div>
                    <div className="info-proposta-container">
                        <div className="title">
                            <h3>{proposta.proposta} - {proposta.nome}</h3>
                        </div>
                        <StatusGeral
                            statusProposta={proposta.status}
                            status1Analise={proposta.status1Analise}
                            status2Analise={proposta.status2Analise}
                            status3Analise={proposta.status3Analise}
                        />
                        <DadosElegibilidade
                        proposta={proposta.proposta}
                        vigencia={moment(proposta.vigencia).format('DD/MM/YYYY')}
                        nome={proposta.nome}
                        administradora={proposta.administradora}
                        numeroVidas={proposta.numeroVidas}
                        entidade={proposta.entidade}
                        dataImportacao={moment(proposta.dataImportacao).format('DD/MM/YYYY')}
                        tipoVinculo={proposta.tipoVinculo}
                        statusMotor={proposta.statusMotor}
                         />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AnaliseElegibilidadeDetalhes
