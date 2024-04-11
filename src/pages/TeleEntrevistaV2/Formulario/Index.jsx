import { useEffect, useState } from "react"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useParams } from "react-router-dom"
import { getCids, getPropostaById, getQuestionarioByName } from "../../../_services/teleEntrevistaV2.service"
import { Box, Container, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, Checkbox, Chip, Button, Alert } from "@mui/material"
import moment from "moment"
import Toast from "../../../components/Toast/Toast"
import ModalInfoAdicional from "./ModalInfoAdicional"
import Pergunta from "./Pergunta"

const perguntaAutismo = 'O(A) Sr(a) está ou já esteve em processo de investigação do espectro do autismo, doença de Parkinson, Alzheimer, demência, esclerose múltipla, lúpus?'

const prcs = [
    '600', '603', '604', '606', '607', '608', '609', '610'
]

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
    const [identificaDivergencia, setIdentificaDivergencia] = useState(false)
    const [cids, setCids] = useState([])
    const [cidsSelecionadas, setCidsSelecionadas] = useState([])
    const [justificativaDivergencia, setJustificativaDivergencia] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [imc, setImc] = useState(0)
    const [autismo, setAutismo] = useState(false)


    const handleSelecionarCids = async (checked, cid) => {
        try {
            if (checked) {
                setCidsSelecionadas([...cidsSelecionadas, cid])
            } else {
                setCidsSelecionadas(cidsSelecionadas.filter(item => item !== cid))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleVerificarCid = async (pesquisa) => {
        try {
            if (pesquisa.length > 2) {
                const cid = await getCids(pesquisa)
                setCids(cid)
            } else {
                setCids([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEnviarQuestionario = async () => {
        try {
            for (const resposta of respostas) {
                if (resposta.resposta === '') {
                    console.log(resposta);
                    setMessage(`Responda a pergunta: ${resposta.pergunta}`)
                    setSeverity('warning')
                    setOpenToast(true)
                    return
                }
            }

            if (identificaDivergencia && justificativaDivergencia === '') {
                setMessage('Justifique a divergência')
                setSeverity('warning')
                setOpenToast(true)
                return
            }

            if (identificaDivergencia && cidsSelecionadas.length === 0) {
                setMessage('Selecione pelo menos um CID')
                setSeverity('warning')
                setOpenToast(true)
                return
            }

            setMessage('Enviando questionário')
            setSeverity('info')
            setOpenToast(true)



        } catch (error) {
            console.log(error);
            setMessage('Erro ao enviar questionário')
            setSeverity('error')
            setOpenToast(true)
        }
    }

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
                <ModalInfoAdicional
                    infoAdicional={proposta.infoAdicional || {}}
                />
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
                            <Pergunta
                                key={index}
                                pergunta={pergunta.pergunta}
                                index={index}
                                respostas={respostas}
                                setRespostas={setRespostas}
                                setImc={setImc}
                                setAutismo={setAutismo}
                                autismo={autismo}
                                grupoCarencia={proposta.infoAdicional.grupoCarencia}
                            />
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
                            <Pergunta
                                key={index}
                                pergunta={pergunta.pergunta}
                                index={index}
                                setRespostas={setRespostas}
                                respostas={respostas}
                                setImc={setImc}
                                setAutismo={setAutismo}
                                autismo={autismo}
                            />
                        ))
                    }
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel>
                            Identifica Divergência?
                        </FormLabel>
                        <RadioGroup
                            value={identificaDivergencia}
                            onChange={(e) => {
                                setIdentificaDivergencia(e.target.value === 'true' ? true : false)
                            }}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Sim" />
                            <FormControlLabel value={false} control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {
                    identificaDivergencia && <Box>
                        <Typography
                            variant="h5"
                            mt={2}
                        >
                            Identificação de divergências
                        </Typography>
                        <Alert
                            severity="error"
                            variant="filled"
                        >
                            <Typography>
                                Notamos que houve divergência para as patologias: A, B, C (listar patologias) em relação ao preenchimento da DS. Para estas, iremos imputar CPT para ficar de acordo com as informações concedidas pelo Senhor(a). As demais coberturas permanecem inalteradas, caso haja necessidade de maior esclarecimentos procure seu corretor.
                            </Typography>
                            <Typography>
                                * Cobertura Parcial Temporária (CPT) aquela que admite, por um período ininterrupto de até 24 meses, a partir da data da contratação ou adesão ao plano privado de assistência à saúde, a suspensão da cobertura de Procedimentos de Alta Complexidade (PAC), leitos de alta tecnologia e procedimentos cirúrgicos, desde que relacionados exclusivamente às doenças ou lesões preexistentes declaradas pelo beneficiário ou seu representante legal. (para os CIDs declarados, não para todo tipo de tratamento)
                            </Typography>
                        </Alert>
                        <Box
                            mt={2}
                        >
                            <Typography>
                                Por que o beneficiário não informou na Declaração de Saúde essas patologias?
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                size="small"
                                value={justificativaDivergencia}
                                onChange={(e) => setJustificativaDivergencia(e.target.value)}
                            />
                        </Box>
                        <Box
                            mt={2}
                            mb={2}
                        >
                            <Box>
                                {
                                    cidsSelecionadas.map((item, index) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={`${item.codigo} - ${item.descricao}`}
                                                onDelete={() => handleSelecionarCids(false, item)}
                                            />
                                        )
                                    })
                                }
                            </Box>
                            <Typography>
                                Cids:
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                onChange={(e) => handleVerificarCid(e.target.value)}
                            />
                            {
                                cids.map((item) => {
                                    return (
                                        <FormControl key={item._id} sx={{ display: 'flex', flexDirection: 'column' }} >
                                            <FormControlLabel
                                                value={item}
                                                onChange={e => { handleSelecionarCids(e.target.checked, item) }}
                                                control={<Checkbox />}
                                                label={`${item.codigo} - ${item.descricao}`}
                                                checked={cidsSelecionadas.includes(item)}
                                            />
                                        </FormControl>
                                    )
                                })}
                        </Box>
                    </Box>
                }
                {
                    !identificaDivergencia && imc > 30 && (
                        <Alert
                            severity="error"
                            sx={{ mt: 2 }}
                            variant="filled"
                        >
                            <Typography>
                                De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso OBESIDADE {
                                    imc < 34.9 ? 'I' : imc < 39.9 ? 'II' : 'III'
                                } com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.
                            </Typography>
                        </Alert>
                    )
                }
                {
                    autismo && (
                        <Alert
                            severity="error"
                            sx={{ mt: 2 }}
                            variant="filled"
                        >
                            Agradecemos pelas informações fornecidas e, apenas para fins de esclarecimento, informamos que o serviço de Acompanhante Terapêutico Escolar não possui cobertura pela Operadora de Saúde, visto o disposto na Lei de nº 14.454/2022 e o parecer da Agência Nacional de Saúde Suplementar 25/2022, que é nosso órgão regulador, que dispõe sobre a não cobertura em razão da falta de eficácia científica e técnica e de recomendação dos órgãos competentes.
                        </Alert>
                    )
                }
                <Box
                    mb={4}
                    mt={2}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEnviarQuestionario}
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

export default FormularioV2