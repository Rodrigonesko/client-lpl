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

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/naoRealizadas`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

            let quantidadeAgendar = 0
            let quantidadeAgendado = 0

            let propostasNaoAgendadas = []

            result.data.propostas.forEach(e => {
                if (e.agendado === 'agendado') {
                    quantidadeAgendado++
                } else {
                    quantidadeAgendar++
                    propostasNaoAgendadas.push(e)
                }
            })

            setAAgendar(quantidadeAgendar)
            setAgendadas(quantidadeAgendado)
            setTotal(quantidadeAgendado + quantidadeAgendar)
            console.log(propostasNaoAgendadas);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar>
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
            </Sidebar>
        </>
    )
}

export default ReportTeleEntrevistas