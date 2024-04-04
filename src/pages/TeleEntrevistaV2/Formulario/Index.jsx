import { useEffect, useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useParams } from "react-router-dom"
import { getPropostaById, getQuestionarioByName } from "../../../_services/teleEntrevistaV2.service"
import { Box, Container, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import moment from "moment"

const BoxInfo = ({ label, value }) => {
    return (
        <Box>
            <Typography variant="body2">
                {label}
            </Typography>
            <Typography variant="body1">
                {value}
            </Typography>
        </Box>
    )
}

const Pergunta = ({ pergunta, index }) => {

    const [resposta, setResposta] = useState('')
    const [open, setOpen] = useState(false)
    const [observacao, setObservacao] = useState('')

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
                            value={resposta}
                            onChange={(e) => setResposta(e.target.value)}
                        >
                            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                            <FormControlLabel value="Não" control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                ) : (
                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        size="small"
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                    />
                )
            }
            {
                pergunta.subPerguntas.length > 0 && (
                    pergunta.subPerguntas.filter(pergunta => {
                        return pergunta.condicao === resposta
                    }).map((subPergunta, index) => (
                        <Box key={index}
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
                            />
                        </Box>
                    ))
                )
            }
            <Typography>
                Observações
            </Typography>
            <TextField
                fullWidth
                multiline
                variant="outlined"
                size="small"
            />
            <Divider sx={{ m: 1 }} />
        </Box>
    )
}

const FormularioV2 = () => {

    const { id } = useParams()

    const [proposta, setProposta] = useState({
        beneficiario: {
            nome: '',
            sexo: '',
            cpf: '',
            telefone: '',
            dataNascimento: ''
        },
        proposta: ''
    })
    const [questionario, setQuestionario] = useState({
        nome: '',
        perguntas: []
    })
    const [respostas, setRespostas] = useState([])
    const [divergencia, setDivergencia] = useState('')

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await getPropostaById(id)
                setProposta(response)
                if (response.beneficiario.sexo === 'F') {
                    const questionario = await getQuestionarioByName('Adulto - Feminino')
                    console.log(questionario);
                    setQuestionario(questionario)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetch()
    }, [id])

    return (
        <Sidebar>
            <Container>
                <Box>
                    <Typography variant="h6">
                        Informações Pessoais
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <BoxInfo label="Nome" value={proposta.beneficiario.nome} />
                        <BoxInfo label="Sexo" value={proposta.beneficiario.sexo} />
                        <BoxInfo label="CPF" value={proposta.beneficiario.cpf} />
                        <BoxInfo label="Proposta" value={proposta.proposta} />
                        <BoxInfo label="Telefone" value={proposta.beneficiario.telefone} />
                        <BoxInfo label="Data de Nascimento" value={moment(proposta.beneficiario.dataNascimento).format('DD/MM/YYYY')} />
                    </Box>
                </Box>
                <Box>
                    <Typography
                        variant="h5"
                        mt={2}
                    >
                        Questionário Médico
                    </Typography>
                    {
                        questionario.perguntas.sort((a, b) => {
                            return a.posicao - b.posicao
                        }).filter(pergunta => {
                            return pergunta.pergunta.categoria === 'Questionário Médico'
                        }).map((pergunta, index) => (
                            <Pergunta key={index} pergunta={pergunta.pergunta} index={index} />
                        ))
                    }
                </Box>
                <Box>
                    <Typography
                        variant="h5"
                        mt={2}
                    >
                        Hábitos e Histórico Familiar
                    </Typography>
                    {
                        questionario.perguntas.sort((a, b) => {
                            return a.posicao - b.posicao
                        }).filter(pergunta => {
                            return pergunta.pergunta.categoria === 'Hábitos e Histórico Familiar'
                        }).map((pergunta, index) => (
                            <Pergunta key={index} pergunta={pergunta.pergunta} index={index} />
                        ))
                    }
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>
                            Identifica Divergência?
                        </FormLabel>
                        <RadioGroup>
                            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                            <FormControlLabel value="Não" control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <Typography>
                        Identificação de divergências
                    </Typography>
                    <Box>
                        <Typography>
                            Por que o beneficiário não informou na Declaração de Saúde essas patologias?
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                    <Box>
                        <Typography>
                            Cids:
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                </Box>
            </Container>
        </Sidebar>
    )
}

export default FormularioV2