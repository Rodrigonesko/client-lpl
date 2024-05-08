import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useContext, useEffect, useState } from "react"
import { createRespostas, getPedidoById, getQuestionarioByName } from "../../../_services/sulAmerica.service"
import { Box, Container, Typography, TextField, Button, IconButton, Divider, Collapse, createTheme, ThemeProvider, Alert } from "@mui/material"
import { tiposPergunta } from "../ConfiguracaoQuestionario/utils/tiposPergunta"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import Title from "../../../components/Title/Title"
import Toast from "../../../components/Toast/Toast"
import { blue, deepOrange, grey } from "@mui/material/colors"
import InfoPrestador from "./Components/InfoPrestador"
import InfoBeneficiario from "./Components/InfoBeneficiario"
import { createPdf } from "../PDF/createPdf"
import AddressComponent from "./Components/AddressComponent"
import OptionsComponent from "./Components/OptionsComponent"
import OpenComponent from "./Components/OpenComponent"
import ValueComponent from "./Components/ValueComponent"
import RadioGroupComponent from "./Components/RadioGroupComponent"
import moment from "moment"
import AuthContext from "../../../context/AuthContext"

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

    const handleChangeAddress = (address, subPergunta, texto) => {
        if (subPergunta) {
            setResposta({
                ...resposta,
                subPerguntas: resposta.subPerguntas.map(subPergunta => {
                    if (subPergunta.texto === texto) {
                        return {
                            ...subPergunta,
                            resposta: address
                        }
                    }
                    return subPergunta
                })
            })
        } else {
            setResposta({
                ...resposta,
                resposta: address
            })
        }
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
                return <AddressComponent pergunta={question.pergunta ?? question.texto} handleChange={handleChangeAddress} subPergunta={question.subPergunta} />
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
    const { name } = useContext(AuthContext)

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

    const verifyFirstQuestion = (index) => {
        if (index !== 0) return true
        const res = (index === 0 &&
            (pedido?.beneficiario?.carteiraEmpresa !== 'ADESAO' || pedido?.beneficiario?.carteiraEmpresa !== 'PME') &&
            new Date(pedido?.beneficiario?.dataInicioVigencia).getFullYear() >= 2022)

        return res
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
            console.log(respostas);
            try {
                for (const resposta of respostas) {
                    if (resposta.resposta === '') {
                        setOpenToast(true)
                        setMessage(`Preencha a pergunta: ${resposta.pergunta} | Categoria: ${resposta.categoria}`)
                        setSeverity('error')
                        return
                    }
                    for (const subResposta of resposta.subPerguntas) {
                        console.log(subResposta);
                        if (!subResposta.resposta && resposta.resposta === subResposta.condicao) {
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
                        <Alert
                            severity="info"
                            sx={{
                                mt: 2
                            }}
                        >
                            <Typography>
                                Bom dia/Tarde, sou a {name.split(' ')[0]} da Equipe de qualidade e Direcionamento de rede Sul América, poderia falar com o(a) responsável pelo(a) {pedido?.beneficiario?.nome}? Sr(a) pode falar no momento?
                            </Typography>
                            <Typography>
                                Se não - verificar melhor horário e agendar
                            </Typography>
                            <Typography>
                                Se sim - continuar
                            </Typography>
                            <Typography>
                                Hoje é dia {moment().format('DD/MM/YYYY')} e {moment().format('HH:mm')} e informamos que esta ligação será gravada e arquivada. Vamos iniciar
                            </Typography>
                        </Alert>
                        {

                            pedido && <>
                                <Box>
                                    <Title
                                        size={'small'}
                                        lineColor={deepOrange[500]}
                                    >
                                        PERFIL E CONTRATAÇÃO
                                    </Title>
                                    <Box>
                                        {formulario.perguntas.filter((pergunta, index) => {
                                            return pergunta.pergunta.categoria === 'PERFIL E CONTRATAÇÃO' && verifyFirstQuestion(index)
                                        }).sort((a, b) => {
                                            return a.pergunta.posicao - b.pergunta.posicao
                                        }).map((pergunta, index) => (
                                            <Pergunta key={index} pergunta={pergunta.pergunta} index={index} setRespostas={setRespostas} catchRespostas={catchRespostas} respostas={respostas} pedido={pedido} />
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
                                            <Pergunta key={index} pergunta={pergunta.pergunta} index={index} setRespostas={setRespostas} catchRespostas={catchRespostas} respostas={respostas} pedido={pedido} />
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
                                            <Pergunta key={index} pergunta={pergunta.pergunta} index={index} setRespostas={setRespostas} catchRespostas={catchRespostas} respostas={respostas} pedido={pedido} />
                                        ))}
                                    </Box>
                                </Box>
                            </>}
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