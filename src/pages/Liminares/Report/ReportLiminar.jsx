import React, { useEffect, useState } from "react";
import Axios from "axios";
import moment from "moment";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './ReportLiminar.css'

const ReportLiminar = () => {

    const [backlogAnterior, setBacklogAnterior] = useState(0)
    const [recebidas, setRecebidas] = useState(0)
    const [finalizadas, setFinalizadas] = useState(0)
    const [backlog, setBacklog] = useState(0)
    const [total, setTotal] = useState(0)

    const setValues = async () => {

        const { data } = await Axios.get(`${process.env.REACT_APP_API_KEY}/liminares/show`, { withCredentials: true })

        let hoje = new Date()

        let recebidasAux = 0
        let finalizadasAux = 0
        let backlogAux = 0

        data.liminares.forEach(e => {
            if (moment(e.createdAt).format() == moment(hoje).format()) {
                recebidasAux++
            }

            if (e.dataConclusao !== undefined) {

                if (moment(e.dataConclusao).format('DD/MM/YYYY') == moment(hoje).format('DD/MM/YYYY')) {
                    finalizadasAux++
                }
            }

            if (e.situacao === 'andamento'){
                backlogAux++
            }

        })

        setRecebidas(recebidasAux)
        setFinalizadas(finalizadasAux)
        setBacklog(backlogAux)
        setTotal(backlogAux + finalizadasAux)

    }

    useEffect(() => {
        setValues()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-msg-container">
                <div className="msg-container">
                    <div className="msg">
                        <div className="title">
                            <h3>*Demanda diária (LIMINARES):*</h3>
                            <p>{backlogAnterior} - BACKLOG ANTERIOR</p>
                            <p>{recebidas} - RECEBIDAS</p>
                            <p>{finalizadas} - FINALIZADAS</p>
                            <p>{backlog} - BACKLOG</p>
                            <p>*TOTAL - {total}  LIMINARES*</p>
                        </div>
                    </div>
                    <div className="concluir-backlog">
                        <button>Concluir dia</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReportLiminar