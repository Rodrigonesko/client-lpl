import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { createRespostas, getPedidoById, getQuestionarioByName } from "../../../_services/sulAmerica.service"
import { Box, Container, Typography, TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, FormControl, Button, IconButton, Divider, Collapse, createTheme, ThemeProvider } from "@mui/material"
import { tiposPergunta } from "../ConfiguracaoQuestionario/utils/tiposPergunta"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import Title from "../../../components/Title/Title"
import Toast from "../../../components/Toast/Toast"
import { blue, deepOrange, grey } from "@mui/material/colors"
import InfoPrestador from "./Components/InfoPrestador"
import InfoBeneficiario from "./Components/InfoBeneficiario"
import { createPdf } from "../PDF/createPdf"
import axios from "axios"

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: grey[500],
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: deepOrange[500],
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: grey[500],
                    '&.Mui-checked': {
                        color: deepOrange[500],
                    },
                },
            },
        },
    },
});

const questionTypes = tiposPergunta.reduce((obj, tipo) => {
    obj[tipo.toLowerCase()] = tipo.toLowerCase();
    return obj;
}, {});

const RadioGroupComponent = ({ handleChange, pergunta }) => {
    return (
        <RadioGroup
            row
            onChange={handleChange}
            name={pergunta}
        >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="Não" control={<Radio />} label="Não" />
        </RadioGroup>
    )
}

const ValueComponent = ({ pergunta, handleChange }) => {
    return (
        <TextField
            sx={{
                mt: 1
            }}
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            name={pergunta}
            onChange={handleChange}
            placeholder="R$ 0,00"
        />
    )
}

const OpenComponent = ({ pergunta, handleChange }) => {
    return (
        <TextField
            sx={{
                mt: 1
            }}
            fullWidth
            variant="outlined"
            size="small"
            name={pergunta}
            onChange={handleChange}
            placeholder="Resposta"
        />
    )
}

const OptionsComponent = ({ options, handleChange, pergunta }) => {
    return (
        <FormControl
            sx={{
                minWidth: '300px'
            }}
        >
            <Select
                fullWidth
                variant="outlined"
                size="small"
                onChange={handleChange}
                name={pergunta}
                defaultValue={''}
            >
                {
                    options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    ))
                }
                <MenuItem value="Outro">Outro</MenuItem>
            </Select>
        </FormControl>
    )
}

const AddressComponent = ({ handleChange, pergunta }) => {

    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        numero: ''
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                if (cep.length !== 8) return
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                setEndereco({ ...data, numero: '' })
            } catch (error) {
                console.log(error)
            }
        }

        fetch()
    }, [cep])

    return (
        <Box>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="CEP"
                onChange={(e) => {
                    handleChange(e)
                    setCep(e.target.value)
                }}
                name={pergunta}
                type="number"
            />
            <Box
                mt={1}
                display={'flex'}
                gap={1}
                flexWrap={'wrap'}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Endereço"
                    name={pergunta}
                    value={endereco.logradouro}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Bairro"
                    name={pergunta}
                    value={endereco.bairro}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Cidade"
                    name={pergunta}
                    value={endereco.localidade}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="UF"
                    name={pergunta}
                    value={endereco.uf}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Número"
                    name={pergunta}
                    value={endereco.numero}
                />
            </Box>
        </Box>
    )
}

