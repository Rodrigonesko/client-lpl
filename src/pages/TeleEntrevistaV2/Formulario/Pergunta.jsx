import { useEffect, useState } from "react";
import { Box, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, Alert } from "@mui/material";

const perguntaAutismo = 'O(A) Sr(a) está ou já esteve em processo de investigação do espectro do autismo, doença de Parkinson, Alzheimer, demência, esclerose múltipla, lúpus?'

const prcs = [
    '600', '603', '604', '606', '607', '608', '609', '610'
]

const Pergunta = ({
    pergunta,
    index,
    setRespostas,
    respostas,
    setImc,
    setAutismo,
    autismo,
    grupoCarencia
}) => {
    const [diagnosticoAutismo, setDiagnosticoAutismo] = useState('')
    const [copart, setCopart] = useState(false)

    const indexResposta = respostas.findIndex(item => item.pergunta === pergunta.texto)

   useEffect(() => {
        if (indexResposta === -1) {
            setRespostas(prevRespostas => [...prevRespostas, {
                pergunta: pergunta.texto,
                resposta: '',
                categoria: pergunta.categoria,
                observacao: '',
                subPerguntas: []
            }])
        }
    }, [indexResposta, pergunta.texto, pergunta.categoria, setRespostas])

    const handleResponderPegunta = (e) => {
        const { value } = e.target
        const newRespostas = [...respostas]
        newRespostas[indexResposta] = {
            pergunta: pergunta.texto,
            resposta: value,
            categoria: pergunta.categoria,
            observacao: respostas[indexResposta]?.observacao || '',
            subPerguntas: respostas[indexResposta]?.subPerguntas || []
        }
        if (pergunta.texto === 'Qual é a sua altura?' || pergunta.texto === 'Qual é o seu peso?') {
            if (pergunta.texto === 'Qual é a sua altura?') {
                const altura = parseFloat(value)
                const peso = parseFloat(respostas.find(item => item.pergunta === 'Qual é o seu peso?')?.resposta)
                if (peso) {
                    const imc = peso / ((altura) * (altura))
                    console.log(imc);
                    setImc(imc)
                }
            }
            if (pergunta.texto === 'Qual é o seu peso?') {
                const peso = parseFloat(value)
                const altura = parseFloat(respostas.find(item => item.pergunta === 'Qual é a sua altura?')?.resposta)
                if (altura) {
                    const imc = peso / ((altura) * (altura))
                    console.log(imc);
                    setImc(imc)
                }
            }
        }

        setRespostas(newRespostas)
    }

    return (
        <Box
            mt={2}
            key={index}
        >
            <Typography variant="body1">
                {index + 1}. {pergunta.texto}
            </Typography>
            {
                pergunta.tipo === 'Escolha' ? (
                    <FormControl>
                        <RadioGroup
                            row
                            value={respostas[indexResposta] ? respostas[indexResposta].resposta : ''}
                            onChange={handleResponderPegunta}
                        >
                            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                            <FormControlLabel value="Não" control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                ) : (
                    <TextField
                        fullWidth
                        multiline={pergunta.texto === 'Qual é a sua altura?' || pergunta.texto === 'Qual é o seu peso?' ? false : true}
                        variant="outlined"
                        size="small"
                        //value={respostas[indexResposta] ? respostas[indexResposta].resposta : ''}
                        onBlur={handleResponderPegunta}
                        type={pergunta.texto === 'Qual é a sua altura?' || pergunta.texto === 'Qual é o seu peso?' ? 'number' : 'text'}
                    />
                )
            }
            {
                pergunta.texto === perguntaAutismo && respostas[indexResposta]?.resposta === 'Sim' && (
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <FormControl>
                            <FormLabel>
                                Autismo?
                            </FormLabel>
                            <RadioGroup
                                value={autismo}
                                onChange={(e) => setAutismo(e.target.value === 'true' ? true : false)}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                <FormControlLabel value={false} control={<Radio />} label="Não" />
                            </RadioGroup>
                        </FormControl>
                        {
                            autismo && (
                                <>
                                    <FormControl>
                                        <FormLabel>
                                            Já tem o diagnóstico?
                                        </FormLabel>
                                        <RadioGroup
                                            value={diagnosticoAutismo}
                                            onChange={(e) => setDiagnosticoAutismo(e.target.value)}
                                        >
                                            <FormControlLabel value="JÁ TEM O DIAGNOSTICO FECHADO" control={<Radio />} label="JÁ TEM O DIAGNOSTICO FECHADO" />
                                            <FormControlLabel value="EM INVESTIGAÇÃO" control={<Radio />} label="EM INVESTIGAÇÃO" />
                                        </RadioGroup>
                                    </FormControl>
                                    {
                                        prcs.findIndex(prc => prc === grupoCarencia) !== -1 && !!diagnosticoAutismo && (
                                            <Alert severity="error" variant="filled">
                                                Informar sobre a carência de 180 dias para Terapias. {`\n`} <strong>Material de apoio</strong> : Carência é o tempo que você terá que esperar para ser atendido pelo plano de saúde em um determinado procedimento. Essa informação esta claramente disposta no seu contrato e segue o disposto na Lei nº 9.656/98,.
                                            </Alert>
                                        )
                                    }
                                    <FormControl>
                                        <FormLabel>
                                            Copart?
                                        </FormLabel>
                                        <RadioGroup
                                            value={copart}
                                            onChange={(e) => setCopart(e.target.value === 'true' ? true : false)}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                                        </RadioGroup>
                                    </FormControl>
                                    {
                                        copart && (<Alert severity="error" variant="filled">
                                            informar que o produto contratado prevê COPART para realização de Terapias. {'\n'}  <strong>Material de apoio</strong> COPART: É o plano de saúde em que o beneficiário paga um valor à parte pela realização de um procedimento ou evento, essa informação está claramente disposta no seu contrato e é prevista na Resolução nr 433 da ANS.
                                        </Alert>)
                                    }
                                </>
                            )
                        }
                    </Box>
                )
            }
            {
                pergunta.subPerguntas.length > 0 && (
                    pergunta.subPerguntas.filter(pergunta => {
                        return pergunta.condicao === respostas[indexResposta]?.resposta
                    }).map((subPergunta, i) => (
                        <Box key={i}
                            mt={2}
                        >
                            <Typography variant="body1">
                                {subPergunta.texto}
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                size="small"
                                //value={respostas[indexResposta] ? respostas[indexResposta]?.subPerguntas[i]?.resposta : ''}
                                onBlur={(e) => {
                                    const newRespostas = [...respostas]
                                    const newSubPerguntas = [...respostas[indexResposta]?.subPerguntas]
                                    newSubPerguntas[i] = {
                                        pergunta: subPergunta.texto,
                                        resposta: e.target.value
                                    }
                                    newRespostas[indexResposta] = {
                                        ...respostas[indexResposta],
                                        subPerguntas: [
                                            ...newSubPerguntas
                                        ]
                                    }
                                    setRespostas(newRespostas)
                                }}
                            />
                        </Box>
                    ))
                )
            }
            {
                pergunta.tipo === 'Escolha' && (
                    <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        multiline
                        variant="outlined"
                        size="small"
                        placeholder="Observações"
                        //value={respostas[indexResposta] ? respostas[indexResposta].observacao : ''}
                        onBlur={(e) => {
                            const newRespostas = [...respostas]
                            newRespostas[indexResposta] = {
                                ...respostas[indexResposta],
                                observacao: e.target.value
                            }
                            setRespostas(newRespostas)
                        }}
                    />
                )
            }
            <Divider sx={{ m: 1 }} />
        </Box>
    )
}

export default Pergunta;