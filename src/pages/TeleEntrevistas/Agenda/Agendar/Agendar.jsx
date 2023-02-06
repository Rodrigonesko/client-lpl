import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Agendar.css'
import Modal from "react-modal";
import TabelaAgendarRn from "../../../../components/TabelaAgendar/TabelaAgendarRn";
import TabelaAgendarTele from "../../../../components/TabelaAgendar/TabelaAgendarTele";
import BotoesRelatorios from "../../../../components/TabelaAgendar/BotoesRelatorio";
import Agendamento from "../../../../components/TabelaAgendar/Agendamento";

import AuthContext from "../../../../context/AuthContext";

Modal.setAppElement('#root')

const Agendar = () => {

    const { accessLevel } = useContext(AuthContext)

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [propostas, setPropostas] = useState([])
    const [rns, setRns] = useState([])
    const [propostasTotal, setPropostasTotal] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [dataGerar, setDataGerar] = useState('')

    const [horarios, setHorarios] = useState({})
    const [msg, setMsg] = useState('')

    const [qtdNaoAgendado, setQtdNaoAgendado] = useState(0)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const searchPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/naoAgendadas`, { withCredentials: true })

            const resultRns = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/naoAgendadas`, { withCredentials: true })

            let arrTele = []
            let arrRn = []

            for (const proposta of result.data.propostas) {
                arrTele.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.nome} - TELE`,
                    id: proposta._id,
                    celula: 'tele'
                })
            }

            for (const proposta of resultRns.data.result) {
                arrRn.push({
                    proposta: proposta.proposta,
                    nome: `${proposta.beneficiario} - RN`,
                    id: proposta._id,
                    celula: 'rn'
                })
            }

            const arrTotal = arrTele.concat(arrRn)

            setRns(resultRns.data.result)

            setPropostas(result.data.propostas)

            setPropostasTotal(arrTotal)

            setQtdNaoAgendado(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const searchEnfermeiros = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setEnfermeiros(result.data.enfermeiros)

        } catch (error) {
            console.log(error);
        }
    }

    const gerarHorarios = async () => {
        try {
            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/gerarHorarios`, { dataGerar }, { withCredentials: true })

            if (result.status === 200) {
                setMsg('Horario gerados com sucesso!')
                openModal()
            }
        } catch (error) {
            console.log(error);
            setMsg('Horarios ja gerados para o dia escolhido!')
            openModal()
        }
    }

    const buscarHorariosDisp = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/horarios/disponiveis`, { withCredentials: true })

            setHorarios(result.data.obj)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiros()
        buscarHorariosDisp()

    }, [])

    return (
        <>
            <Sidebar />
            <section className="section-agendamento-container">
                <div className="agendamento-container">
                    <div className="title">
                        <h3>Agendamento de Horários</h3>
                    </div>
                    <div className="gerar-horarios">
                        <label htmlFor="">Selecionar dia para entrevistas</label>
                        <input type="date" name="" id="" onChange={e => setDataGerar(e.target.value)} />
                        <button className="btn-padrao-azul" onClick={gerarHorarios} >Gerar</button>
                    </div>
                    <Agendamento propostas={propostasTotal} responsaveis={enfermeiros}/>

                    <BotoesRelatorios></BotoesRelatorios>

                    <TabelaAgendarTele propostas={propostas}>

                    </TabelaAgendarTele>

                    <TabelaAgendarRn propostas={rns}>

                    </TabelaAgendarRn>

                    <div className="horarios-disponiveis-container">
                        <div className="title">
                            <h3>Horarios Disponíveis</h3>
                        </div>
                        {
                            Object.keys(horarios).map(data => {
                                return (
                                    <div className="horarios-disponiveis-card">
                                        <span>Horários disponíveis para o dia <strong>{data}</strong></span>
                                        <br />
                                        {
                                            horarios[data].map(horario => {
                                                return (
                                                    <span>{horario} - </span>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <h2>{msg}</h2>

                    <button onClick={() => {
                        closeModal()
                        window.location.reload();
                    }}>Fechar</button>
                </Modal>
            </section>
        </>
    )
}

export default Agendar