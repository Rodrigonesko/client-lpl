import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useContext, useEffect, useState } from "react"
import { createRespostas, getPedidoById, getQuestionarioByName } from "../../../_services/sulAmerica.service"
import { Box, Container, Typography, Button, Divider, createTheme, ThemeProvider, Alert } from "@mui/material"
import Title from "../../../components/Title/Title"
import Toast from "../../../components/Toast/Toast"
import { blue, deepOrange, grey } from "@mui/material/colors"
import InfoPrestador from "./Components/InfoPrestador"
import InfoBeneficiario from "./Components/InfoBeneficiario"
import { createPdf } from "../PDF/createPdf"
import moment from "moment"
import AuthContext from "../../../context/AuthContext"
import Pergunta from "./Components/Pergunta"

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
            (pedido?.beneficiario?.carteiraEmpresa === 'ADESAO' || pedido?.beneficiario?.carteiraEmpresa === 'PME') &&
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
                    pedido: {
                        ...pedido,
                        beneficiario,
                        prestador
                    }
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