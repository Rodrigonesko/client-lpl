import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { createRespostas, getPedidoById, getQuestionarioByName } from "../../../_services/sulAmerica.service"
import { Box, Container, Typography, TextField, RadioGroup, Radio, FormControlLabel, Select, MenuItem, FormControl, Button, IconButton, Divider, Collapse } from "@mui/material"
import { tiposPergunta } from "../ConfiguracaoQuestionario/utils/tiposPergunta"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material"
import Title from "../../../components/Title/Title"
import Toast from "../../../components/Toast/Toast"

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
    return (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="CEP"
            onChange={handleChange}
            name={pergunta}
        />
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
        console.log(catchRespostas);
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
    const [refresh, setRefresh] = useState(false)
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
                console.log(response);
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
    }, [refresh, id])

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

                const response = await createRespostas({
                    pedido: pedido._id,
                    respostas
                })

                console.log(response);


                setMessage('Formulario enviado com sucesso')
                setSeverity('success')
                setOpenToast(true)

            } catch (error) {
                console.log(error)
                setOpenToast(true)
                setMessage('Erro ao enviar formulario')
                setSeverity('error')
            }
        }
        sendRespostas()
    }, [respostas])

    return (
        <Sidebar>
            <Container>
                <Box>
                    Informações do beneficiario
                </Box>
                <Box>
                    Informações do prestador
                </Box>
                <Box>
                    <Title
                        size={'small'}
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
        </Sidebar>
    )
}

export default FormularioSulAmerica