import { useEffect, useState } from "react";
import { tiposPergunta } from "../../ConfiguracaoQuestionario/utils/tiposPergunta";
import { Box, Collapse, Divider, IconButton, TextField, Typography } from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import RadioGroupComponent from "./RadioGroupComponent";
import ValueComponent from "./ValueComponent";
import OpenComponent from "./OpenComponent";
import OptionsComponent from "./OptionsComponent";
import AddressComponent from "./AddressComponent";

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

export default Pergunta