const Pergunta = ({ pergunta, index, catchRespostas, setRespostas }) => {

    const [resposta, setResposta] = useState({ pergunta: pergunta.pergunta, resposta: '', categoria: pergunta.categoria, tipo: pergunta.tipo, observacoes: '', subPerguntas: pergunta.subPerguntas })
    const [openObs, setOpenObs] = useState(false)

    const handleChange = (e) => {
        setResposta({
            ...resposta,
            resposta: e.target.value
        })
    }

    const handleChangeSubPergunta = (e) => {
        const texto = e.target.name
        setResposta({
            ...resposta,
            subPerguntas: resposta.subPerguntas.map(subPergunta => {
                if (subPergunta.texto === texto) {
                    return {
                        ...subPergunta,
                        resposta: e.target.value
                    }
                }
                return subPergunta
            })
        })
    }

    const handleChangeObservacoes = (e) => {
        setResposta({
            ...resposta,
            observacoes: e.target.value
        })
    }

    const renderQuestion = (question) => {
        switch (question.tipo.toLowerCase()) {
            case questionTypes.escolha:
                return (
                    <>
                        <RadioGroupComponent handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} pergunta={question.pergunta ?? question.texto} />
                        <Collapse
                            in={resposta.resposta === 'Sim'}
                            timeout="auto"
                            unmountOnExit
                            mountOnEnter
                        >
                            {question.subPerguntas.filter(subPergunta => {
                                return subPergunta.condicao === 'Sim'
                            }).map((subPergunta) => {
                                return (
                                    <Box key={subPergunta.texto}>
                                        <Typography>
                                            {subPergunta.texto}
                                        </Typography>
                                        {renderQuestion({ ...subPergunta, subPergunta: true })}
                                    </Box>
                                )
                            })}
                        </Collapse>
                        <Collapse
                            in={resposta.resposta === 'Não'}
                            timeout="auto"
                            unmountOnExit
                            mountOnEnter
                        >
                            {question.subPerguntas.filter(subPergunta => {
                                return subPergunta.condicao === 'Não'
                            }).map((subPergunta) => {
                                return (
                                    <Box key={subPergunta.texto}>
                                        <Typography>
                                            {subPergunta.texto}
                                        </Typography>
                                        {renderQuestion({ ...subPergunta, subPergunta: true })}
                                    </Box>
                                )
                            })}
                        </Collapse>
                    </>
                )
            case questionTypes.valor:
                return <ValueComponent pergunta={question.pergunta ?? question.texto} handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} />
            case questionTypes.aberta:
                return <OpenComponent pergunta={question.pergunta ?? question.texto} handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} />
            case questionTypes['opções']:
                return <OptionsComponent pergunta={question.pergunta ?? question.texto} options={question.opcoes} handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} />
            case questionTypes['endereço']:
                return <AddressComponent pergunta={question.pergunta ?? question.texto} handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} />
            default:
                return 'Tipo de pergunta não encontrado'
        }
    }

    useEffect(() => {
        setRespostas(prevRespostas => {
            const newRespostas = [...prevRespostas]
            const index = newRespostas.findIndex(r => r.pergunta === pergunta.pergunta)
            if (index !== -1) {
                newRespostas[index] = resposta
            } else {
                newRespostas.push(resposta)
            }
            return newRespostas
        })
    }, [catchRespostas])

    return (
        <Box
            mt={2}
        >
            <Typography>
                <strong>{index + 1}.</strong> {pergunta.pergunta}
            </Typography>
            {renderQuestion(pergunta)}
            {pergunta.tipo !== 'ABERTA' && <Box>
                Observações
                {
                    openObs ? (
                        <IconButton
                            onClick={() => setOpenObs(!openObs)}
                        >
                            <ArrowDropUp />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => setOpenObs(!openObs)}
                        >
                            <ArrowDropDown />
                        </IconButton>
                    )
                }

                <Collapse
                    in={openObs}
                    timeout="auto"
                    unmountOnExit
                    mountOnEnter
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChangeObservacoes}
                        value={resposta.observacoes}
                        multiline
                        rows={2}
                        placeholder="Observações"
                    />
                </Collapse>


            </Box>}
            <Divider sx={{ m: 2 }} />
        </Box>
    )
}

