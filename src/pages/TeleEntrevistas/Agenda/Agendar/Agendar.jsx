import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Agendar.css'
import moment from "moment";
import Modal from "react-modal";
import {Link} from 'react-router-dom'

import AuthContext from "../../../../context/AuthContext";

Modal.setAppElement('#root')

const Agendar = () => {

    const { accessLevel } = useContext(AuthContext)

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [modalCancelar, setModalCancelar] = useState(false)
    const [modalExcluir, setModalExcluir] = useState(false)

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [dataGerar, setDataGerar] = useState('')
    const [datasEntrevista, setDatasEntrevista] = useState([])
    const [enfermeiro, setEnfermeiro] = useState('')
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [horarios, setHorarios] = useState({})
    const [msg, setMsg] = useState('')

    const [beneficiario, setBeneficiario] = useState('')
    const [dataEntrevista, setDataEntrevista] = useState('')

    const [qtdNaoAgendado, setQtdNaoAgendado] = useState(0)

    const [propostaCancelar, setPropostaCancelar] = useState('')
    const [nomeCancelar, setNomeCancelar] = useState('')
    const [idCancelar, setIdCancelar] = useState('')
    const [motivoCancelar, setMotivoCancelar] = useState('Sem Sucesso de Contato!')

    const [propostaExcluir, setPropostaExcluir] = useState('')
    const [nomeExcluir, setNomeExcluir] = useState('')
    const [idExcluir, setIdExcluir] = useState('')

    const [novaVigencia, setNovaVigencia] = useState('')

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const openModalCancelar = () => {
        setModalCancelar(true)
    }

    const closeModalCancelar = () => {
        setModalCancelar(false)
    }

    const openModalExcluir = () => {
        setModalExcluir(true)
    }

    const closeModalExcluir = () => {
        setModalExcluir(false)
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
                if (e.status != 'Concluido' && e.agendado !== 'agendado' && e.status !== 'Cancelado') {
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

            console.log(result);

            setHorariosDisponiveis(result.data.horarios)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarHorariosDisp = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/horarios/disponiveis`, { withCredentials: true })

            console.log(result);

            setHorarios(result.data.obj)

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

    const cancelar = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/cancelar`, { id: idCancelar, motivoCancelamento: motivoCancelar }, { withCredentials: true })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    const excluir = async () => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/proposta/excluir`, { id: idExcluir }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const relatorioPropostas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas`, { withCredentials: true })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Data Vigencia</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Nome</th>"
            xls += "<th>Cpf</th>"
            xls += "<th>Data Nascimento</th>"
            xls += "<th>Administrador</th>"
            xls += "<th>Risco</th>"
            xls += "<th>Sinistralidade</th>"
            xls += "<th>Divergencia</th>"
            xls += "<th>Cid Irregularidade</th>"
            xls += "<th>Status</th>"
            xls += "<th>Cid Identificado</th>"
            xls += "<th>Data Entrevista</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Sexo</th>"
            xls += "<th>Telefone</th>"
            xls += "<th>DS 1</th>"
            xls += "<th>DS 2</th>"
            xls += "<th>DS 3</th>"
            xls += "<th>DS 4</th>"
            xls += "<th>DS 5</th>"
            xls += "<th>DS 6</th>"
            xls += "<th>DS 7</th>"
            xls += "<th>DS 8</th>"
            xls += "<th>DS 9</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            result.data.propostas.map(e => {
                xls += "<tr>"
                xls += `<td>${moment(e.createdAt).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.dataNascimento}</td>`
                xls += `<td>${e.administradora}</td>`
                xls += `<td>${e.riscoImc}</td>`
                xls += `<td>${e.sinistral}</td>`
                xls += `<td>${e.divergencia}</td>`
                xls += `<td>${e.cid}</td>`
                xls += `<td>${e.status}</td>`
                xls += `<td>${e.cids}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.sexo}</td>`
                xls += `<td>${e.telefone}</td>`
                xls += `<td>${e.d1}</td>`
                xls += `<td>${e.d2}</td>`
                xls += `<td>${e.d3}</td>`
                xls += `<td>${e.d4}</td>`
                xls += `<td>${e.d5}</td>`
                xls += `<td>${e.d6}</td>`
                xls += `<td>${e.d7}</td>`
                xls += `<td>${e.d8}</td>`
                xls += `<td>${e.d9}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Propostas.xls'
            a.click()


        } catch (error) {
            console.log(error);
        }
    }

    const relatorioNaoRealizadas = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas`, { withCredentials: true })

            const naoRealizadas = result.data.propostas.filter(e => {
                return e.status !== 'Concluído' && e.status !== 'Cancelado'
            })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<td>Data Recebimento</td>"
            xls += "<td>Data Vigência</td>"
            xls += "<td>Proposta</td>"
            xls += "<td>Nome</td>"
            xls += "<td>CPF</td>"
            xls += "<td>Agendado</td>"
            xls += "<td>Data Entrevista</td>"
            xls += "<td>Responsável</td>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            naoRealizadas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${moment(e.createtAt).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.agendado}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.enfermeiro}</td>`
                xls += `</tr>`

            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Não Realizadas.xls'
            a.click()

        } catch (error) {
            console.log(error);
        }
    }

    const alterarTelefone = async (telefone, id) => {
        try {
            
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/alterarTelefone`, {id, telefone}, {withCredentials: true})

            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiros()
        buscarHorariosDisp()

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
                    <div>
                        <button onClick={relatorioPropostas}>Relatorio Propostas</button>
                        <button onClick={relatorioNaoRealizadas}>Relatorio Não Realizadas</button>
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
                                    <th>Formulario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {
                                        if (e.status != 'Concluido' && e.agendado !== 'agendado' && e.status !== 'Cancelado') {
                                            console.log(e);
                                            return (
                                                <tr key={e._id}>
                                                    <td><input type="date" name="" id="" disabled={ accessLevel != 'false' ? (false) : (true)} defaultValue={e.vigencia}/><button>Alterar</button></td>
                                                    <td>{e.proposta}</td>
                                                    <td>{e.nome}</td>
                                                    <td>{e.dataNascimento}</td>
                                                    <td>{e.sexo}</td>
                                                    <td> <input type="text" defaultValue={e.telefone} onKeyUp={element => alterarTelefone(element.target.value, e._id)} /></td>
                                                    <td><button className="btn-cancelar" onClick={() => {
                                                        setPropostaCancelar(e.proposta)
                                                        setNomeCancelar(e.nome)
                                                        setIdCancelar(e._id)
                                                        openModalCancelar()
                                                    }}>Cancelar</button><button className="btn-cancelar" onClick={() => {
                                                        setPropostaExcluir(e.proposta)
                                                        setNomeExcluir(e.nome)
                                                        setIdExcluir(e._id)
                                                        openModalExcluir()
                                                    }}>Excluir</button></td>
                                                    <td><Link to={`/entrevistas/formulario/${e._id}`} className='link-formulario'>Formulario</Link></td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
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
                <Modal
                    isOpen={modalCancelar}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <h2>Deseja cancelar a proposta: {propostaCancelar} da pessoa: {nomeCancelar}?</h2>
                    <div>
                        <select name="motivo-cancelamento" id="motivo-cancelamento" onChange={e=>setMotivoCancelar(e.target.value)} >
                            <option value="Sem Sucesso de Contato!">Sem Sucesso de Contato!</option>
                            <option value="Beneficiario Solicitou o Cancelamento">Beneficiario Solicitou o Cancelamento</option>
                        </select>
                    </div>
                    <button onClick={() => {
                        closeModalCancelar()
                    }}>Fechar</button>
                    <button className="btn-cancelar" onClick={() => {
                        cancelar()
                        closeModalCancelar()
                        window.location.reload();
                    }}>Cancelar</button>
                </Modal>
                <Modal
                    isOpen={modalExcluir}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <h2>Deseja <strong>*EXCLUIR*</strong> a proposta: {propostaExcluir} da pessoa: {nomeExcluir}?</h2>
                    <button onClick={() => {
                        closeModalExcluir()
                    }}>Fechar</button>
                    <button className="btn-cancelar" onClick={() => {
                        excluir()
                        closeModalExcluir()
                        //window.location.reload();
                    }}>EXCLUIR</button>
                </Modal>
            </section>
        </>
    )
}

export default Agendar