import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Modal from 'react-modal'
import "./Horarios.css"
import { Button, Box, InputLabel, MenuItem, FormControl, Select, Container, TextField, Paper, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Snackbar, Alert } from "@mui/material";

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
    const [openSnack, setOpenSnack] = useState(false)

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

                if (e.firstChild.checked) {
                    return e.firstChild.value
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
                if (e.firstChild.checked) {
                    return e.firstChild.value
                }

                return null
            })

            console.log(horarios);

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
            
            if ((responsavelExcecao === '') || (diaExcecao === '') || (horarioExcecao === '')) {
                setOpenSnack(true)
                return
            }

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

    const handleCloseSnack = () => {
        setOpenSnack(false);  

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
                <Paper elevation={3} style={{ padding: '20px', margin: '10px' }} >
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
                    <Button variant="contained" onClick={fecharDia} >Fechar Dia</Button>
                </Paper>
                <Paper style={{ padding: '20px', margin: '10px' }} elevation={3}>
                    <Typography variant='h6' m={1}>
                        Fechar Horários
                    </Typography>
                    <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                        <InputLabel id="responsavel-fechar-horario">Responsável</InputLabel>
                        <Select
                            labelId='responsavel-fechar-horario'
                            id="select-responsavel-fechar-horario"
                            label='Responsável'
                            onChange={e => {
                                setResponsavelFecharHorario(e.target.value)
                            }}
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
                    <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => {
                        setDataFecharHorario(e.target.value)
                        buscarHorariosDisponiveis(e.target.value)
                    }} label='Dia' focused />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                        {
                            horariosDisponiveis.map(value => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <ListItem
                                        key={value}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    value={value}
                                                    className="horarios-disponiveis"
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`${value}`} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List >
                    <Button variant="contained" size="small" onClick={fecharHorarios} >Fechar Horarios</Button>
                </Paper>
                <Paper style={{ padding: '20px', margin: '10px' }} elevation={3}>
                    <Typography variant='h6' m={1}>
                        Reabrir Horários
                    </Typography>
                    <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                        <InputLabel id="responsavel-fechar-horario">Responsável</InputLabel>
                        <Select
                            labelId='responsavel-fechar-horario'
                            id="select-responsavel-fechar-horario"
                            label='Responsável'
                            onChange={e => { setResponsavelReabrirHorario(e.target.value) }}
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
                    <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => {
                        setDataReabrirHorario(e.target.value)
                        buscarHorariosNaoDisponiveis(e.target.value)
                    }} label='Dia' focused />
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
                        {
                            horariosNaoDisponiveis.map(value => {
                                const labelId = `checkbox-list-label-${value}`;
                                return (
                                    <ListItem
                                        key={value}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    value={value}
                                                    className="horario-reabrir"
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`${value}`} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List >
                    <Button variant="contained" size="small" onClick={reabrirHorarios}>Reabrir Horarios</Button>
                </Paper>
                <Paper style={{ padding: '20px', margin: '10px' }} elevation={3}>
                    <Typography variant='h6' m={1}>
                        Abrir Novo Horário
                    </Typography>
                    <FormControl style={{ minWidth: '150px', marginRight: '20px' }} size='small'>
                        <InputLabel id="responsavel-fechar-horario">Responsável</InputLabel>
                        <Select
                            labelId='responsavel-fechar-horario'
                            id="select-responsavel-fechar-horario"
                            label='Responsável'
                            onChange={e => {
                                setResponsavelExcecao(e.target.value)
                            }}
                        >
                            <MenuItem>
                                <em>
                                    Responsável
                                </em>
                            </MenuItem>
                            <MenuItem value={'Leonardo'}>
                                    Leonardo
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
                    <TextField style={{ marginRight: '20px' }} size="small" type='date' onChange={e => setDiaExcecao(e.target.value)} label='Dia' focused />
                    <TextField style={{ marginRight: '20px' }} size='small' type='time' label='Horário' focused onChange={e => setHorarioExcecao(e.target.value)} />
                    <Button variant="contained" onClick={abrirNovoHorario} >Abrir</Button>

                </Paper>
                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                    <Alert variant="filled" onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
                        Faltam dados, por favor preencha todos os dados!
                    </Alert>
                </Snackbar>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title">
                        <h2>Horarios Ajustados com sucesso!</h2>
                        <Button variant='contained' onClick={() => {
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