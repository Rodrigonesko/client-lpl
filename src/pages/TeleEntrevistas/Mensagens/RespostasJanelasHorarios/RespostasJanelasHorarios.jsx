import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Box, Modal, FormControl, InputLabel, Select, MenuItem, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from "@mui/material";
import Axios from 'axios'
import { getCookie } from "react-use-cookie";

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

    const buscarHorarios = async (dia) => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/horariosDisponiveis/${ajustarDia(dia)}`, { withCredentials: true })

            console.log(result);

            setHorariosDisponiveis(result.data)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarAnalistasDisponiveis = async (horario) => {
        try {

            console.log(dataEntrevista, horario);

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/analistasDisponiveis/${ajustarDia(dataEntrevista)}/${horario}`, { withCredentials: true })

            setResponsaveis(result.data)

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

    const atendimentoHumanizado = async (id) => {
        try {

            setLoading(true)

            const result = await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/mandarAtendimentoHumanizado`, {
                id
            }, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            buscarPropostas()
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/janelasEscolhidas`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            setPropostas(result.data)

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {

        const buscarDiasDisponiveis = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/diasDisponiveis`, { withCredentials: true })

                setDatasEntrevista(result.data)
            } catch (error) {
                console.log(error);
            }
        }

        buscarPropostas()
        buscarDiasDisponiveis()

    }, [])

    return (
        <>
            <Sidebar />
            <Box>
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
                                        <TableCell>Tipo Contrato</TableCell>
                                        <TableCell>Data Nascimento</TableCell>
                                        <TableCell>Janela Escolhida</TableCell>
                                        <TableCell>Agendar</TableCell>
                                        <TableCell>Atendimento Humanizado</TableCell>
                                        <TableCell>Conversa</TableCell>
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
                                                    <TableCell>{e.tipoContrato}</TableCell>
                                                    <TableCell>{e.dataNascimento}</TableCell>
                                                    <TableCell>{e.janelaHorario}</TableCell>
                                                    <TableCell><Button size="small" variant="contained" onClick={() => {
                                                        setProposta(e.proposta)
                                                        setNome(e.nome)
                                                        setJanela(e.janelaHorario)
                                                        setId(e._id)
                                                        setModal(true)
                                                    }}>Agendar</Button></TableCell>
                                                    <TableCell><Button size="small" variant="contained" onClick={() => { atendimentoHumanizado(e._id) }} color='secondary'>Atendimento Humanizado</Button></TableCell>
                                                    <TableCell><Button size="small" variant="contained" href={`/entrevistas/chat/${e.whatsapp}`}>Ver Conversa</Button></TableCell>
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
                                <InputLabel id="label-dia">Dia</InputLabel>
                                <Select
                                    defaultValue=''
                                    style={{ minWidth: '100px' }}
                                    labelId="label-dia"
                                    id="select-doa"
                                    label="Dia"
                                    onChange={e => {
                                        buscarHorarios(e.target.value)
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
                                    onChange={e => {
                                        setHorarioEntrevista(e.target.value)
                                        buscarAnalistasDisponiveis(e.target.value)
                                    }}
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
                            <FormControl size="small">
                                <InputLabel id="label-responsavel">Responsável</InputLabel>
                                <Select
                                    labelId="label-responsavel"
                                    id="select-responsavel"
                                    label="Responsável"
                                    style={{ minWidth: '140px' }}
                                    onChange={e => {
                                        setResponsavel(e.target.value)
                                    }}
                                    defaultValue=''
                                >
                                    {
                                        responsaveis.map(e => {
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
            </Box>
        </>
    )
}

export default RespostasJanelasHorarios