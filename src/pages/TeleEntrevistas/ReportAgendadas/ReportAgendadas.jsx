import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './ReportAgendadas.css'

const ReportAgendadas = () => {

    const [propostas, setPropostas] = useState({})

    const buscarAgendadas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/report/agendadas`, { withCredentials: true })

            setPropostas(result.data.report)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        buscarAgendadas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-report-agendadas-container">
                <div>
                    <div className="title">
                        <h3>Report Agendados</h3>
                    </div>
                    <div className="report-agendados">
                        {
                            Object.keys(propostas).map(data => {
                                return (
                                    <div className="report-agendados-card">
                                        <span>Data: <strong>{data}</strong></span>
                                        <br />
                                        {
                                            Object.keys(propostas[data]).map(analista => {
                                                return (
                                                    <>
                                                        <span>{analista}: {propostas[data][analista]}</span>
                                                        <br />
                                                    </>
                                                )
                                            })
                                        }
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

export default ReportAgendadas

