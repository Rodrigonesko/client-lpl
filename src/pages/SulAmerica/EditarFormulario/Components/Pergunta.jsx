import { Box, Collapse, Divider, IconButton, TextField, Typography } from "@mui/material";
import { tiposPergunta } from "../../ConfiguracaoQuestionario/utils/tiposPergunta";
import { useEffect, useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import OpenComponent from "./OpenComponent";
import ValueComponent from "./ValueComponent";
import OptionsComponent from "./OptionsComponent";
import AddressComponent from "./AddressComponent";
import RadioGroupComponent from "./RadioGroupComponent";

const questionTypes = tiposPergunta.reduce((obj, tipo) => {
    obj[tipo.toLowerCase()] = tipo.toLowerCase();
    return obj;
}, {});

const Pergunta = ({ pergunta, index, res, catchRespostas, setCatchRespostas, setAllRespostas }) => {

    const [openObs, setOpenObs] = useState(!!res.observacoes || res.observacoes !== '')
    const [resposta, setResposta] = useState(res)
    const [flush, setFlush] = useState(catchRespostas)

    const handleChange = (e) => {
        setResposta({
            ...resposta,
            resposta: e.target.value
        })
    }

    const handleChangeSubPergunta = (e) => {
        const texto = e.target.name
        console.log(texto, e.target.value);
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
        console.log(address, subPergunta, texto);
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
                        <RadioGroupComponent handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} pergunta={question.pergunta ?? question.texto} resposta={question.resposta} />
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
                return <ValueComponent pergunta={question.pergunta ?? question.texto} handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} resposta={question.resposta} />
            case questionTypes.aberta:
                return <OpenComponent pergunta={question.pergunta ?? question.texto} handleChange={question?.subPergunta ? handleChangeSubPergunta : handleChange} resposta={question.resposta} />
            case questionTypes['opções']:
                return <OptionsComponent pergunta={question.pergunta ?? question.texto} options={question.opcoes} handleChange={question.subPergunta ? handleChangeSubPergunta : handleChange} resposta={question.resposta} />
            case questionTypes['endereço']:
                return <AddressComponent pergunta={question.pergunta ?? question.texto} handleChange={handleChangeAddress} subPergunta={question.subPergunta} resposta={JSON.parse(question.resposta)} />
            default:
                return 'Tipo de pergunta não encontrado'
        }
    }

    useEffect(()=>{
        setAllRespostas(prevRespostas => {
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
        <Box>
            <Typography>
                <strong>{index + 1}.</strong> {resposta?.pergunta}
            </Typography>
            {renderQuestion({ ...resposta, opcoes: pergunta?.opcoes })}
            {resposta.tipo !== 'ABERTA' && <Box>
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