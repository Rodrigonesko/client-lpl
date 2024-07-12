import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import { Container, Typography, Paper, TextField, Grid, Box, Divider, Select, MenuItem, Button, FormControlLabel, Checkbox, Chip } from '@mui/material'
import Toast from '../../../components/Toast/Toast'
import { getCids, getPerguntas } from '../../../_services/teleEntrevista.service'
import { getDadosEntrevistaById, updateDadosEntrevista, updatePropostaEntrevista } from '../../../_services/teleEntrevistaV2.service'
import CidsDeclaracaoSaude from './components/CidsDeclaracaoSaude'

const InputCids = ({ cidsSelecionados = [], setCidsSeleciados, cid }) => {
    console.log(cidsSelecionados);
    const [ano, setAno] = useState(cidsSelecionados?.find(item => item.codigo === cid.subCategoria)?.ano || '')
    const [anosAtras, setAnosAtras] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (anosAtras !== '') {
            setAno((new Date().getFullYear() - anosAtras).toString())
        } else {
            setAno('')
        }
    }, [anosAtras])
    useEffect(() => {
        if (ano.length === 4) {
            setAnosAtras((new Date().getFullYear() - parseInt(ano)).toString())
        }
    }, [ano])
    return (
        <>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                p={1}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label={`${cid.subCategoria} - ${cid.descricao}`}
                    checked={cidsSelecionados.some(item => item.codigo === cid.subCategoria)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            if (ano.length !== 4) {
                                setOpenToast(true)
                                setSeverity('error')
                                setMessage('Preencha o campo ano corretamente')
                                return
                            }
                            setCidsSeleciados([...cidsSelecionados, { ...cid, ano, codigo: cid.subCategoria }])
                        } else {
                            setCidsSeleciados(cidsSelecionados.filter(item => item.codigo !== cid.subCategoria))
                        }
                    }}
                />
                <Box>
                    <TextField
                        InputProps={{
                            sx: {
                                padding: '0px',
                                fontSize: '12px'
                            }
                        }}
                        size='small'
                        label='Ano'
                        value={ano}
                        onChange={(e) => {
                            setAno(e.target.value)
                        }}
                    />
                    <TextField
                        InputProps={{
                            sx: {
                                padding: '0px',
                                fontSize: '12px',
                                width: '60px'
                            }
                        }}
                        placeholder={'Anos'}
                        size="small"
                        value={anosAtras}
                        onChange={(e) => setAnosAtras(e.target.value)}
                    />
                </Box>
            </Box>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

const EditarEntrevista = () => {

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
    const [cids, setCids] = useState([])
    const [cidsList, setCidsList] = useState([])
    const [respostas, setRespostas] = useState({})

    const [cidsDs, setCidsDs] = useState([])

    const buscarPerguntas = async () => {
        try {
            const result = await getPerguntas()
            setPerguntas(result.perguntas)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (item) => {
        try {
            setRespostas({ ...respostas, [item.id]: item.value })
        } catch (error) {
            console.log(error);
        }
    }

    const salvar = async () => {
        try {
            await updateDadosEntrevista({
                _id: id,
                ...respostas,
                cidsAjustados: cids,
                cidsDs: cidsDs,
                houveDivergencia,
            })
            setMessage('Entrevista salva com sucesso!')
            setSeverity("success")
            setOpenToast(true)
            setFlushHook(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao salvar entrevista!')
            setSeverity("error")
            setOpenToast(true)
        }
    }

    const handleSaveInfo = async () => {
        try {
            await updatePropostaEntrevista({
                _id: dadosEntrevista.idProposta._id
            }, {
                nome,
                cpf,
                dataNascimento,
            })
            await updateDadosEntrevista({
                _id: id,
                nome,
                cpf,
                dataNascimento,
            })
            setMessage('Dados atualizados com sucesso!')
            setSeverity("success")
            setOpenToast(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao salvar os dados!')
            setSeverity("error")
            setOpenToast(true)
        }
    }

    const fetchCids = async (cid) => {
        try {
            if (cid.length < 3) return
            const result = await getCids(cid)
            setCidsList(result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFlushHook(false)
        const buscarDadosEntrevista = async () => {
            try {
                const result = await getDadosEntrevistaById(id)
                setDadosEntrevista(result)
                setHouveDivergencia(result.houveDivergencia)
                setDataNascimento(result.dataNascimento)
                setNome(result.nome)
                setCpf(result.cpf)
                setQualDivergencia(result.divergencia)
                setPatologias(result.patologias)
                setCids(result?.cidsAjustados || [])
                setCidsDs(result?.cidsDs || [])
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
                        <Grid item xs={12}>
                            <Button variant='contained' fullWidth onClick={handleSaveInfo}>Salvar Informações</Button>
                        </Grid>
                    </Grid>
                    <Box width={'100%'} m={1} p={1}>
                        <Box width={'100%'}>
                            {
                                perguntas.map(e => {
                                    if (e.formulario === dadosEntrevista.tipoFormulario) {
                                        return (
                                            <Box m={1} key={e._id}>
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
                                {
                                    cids.map(e => {
                                        return (
                                            <Chip
                                                key={e.codigo}
                                                label={`${e.codigo} - ${e.descricao} - ${e.ano}`}
                                                onDelete={() => {
                                                    setCids(cids.filter(c => c.codigo !== e.codigo))
                                                }}
                                            />
                                        )
                                    })
                                }
                                <Typography>CID:</Typography>
                                <TextField
                                    id="cids"
                                    multiline
                                    size='small'
                                    onChange={e => {
                                        fetchCids(e.target.value)
                                    }}
                                    fullWidth
                                    sx={{ marginBottom: '10px' }}
                                />
                                {
                                    cidsList.map((e, index) => {
                                        return (
                                            <InputCids
                                                key={index}
                                                cid={e}
                                                cidsSelecionados={cids}
                                                setCidsSeleciados={setCids}
                                            />
                                        )
                                    })
                                }
                            </Box>
                            {
                                dadosEntrevista?.tipoContrato === 'ADESÃO' && (
                                    <Box>
                                        <Typography
                                            variant='h6'
                                        >
                                            Cids Declaração de Saúde
                                        </Typography>
                                        <CidsDeclaracaoSaude cidsSelecionados={cidsDs} setCidsSeleciados={setCidsDs} />
                                    </Box>
                                )
                            }
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