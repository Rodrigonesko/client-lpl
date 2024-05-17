import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ThemeProvider, createTheme } from "@mui/material";
import { blue, deepOrange, grey, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { getPedidoById, getQuestionarioByName, updatePedido, updateRespostas } from "../../../_services/sulAmerica.service";
import Toast from "../../../components/Toast/Toast";
import Pergunta from "./Components/Pergunta";
import Title from "../../../components/Title/Title";
import { createPdf } from "../PDF/createPdf";
import { Download } from "@mui/icons-material";

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
    const [divergencia, setDivergencia] = useState(false)

    const handleSend = () => {
        setCatchRespostas(!catchRespostas)
    }

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
                        if (!subResposta.resposta && resposta.resposta === subResposta.condicao) {
                            setOpenToast(true)
                            setMessage(`Preencha a sub pergunta: ${subResposta.texto} | Categoria: ${resposta.categoria} | Pergunta: ${resposta.pergunta}`)
                            setSeverity('error')
                            return
                        }
                    }
                }
                await updateRespostas(pedido.resposta._id, { respostas })
                await updatePedido(id, { divergencia })
                setMessage('Formulario enviado com sucesso')
                setSeverity('success')
                setOpenToast(true)
                // createPdf({
                //     ...resposta,
                //     pedido: {
                //         ...pedido
                //     }
                // })
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

    const verifyFirstQuestion = (index) => {
        if (index !== 0) return true
        const res = (index === 0 &&
            (pedido?.beneficiario?.carteiraEmpresa === 'ADESAO' || pedido?.beneficiario?.carteiraEmpresa === 'PME') &&
            new Date(pedido?.beneficiario?.dataInicioVigencia).getFullYear() >= 2022)

        return res
    }

    const verifyFifthQuestion = (index) => {
        if (index !== 4) return true
        return (index === 4 && (pedido?.beneficiario?.carteiraEmpresa === 'ADESAO' || pedido?.beneficiario?.carteiraEmpresa === 'PME'))
    }


    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await getPedidoById(id)
                setPedido(response)
                setRespostas(response.resposta.respostas)
                setDivergencia(response.divergencia)
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
                                        (pedido && formulario) && <>
                                            <Box>
                                                <Title
                                                    size={'small'}
                                                    lineColor={deepOrange[500]}
                                                >
                                                    PERFIL E CONTRATAÇÃO
                                                </Title>
                                                <Box>
                                                    {formulario?.perguntas.filter((pergunta, index) => {
                                                        return pergunta.pergunta.categoria === 'PERFIL E CONTRATAÇÃO' && verifyFirstQuestion(index) && verifyFifthQuestion(index)
                                                    }).sort((a, b) => {
                                                        return a.pergunta.posicao - b.pergunta.posicao
                                                    }).map((pergunta, index) => (
                                                        <Pergunta key={pergunta._id} pergunta={pergunta.pergunta} res={
                                                            respostas.find(resposta => {
                                                                return resposta.pergunta === pergunta.pergunta.pergunta
                                                            })}
                                                            index={index}
                                                            catchRespostas={catchRespostas}
                                                            setCatchRespostas={setCatchRespostas}
                                                            setAllRespostas={setRespostas}
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
                                                        <Pergunta key={pergunta._id} pergunta={pergunta.pergunta} res={
                                                            respostas.find(resposta => {
                                                                return resposta.pergunta === pergunta.pergunta.pergunta
                                                            })}
                                                            index={index}
                                                            catchRespostas={catchRespostas}
                                                            setCatchRespostas={setCatchRespostas}
                                                            setAllRespostas={setRespostas}
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
                                                        <Pergunta key={pergunta._id} pergunta={pergunta.pergunta} res={
                                                            respostas.find(resposta => {
                                                                return resposta.pergunta === pergunta.pergunta.pergunta
                                                            })}
                                                            index={index}
                                                            catchRespostas={catchRespostas}
                                                            setCatchRespostas={setCatchRespostas}
                                                            setAllRespostas={setRespostas}
                                                        />))}
                                                </Box>
                                            </Box>
                                        </>}
                                </>
                            )
                        }
                        <FormControl>
                            <FormLabel>Houve divergência</FormLabel>
                            <RadioGroup
                                value={divergencia}
                                onChange={e => setDivergencia(e.target.value === 'true' ? true : false)}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                            </RadioGroup>
                        </FormControl>
                        <Box
                            display="flex"
                            justifyContent="center"
                            m={2}
                        >
                            <Button
                                onClick={handleSend}
                                variant="contained"
                                sx={{
                                    backgroundColor: deepOrange[500],
                                    color: grey[50],
                                    '&:hover': {
                                        backgroundColor: deepOrange[700]
                                    }
                                }}

                            >
                                Salvar
                            </Button>
                            <Button
                                onClick={() => createPdf({
                                    respostas,
                                    pedido
                                })}
                                variant="contained"
                                sx={{
                                    backgroundColor: red[500],
                                    color: grey[50],
                                    '&:hover': {
                                        backgroundColor: red[700]
                                    },
                                    ml: 2
                                }}
                                endIcon={<Download />}
                            >
                                PDF
                            </Button>
                        </Box>
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