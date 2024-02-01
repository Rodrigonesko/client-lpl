import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import './EditarEntrevista.css'
import { Container, Typography, Paper, TextField, Grid, Box, Divider, Select, MenuItem, Button } from '@mui/material'
import Toast from '../../../components/Toast/Toast'

const EditarEntrevista = () => {

    // let respostas = {

    // }

    const { id } = useParams()
    const [perguntas, setPerguntas] = useState([])
    const [dadosEntrevista, setDadosEntrevista] = useState({})
    const [houveDivergencia, setHouveDivergencia] = useState('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const [flushHook, setFlushHook] = useState(false)
    const [qualDivergencia, setQualDivergencia] = useState('')
    const [patologias, setPatologias] = useState('')
    const [cids, setCids] = useState('')
    const [respostas, setRespostas] = useState({})

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPerguntas(result.data.perguntas)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (item) => {
        try {
            // respostas[`${item.id}`] = item.value
            setRespostas({ ...respostas, [item.id]: item.value })
        } catch (error) {
            console.log(error);
        }
    }

    const salvar = async () => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/editar/dadosEntrevista`, { dados: respostas, id, houveDivergencia, dataNascimento, nome, cpf }, {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (result.status === 200) {
                setMessage('Entrevista salva com sucesso!')
                setSeverity("success")
                setOpenToast(true)
                setFlushHook(true)
            }
        } catch (error) {
            console.log(error);
            setMessage('Erro ao salvar entrevista!')
            setSeverity("error")
            setOpenToast(true)
        }
    }

    useEffect(() => {
        setFlushHook(false)
        const buscarDadosEntrevista = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/buscar/dadosEntrevista/${id}`, {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setDadosEntrevista(result.data.proposta)
                setHouveDivergencia(result.data.proposta.houveDivergencia)
                setDataNascimento(result.data.proposta.dataNascimento)
                setNome(result.data.proposta.nome)
                setCpf(result.data.proposta.cpf)
                setQualDivergencia(result.data.proposta.divergencia)
                setPatologias(result.data.proposta.patologias)
                setCids(result.data.proposta.cids)

            } catch (error) {
                console.log(error);
            }
        }
        buscarPerguntas()
        buscarDadosEntrevista()
    }, [id, flushHook])

    return (
        <>
            <Sidebar>
                <Container sx={{ mb: 2 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        Editar Entrevista
                    </Typography>
                    <Grid container spacing={3} component={Paper} m={1} p={1}>
                        <Grid item xs={12}>
                            <Typography>Data Entrevista: {moment(dadosEntrevista.createdAt).format('DD/MM/YYYY')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='standard' size='small' label="Nome" value={nome} onChange={e => setNome(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='standard' size='small' label="CPF" value={cpf} onChange={e => setCpf(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Proposta: {dadosEntrevista.proposta}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant='standard' size='small' label="Data Nascimento" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} fullWidth />
                        </Grid>
                    </Grid>
                    <Box width={'100%'} m={1} p={1}>
                        <Box width={'100%'}>
                            {
                                perguntas.map(e => {
                                    if (e.formulario === dadosEntrevista.tipoFormulario) {
                                        return (
                                            <Box m={1}>
                                                <Typography m={1}>{e.pergunta}</Typography>
                                                <TextField
                                                    id={e.name}
                                                    placeholder={e.pergunta}
                                                    multiline
                                                    size='small'
                                                    defaultValue={dadosEntrevista[e.name]}
                                                    onChange={(e) => { handleChange(e.target) }}
                                                    fullWidth
                                                    sx={{ marginBottom: '10px' }}
                                                />
                                                <Divider />
                                            </Box>

                                        )
                                    }

                                    return null
                                })
                            }
                        </Box>
                        <Box width={'100%'}>
                            <Box m={1}>
                                <Typography variant="h6">Identificação de divergências</Typography>
                            </Box>
                            <Box m={1}>
                                <Typography>Houve Divergência?</Typography>
                                <Select
                                    onChange={e => setHouveDivergencia(e.target.value)}
                                    value={houveDivergencia}
                                >
                                    <MenuItem value="Não">Não</MenuItem>
                                    <MenuItem value="Sim">Sim</MenuItem>
                                </Select>
                            </Box>
                            <Box m={1}>
                                <Typography>Qual divergência?</Typography>
                                <TextField
                                    id="divergencia"
                                    multiline
                                    size='small'
                                    value={qualDivergencia}
                                    onChange={e => {
                                        setQualDivergencia(e.target.value)
                                        handleChange(e.target)
                                    }}
                                    fullWidth
                                    sx={{ marginBottom: '10px' }}
                                />
                            </Box>
                            <Box m={1}>
                                <Typography>Por que o beneficiario não informou na ds essas patologias?</Typography>
                                <TextField
                                    id="patologias"
                                    multiline
                                    size='small'
                                    value={patologias}
                                    onChange={e => {
                                        setPatologias(e.target.value)
                                        handleChange(e.target)
                                    }}
                                    fullWidth
                                    sx={{ marginBottom: '10px' }}
                                />
                            </Box>
                            <Box m={1}>
                                <Typography>CID:</Typography>
                                <TextField
                                    id="cids"
                                    multiline
                                    size='small'
                                    value={cids}
                                    onChange={e => {
                                        setCids(e.target.value)
                                        handleChange(e.target)
                                    }}
                                    fullWidth
                                    sx={{ marginBottom: '10px' }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Button variant='contained' fullWidth onClick={salvar}>Salvar</Button>
                    </Box>
                    <Toast
                        open={openToast}
                        onClose={() => setOpenToast(false)}
                        severity={severity}
                        message={message}
                    />
                </Container>
            </Sidebar>
        </>
    )
}

export default EditarEntrevista