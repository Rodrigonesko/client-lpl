import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Box, Modal, FormControl, InputLabel, Select, MenuItem, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from "@mui/material";
import Axios from 'axios'
import config from "../../../../config/axiosHeader";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RespostasJanelasHorarios = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [proposta, setProposta] = useState('')
    const [nome, setNome] = useState('')
    const [janela, setJanela] = useState('')
    const [id, setId] = useState('')
    const [responsaveis, setResponsaveis] = useState([])
    const [responsavel, setResponsavel] = useState('')
    const [datasEntrevista, setDatasEntrevista] = useState([])
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [dataEntrevista, setDataEntrevista] = useState('')
    const [horarioEntrevista, setHorarioEntrevista] = useState('')

    const ajustarDia = (data) => {
        const arr = data.split('/')

        return `${arr[2]}-${arr[1]}-${arr[0]}`
    }

    const searchDataDisp = async (responsavel) => {
        try {

            setResponsavel(responsavel)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarDiasDisponiveis/${responsavel}`, { withCredentials: true })

            setDatasEntrevista(result.data.dias)

        } catch (error) {
            console.log(error);
        }
    }

    const searchHorariosDisp = async (dia) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscarHorariosDisponiveis/${responsavel}/${ajustarDia(dia)}`, { withCredentials: true })

            setHorariosDisponiveis(result.data.horarios)

        } catch (error) {
            console.log(error);
        }
    }

    const agendar = async () => {
        try {

            setLoading(true)

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/agendar`, { id, responsavel, data: dataEntrevista, horario: horarioEntrevista }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        const buscarPropostas = async () => {
            try {

                setLoading(true)

                const result = await Axios.get(`http://10.0.121.55:3002/janelasEscolhidas`, {
                    withCredentials: true,
                    headers: config.headers
                })

                setPropostas(result.data)

                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        const buscarResponsaveis = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

                setResponsaveis(result.data.enfermeiros)

            } catch (error) {
                console.log(error);
            }
        }

        buscarPropostas()
        buscarResponsaveis()

    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant="h5">
                        Janela de Horário: {propostas.length}
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                        ) : null
                    }
                    <Box>
                        <TableContainer>
                            <Table className="table">
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell>Proposta</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Cpf Titular</TableCell>
                                        <TableCell>Tipo Associado</TableCell>
                                        <TableCell>Janela Escolhida</TableCell>
                                        <TableCell>Agendar</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        propostas.map(e => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{e.proposta}</TableCell>
                                                    <TableCell>{e.nome}</TableCell>
                                                    <TableCell>{e.cpfTitular}</TableCell>
                                                    <TableCell>{e.tipoAssociado}</TableCell>
                                                    <TableCell>{e.janelaHorario}</TableCell>
                                                    <TableCell><Button size="small" variant="contained" onClick={() => {
                                                        setProposta(e.proposta)
                                                        setNome(e.nome)
                                                        setJanela(e.janelaHorario)
                                                        setId(e._id)
                                                        setModal(true)
                                                    }}>Agendar</Button></TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
                <Modal
                    open={modal}
                    onClose={() => { setModal(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {proposta} - {nome} - {janela}
                        </Typography>
                        <Box display='flex' justifyContent='space-around' alignItems='center' m={3}>
                            <FormControl size="small">
                                <InputLabel id="label-responsavel">Responsável</InputLabel>
                                <Select
                                    labelId="label-responsavel"
                                    id="select-responsavel"
                                    label="Responsável"
                                    style={{ minWidth: '140px' }}
                                    onChange={e => {
                                        searchDataDisp(e.target.value)
                                    }}
                                    defaultValue=''
                                >
                                    {
                                        responsaveis.map(e => {
                                            return (
                                                <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <FormControl size="small">
                                <InputLabel id="label-dia">Dia</InputLabel>
                                <Select
                                    defaultValue=''
                                    style={{ minWidth: '100px' }}
                                    labelId="label-dia"
                                    id="select-doa"
                                    label="Dia"
                                    onChange={e => {
                                        searchHorariosDisp(e.target.value)
                                        setDataEntrevista(e.target.value)
                                    }}
                                >
                                    {
                                        datasEntrevista.map(e => {
                                            return (
                                                <MenuItem key={e} value={e}>{e}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl size="small" >
                                <InputLabel id="label-horario">Horário</InputLabel>
                                <Select
                                    defaultValue=''
                                    style={{ minWidth: '100px' }}
                                    labelId="label-horario"
                                    id="select-horario"
                                    label="Horario"
                                    onChange={e => setHorarioEntrevista(e.target.value)}
                                >
                                    {
                                        horariosDisponiveis.map(e => {
                                            return (
                                                <MenuItem key={e} value={e}>{e}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={agendar}>Agendar</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </>
    )
}

export default RespostasJanelasHorarios