import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Sidebar from '../../../components/Sidebar/Sidebar'
import './ReportTeleEntrevistas.css'

const ReportTeleEntrevistas = () => {

    const [aAgendar, setAAgendar] = useState(0)
    const [agendadas, setAgendadas] = useState(0)
    const [total, setTotal] = useState(0)

    const buscarPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/naoRealizadas`, { withCredentials: true })

            let quantidadeAgendar = 0
            let quantidadeAgendado = 0

            result.data.propostas.forEach(e => {
                if(e.agendado === 'agendado') {
                    quantidadeAgendado++
                } else {
                    quantidadeAgendar++
                }
            })

            setAAgendar(quantidadeAgendar)
            setAgendadas(quantidadeAgendado)
            setTotal(quantidadeAgendado + quantidadeAgendar)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className='section-report-entrevista-container'>
                <div className='report-entrevista-container'>
                    <div className='title'>
                        <h3>Report Tele Entrevistas</h3>
                    </div>
                    <div className='report-entrevistas'>
                        <p>Bom dia!</p>
                        <p>*Demanda Diária (Tele-entrevista)*</p>
                        <p>{aAgendar} agendar</p>
                        <p>{agendadas} agendados</p>
                        <p>Total: {total}</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReportTeleEntrevistas