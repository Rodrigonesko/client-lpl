import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
import { blue, deepOrange, grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { getPedidoById, getQuestionarioByName } from "../../../_services/sulAmerica.service";
import Toast from "../../../components/Toast/Toast";
import Pergunta from "./Components/Pergunta";
import Title from "../../../components/Title/Title";

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

const EditFormulario = () => {

    const { id } = useParams();

    const [pedido, setPedido] = useState()
    const [formulario, setFormulario] = useState()
    const [loading, setLoading] = useState(true)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [respostas, setRespostas] = useState([])
    const [catchRespostas, setCatchRespostas] = useState(false)

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
                setRespostas(response.resposta.respostas)
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

    return (
        <Sidebar>
            <ThemeProvider theme={theme}>
                <Box
                    color={blue[900]}
                    bgcolor={grey[50]}
                >
                    <Container>
                        <h1>Editar Formulário</h1>
                        {
                            loading ? <h1>Carregando...</h1> : (
                                <>
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
                                                        <Pergunta key={pergunta._id} pergunta={pergunta.pergunta} resposta={
                                                            respostas.find(resposta => {
                                                                return resposta.pergunta === pergunta.pergunta.pergunta
                                                            })}
                                                            index={index}
                                                        />))}
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
                                                        <Pergunta key={pergunta._id} pergunta={pergunta.pergunta} resposta={
                                                            respostas.find(resposta => {
                                                                return resposta.pergunta === pergunta.pergunta.pergunta
                                                            })}
                                                            index={index}
                                                        />
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
                                                        <Pergunta key={pergunta._id} pergunta={pergunta.pergunta} resposta={
                                                            respostas.find(resposta => {
                                                                return resposta.pergunta === pergunta.pergunta.pergunta
                                                            })}
                                                            index={index}
                                                        />))}
                                                </Box>
                                            </Box>
                                        </>}
                                </>
                            )
                        }
                    </Container>
                </Box>
            </ThemeProvider>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </Sidebar>
    )
}

export default EditFormulario;