const FormularioSulAmerica = () => {

    const { id } = useParams()

    const [pedido, setPedido] = useState()
    const [prestador, setPrestador] = useState()
    const [beneficiario, setBeneficiario] = useState()
    const [formulario, setFormulario] = useState({
        nome: '',
        perguntas: []
    })
    const [respostas, setRespostas] = useState([])
    const [loading, setLoading] = useState(true)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [catchRespostas, setCatchRespostas] = useState(false)

    const handleSend = async () => {
        setCatchRespostas(!catchRespostas)

    }

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await getPedidoById(id)
                setPedido(response)
                setPrestador(response.prestador)
                setBeneficiario(response.beneficiario)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setOpenToast(true)
                setMessage('Erro ao buscar pedido')
                setSeverity('error')
            }
        }

        const fetchFormulario = async () => {
            try {
                const response = await getQuestionarioByName('Sindicância Script TEA')
                setFormulario(response)
            } catch (error) {
                console.log(error)
                setOpenToast(true)
                setMessage('Erro ao buscar formulario')
                setSeverity('error')
            }
        }

        fetchFormulario()
        fetchPedido()
    }, [id])

    useEffect(() => {
        const sendRespostas = async () => {
            try {
                for (const resposta of respostas) {
                    if (resposta.resposta === '') {
                        setOpenToast(true)
                        setMessage(`Preencha a pergunta: ${resposta.pergunta} | Categoria: ${resposta.categoria}`)
                        setSeverity('error')
                        return
                    }
                    for (const subResposta of resposta.subPerguntas) {
                        if (subResposta.resposta === '' && resposta.resposta === subResposta.condicao) {
                            setOpenToast(true)
                            setMessage(`Preencha a sub pergunta: ${subResposta.texto} | Categoria: ${resposta.categoria} | Pergunta: ${resposta.pergunta}`)
                            setSeverity('error')
                            return
                        }
                    }
                }
                const resposta = await createRespostas({
                    pedido: pedido._id,
                    respostas
                })
                console.log({
                    ...resposta,
                    pedido
                });
                setMessage('Formulario enviado com sucesso')
                setSeverity('success')
                setOpenToast(true)
                createPdf({
                    ...resposta,
                    pedido
                })

            } catch (error) {
                console.log(error)
                setOpenToast(true)
                setMessage('Erro ao enviar formulario')
                setSeverity('error')
            }
        }
        if (pedido) {
            sendRespostas()
        }

    }, [respostas])

    return (
        <Sidebar>
            <ThemeProvider theme={theme}>
                <Box
                    color={blue[900]}
                    bgcolor={grey[50]}
                >
                    <Container>
                        <InfoBeneficiario beneficiario={beneficiario} pedido={pedido} loading={loading} />
                        <Divider sx={{
                            bgcolor: deepOrange[400],
                            width: '99%',
                            margin: 'auto',
                            mt: 1
                        }} />
                        <InfoPrestador prestador={prestador} loading={loading} />
                        <Divider sx={{
                            bgcolor: deepOrange[400],
                            width: '99%',
                            margin: 'auto',
                            mt: 1
                        }} />
                        <Box>
                            <Title
                                size={'small'}
                                lineColor={deepOrange[500]}
                            >
                                PERFIL E CONTRATAÇÃO
                            </Title>
                            <Box>
                                {formulario.perguntas.filter(pergunta => {
                                    return pergunta.pergunta.categoria === 'PERFIL E CONTRATAÇÃO'
                                }).sort((a, b) => {
                                    return a.pergunta.posicao - b.pergunta.posicao
                                }).map((pergunta, index) => (
                                    <Pergunta key={index} pergunta={pergunta.pergunta} index={index} setRespostas={setRespostas} catchRespostas={catchRespostas} respostas={respostas} />
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Title
                                size={'small'}
                                lineColor={deepOrange[500]}
                            >
                                TRATAMENTO
                            </Title>
                            <Box>
                                {formulario.perguntas.filter(pergunta => {
                                    return pergunta.pergunta.categoria === 'TRATAMENTO'
                                }).sort((a, b) => {
                                    return a.pergunta.posicao - b.pergunta.posicao
                                }).map((pergunta, index) => (
                                    <Pergunta key={index} pergunta={pergunta.pergunta} index={index} setRespostas={setRespostas} catchRespostas={catchRespostas} respostas={respostas} />
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Title
                                size={'small'}
                                lineColor={deepOrange[500]}
                            >
                                ACOMPANHAMENTO TERAPÊUTICO E DESFECHO
                            </Title>
                            <Box>
                                {formulario.perguntas.filter(pergunta => {
                                    return pergunta.pergunta.categoria === 'ACOMPANHAMENTO TERAPÊUTICO E DESFECHO'
                                }).sort((a, b) => {
                                    return a.pergunta.posicao - b.pergunta.posicao
                                }).map((pergunta, index) => (
                                    <Pergunta key={index} pergunta={pergunta.pergunta} index={index} setRespostas={setRespostas} catchRespostas={catchRespostas} respostas={respostas} />
                                ))}
                            </Box>
                        </Box>
                        <Box
                            m={4}
                            display="flex"
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={handleSend}
                                sx={{
                                    backgroundColor: deepOrange[500],
                                    '&:hover': {
                                        backgroundColor: deepOrange[700]
                                    }
                                }}
                            >
                                Enviar
                            </Button>
                        </Box>
                        <Toast
                            open={openToast}
                            message={message}
                            severity={severity}
                            onClose={() => setOpenToast(false)}
                        />
                    </Container>
                </Box>
            </ThemeProvider>

        </Sidebar>
    )
}

export default FormularioSulAmerica