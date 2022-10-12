import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Agendar.css'
import moment from "moment";
import Modal from "react-modal";

Modal.setAppElement('#root')

const Agendar = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [dataGerar, setDataGerar] = useState('')
    const [datasEntrevista, setDatasEntrevista] = useState([])
    const [enfermeiro, setEnfermeiro] = useState('')
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [msg, setMsg] = useState('')

    const [beneficiario, setBeneficiario] = useState('')
    const [dataEntrevista, setDataEntrevista] = useState('')

    const [qtdNaoAgendado, setQtdNaoAgendado] = useState(0)


    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const ajustarDia = (data) => {
        const arr = data.split('/')

        return `${arr[2]}-${arr[1]}-${arr[0]}`
    }

    const searchPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas`, { withCredentials: true })

            setPropostas(result.data.propostas)

            let qtd = 0
            
            propostas.forEach(e => {
                if (e.status != 'Concluido' && e.agendado !== 'agendado') {
                    qtd++
                }
            })

            setQtdNaoAgendado(qtd)

        } catch (error) {
            console.log(error);
        }
    }

    const searchEnfermeiros = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setEnfermeiros(result.data.enfermeiros)

            console.log(enfermeiros);

        } catch (error) {
            console.log(error);
        }
    }

    const gerarHorarios = async () => {
        try {
            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/gerarHorarios`, { dataGerar }, { withCredentials: true })

            console.log(result);

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

    const searchDataDisp = async (enfermeiro) => {
        try {

            setEnfermeiro(enfermeiro)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarDiasDisponiveis/${enfermeiro}`, { withCredentials: true })

            setDatasEntrevista(result.data.dias)

        } catch (error) {
            console.log(error);
        }
    }

    const searchHorariosDisp = async (dia) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosDisponiveis/${enfermeiro}/${ajustarDia(dia)}`, { withCredentials: true })

            setHorariosDisponiveis(result.data.horarios)

        } catch (error) {
            console.log(error);
        }
    }

    const agendar = async () => {
        try {
            console.log(beneficiario, enfermeiro, dataEntrevista);
            let horario = document.getElementById('horario').value

            console.log(horario);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/agendar`, { beneficiario: beneficiario, enfermeiro: enfermeiro, data: dataEntrevista, horario: horario }, { withCredentials: true })

            if (result.status === 200) {
                setMsg('Agendado com sucesso!')
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const countNaoAgendados = async () => {


    }
    useEffect(() => {
        searchPropostas()
        searchEnfermeiros()

    }, [qtdNaoAgendado])

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
                        <button className="btn-gerar-horarios" onClick={gerarHorarios} >Gerar</button>
                    </div>
                    <div className="agendar">
                        <select name="nome" id="nome" onChange={e => setBeneficiario(e.target.value)} >
                            <option value=""></option>
                            {
                                propostas.map(e => {

                                    if (e.status !== 'Concluido' && e.agendado !== 'agendado') {
                                        return (
                                            <option key={e._id} value={e.nome}>{e.nome}</option>
                                        )
                                    }

                                })
                            }
                        </select>
                        <select name="enfermeira" id="enfermeira" onChange={e => {
                            searchDataDisp(e.target.value)
                        }}>
                            <option value=""></option>
                            {
                                enfermeiros.map(e => {
                                    return (
                                        <option key={e._id} value={e.name}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                        <select name="data" id="data" onChange={e => {
                            searchHorariosDisp(e.target.value)
                            setDataEntrevista(e.target.value)
                        }}>
                            <option value=""></option>
                            {
                                datasEntrevista.map(e => {
                                    return (
                                        <option key={e} value={e}>{e}</option>
                                    )
                                })
                            }

                        </select>
                        <select name="horario" id="horario">
                            {
                                horariosDisponiveis.map(e => {
                                    return (
                                        <option key={e} value={e}>{e}</option>
                                    )
                                })
                            }
                        </select>
                        <button className="btn-agendar" onClick={agendar}>Agendar</button>
                    </div>
                    <div className="title">
                        <h3>Não Agendados: {qtdNaoAgendado}</h3>
                    </div>
                    <div className="nao-agendados">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Data Vigencia</th>
                                    <th>Proposta</th>
                                    <th>Nome</th>
                                    <th>Data Nascimento</th>
                                    <th>Sexo</th>
                                    <th>Telefone</th>
                                    <th>Cancelar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {
                                        if (e.status != 'Concluido' && e.agendado !== 'agendado') {
                                            return (
                                                <tr key={e._id}>
                                                    <td>{e.vigencia}</td>
                                                    <td>{e.proposta}</td>
                                                    <td>{e.nome}</td>
                                                    <td>{e.dataNascimento}</td>
                                                    <td>{e.sexo}</td>
                                                    <td>{e.telefone}</td>
                                                    <td><button className="btn-cancelar">Cancelar</button></td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
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