import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Modal from 'react-modal'
import "./Horarios.css"
import { Button, Box, InputLabel, MenuItem, FormControl, Select, Container, TextField, Paper, Typography } from "@mui/material";

Modal.setAppElement('#root')

const Horarios = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [responsaveis, setResponsaveis] = useState([])
    const [dataFecharDia, setDataFecharDia] = useState('')
    const [responsavelFecharDia, setResponsavelFecharDia] = useState('')
    const [dataFecharHorario, setDataFecharHorario] = useState('')
    const [responsavelFecharHorario, setResponsavelFecharHorario] = useState('')
    const [horariosDisponiveis, setHorarioDisponiveis] = useState([])
    const [responsavelReabrirHorario, setResponsavelReabrirHorario] = useState('')
    const [dataReabrirHorario, setDataReabrirHorario] = useState('')
    const [horariosNaoDisponiveis, setHorariosDisponiveis] = useState([])

    const [responsavelExcecao, setResponsavelExcecao] = useState('')
    const [diaExcecao, setDiaExcecao] = useState('')
    const [horarioExcecao, setHorarioExcecao] = useState('')

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const buscarEnfermeira = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setResponsaveis(result.data.enfermeiros)

        } catch (error) {
            console.log(error);
        }
    }

    const fecharDia = async () => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/fecharDia`, { data: dataFecharDia, responsavel: responsavelFecharDia }, { withCredentials: true })

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscarHorariosDisponiveis = async (data) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosDisponiveis/${responsavelFecharHorario}/${data}`, { withCredentials: true })

            setHorarioDisponiveis(result.data.horarios)

        } catch (error) {
            console.log(error);
        }
    }

    const fecharHorarios = async () => {
        try {
            let horariosArr = document.getElementsByClassName('horarios-disponiveis')

            let values = Object.values(horariosArr).map(e => {
                if (e.checked) {
                    return e.value
                }

                return null

            })

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/fecharHorarios`, { data: dataFecharHorario, responsavel: responsavelFecharHorario, horarios: values }, { withCredentials: true })

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscarHorariosNaoDisponiveis = async (data) => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosNaoDisponiveis/${responsavelReabrirHorario}/${data}`, { withCredentials: true })

            setHorariosDisponiveis(result.data.horarios)

        } catch (error) {
            console.log(error);
        }
    }

    const reabrirHorarios = async () => {
        try {

            let arr = document.getElementsByClassName('horario-reabrir')

            let horarios = Object.values(arr).map(e => {
                if (e.checked) {
                    return e.value
                }

                return null
            })

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/reabrirHorarios`, { horarios, data: dataReabrirHorario, responsavel: responsavelReabrirHorario }, { withCredentials: true })

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const abrirNovoHorario = async () => {
        try {
            console.log(responsavelExcecao, diaExcecao, horarioExcecao);

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/horario/novo`, {
                responsavel: responsavelExcecao,
                dia: diaExcecao,
                horario: horarioExcecao
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarEnfermeira()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container className="section-horarios-container">
                <Box className="horarios-container">
                    <div className="title">
                        <h3>Ajustar Horários</h3>
                    </div>
                </Box>
                <Paper elevation={3} style={{ padding: '20px' }} >
                    <Typography variant='h6' m={1}>
                        Fechar Dia
                    </Typography>
                    <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                        <InputLabel id="responsavel">Responsável</InputLabel>
                        <Select
                            labelId='responsavel'
                            id="select-responsavel"
                            label='Responsável'
                            onChange={e => setResponsavelFecharDia(e.target.value)}
                        >
                            <MenuItem>
                                <em>
                                    Responsável
                                </em>
                            </MenuItem>
                            {
                                responsaveis.map(e => {
                                    return (
                                        <MenuItem value={e.name}>{e.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => setDataFecharDia(e.target.value)} label='Dia' focused />
                    <Button variant="contained"  onClick={fecharDia} >Fechar Dia</Button>
                </Paper>

                <div className="title">
                    <h4>Fechar Horarios</h4>
                </div>
                <div className="fechar-horario">
                    <label htmlFor="responsavel-fechar-horario">Responsável</label>
                    <select name="responsavel-fechar-horario" id="responsavel-fechar-horario" onChange={e => {
                        setResponsavelFecharHorario(e.target.value)
                    }}>
                        <option value="">Responsável</option>
                        {
                            responsaveis.map(e => {
                                return (
                                    <option value={e.name}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="dia-fechar-horario">Selecionar Dia</label>
                    <input type="date" name="dia-fechar-horario" id="dia-fechar-horario" onChange={e => {
                        setDataFecharHorario(e.target.value)
                        buscarHorariosDisponiveis(e.target.value)
                    }} />
                    <div>
                        <ul>
                            {
                                horariosDisponiveis.map(e => {
                                    return (
                                        <li><input className="horarios-disponiveis" type="checkbox" name={`fechar-${e}`} id={`fechar-${e}`} value={e} /><label htmlFor={`fechar-${e}`} >{e}</label></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <Button variant="contained" size="small" onClick={fecharHorarios} >Fechar Horarios</Button>
                </div>
                <div className="title">
                    <h4>Reabrir Horarios</h4>
                </div>
                <div className="reabrir-horario">
                    <label htmlFor="responsavel-reabrir-horario">Responsável</label>
                    <select name="responsavel-reabrir-horario" id="responsavel-reabrir-horario" onChange={e => { setResponsavelReabrirHorario(e.target.value) }}>
                        <option value="">Responsável</option>
                        {
                            responsaveis.map(e => {
                                return (
                                    <option value={e.name}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="dia-reabrir-horario">Selecionar Dia</label>
                    <input type="date" name="dia-reabrir-horario" id="dia-reabrir-horario" onChange={e => {
                        setDataReabrirHorario(e.target.value)
                        buscarHorariosNaoDisponiveis(e.target.value)
                    }} />
                    <div>
                        <ul>
                            {
                                horariosNaoDisponiveis.map(e => {
                                    return (
                                        <li><input className="horario-reabrir" type="checkbox" name={`reabrir-${e}`} id={`reabrir-${e}`} value={e} /> <label htmlFor={`reabrir-${e}`}>{e}</label> </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <Button variant="contained" size="small" onClick={reabrirHorarios}>Reabrir Horarios</Button>
                </div>
                <div>
                    <div className="title">
                        <h3>Abrir novo horário</h3>
                    </div>
                    <div>
                        <label htmlFor="">Responsável: </label>
                        <select name="" id="" onChange={e => {
                            setResponsavelExcecao(e.target.value)
                        }} >
                            <option value=""></option>
                            {
                                responsaveis.map(e => {
                                    return (
                                        <option value={e.name}>{e.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Data: </label>
                        <input type="date" name="" id="" onChange={e => setDiaExcecao(e.target.value)} />
                        <label htmlFor="">Horário: </label>
                        <input type="time" name="" id="" onChange={e => setHorarioExcecao(e.target.value)} />
                        <Button variant="contained" size="small" onClick={abrirNovoHorario} >Abrir</Button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title">
                        <h2>Horaios Ajustados com sucesso!</h2>
                        <Button onClick={() => {
                            closeModal()
                            window.location.reload()
                        }}>Fechar</Button>
                    </div>
                </Modal>
            </Container>
        </>
    )
}

export default Horarios