import React, { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import InfoAdicionais from "./components/InfoAdicional";
import { Alert, Select, Button, InputLabel, FormControl, MenuItem, Box, CircularProgress, Typography, Container, Collapse, RadioGroup, FormControlLabel, Radio, Divider, Chip, Dialog, DialogContent } from '@mui/material'
import EntrevistaQualidade from "../../../components/EntrevistaQualidade/EntrevistaQualidade";
import { alterarFormularioEntrevista, getPropostaById } from "../../../_services/teleEntrevistaExterna.service";
import { getPerguntas } from "../../../_services/teleEntrevista.service";
import Cids from "./components/Cids";
import FormControlTextField from "./components/FormControlTextField";
import { Save } from "@mui/icons-material";
import Title from "../../../components/Title/Title";
import PerguntaAutismo from "./components/PerguntaAutismo";
import Toast from "../../../components/Toast/Toast";
import { finalizarEntrevista } from "../../../_services/teleEntrevistaV2.service";
import gerarPdf from "../Pdf/Pdf";

const RadioQuestion = ({ pergunta, respostasFormulario, setRespostasFormulario, pessoa, setTea, tea }) => {

    const [resposta, setResposta] = useState('')

    return (
        <Box
            ml={2}
        >
            <Typography
                sx={{
                    color: 'black',
                    fontWeight: 'bold',
                    pl: 1
                }}
            >
                {pergunta.pergunta}
            </Typography>
            <RadioGroup
                row
                name={pergunta.name}
                onChange={e => {
                    setResposta(e.target.value)
                    setRespostasFormulario({ ...respostasFormulario, [pergunta.name]: { resposta: e.target.value } })
                }}
                value={respostasFormulario[pergunta.name]?.resposta || ''}
            >
                <FormControlLabel value='Sim' control={<Radio />} label='Sim' />
                <FormControlLabel value='Não' control={<Radio />} label='Não' />
            </RadioGroup>
            <Collapse in={resposta === 'Sim'} mountOnEnter unmountOnExit>
                <Box>
                    {pergunta.name === 'espectro' && (
                        <PerguntaAutismo pessoa={pessoa} tea={tea} setTea={setTea} />
                    )}
                    {
                        pergunta.subPerguntasSim.map((subPergunta, index) => (
                            <FormControlTextField
                                key={index}
                                label={subPergunta}
                                placeholder={'Resposta'}
                                onBlur={e => {
                                    setRespostasFormulario({
                                        ...respostasFormulario,
                                        [pergunta.name]: {
                                            ...respostasFormulario[pergunta.name],
                                            [subPergunta]: e.target.value
                                        }
                                    })
                                }}
                            />
                        ))
                    }
                    <FormControlTextField
                        label={'Observações'}
                        placeholder={'Resposta'}
                        onBlur={e => {
                            setRespostasFormulario({
                                ...respostasFormulario,
                                [pergunta.name]: {
                                    ...respostasFormulario[pergunta.name],
                                    'Observações:': e.target.value
                                }
                            })
                        }}

                    />
                </Box>
            </Collapse>
            <Collapse in={resposta === 'Não'} mountOnEnter unmountOnExit>
                {
                    pergunta.subPerguntasNao.map((subPergunta, index) => (
                        <FormControlTextField
                            key={index}
                            label={subPergunta}
                            placeholder={'Resposta'}
                            onBlur={e => {
                                setRespostasFormulario({
                                    ...respostasFormulario,
                                    [pergunta.name]: {
                                        ...respostasFormulario[pergunta.name],
                                        [subPergunta]: e.target.value
                                    }
                                })
                            }}
                        />
                    ))
                }
                <FormControlTextField
                    label={'Observações'}
                    placeholder={'Resposta'}
                    onBlur={e => {
                        setRespostasFormulario({
                            ...respostasFormulario,
                            [pergunta.name]: {
                                ...respostasFormulario[pergunta.name],
                                'Observações:': e.target.value
                            }
                        })
                    }}

                />
            </Collapse>
        </Box>
    )
}

const Formulario = () => {

    const { id } = useParams()

    const [perguntas, setPerguntas] = useState([])
    const [pessoa, setPessoa] = useState()
    const [divergencia, setDivergencia] = useState(false)
    const [qualDivergencia, setQualDivergencia] = useState('')
    const [motivoBeneficiario, setMotivoBeneficiario] = useState('')
    const [habitos, setHabitos] = useState(true)
    const [autismo, setAutismo] = useState(false)
    const [tea, setTea] = useState('')
    const [infoAdicional, setInfoAdicional] = useState({})
    const [entrevistaQualidade, setEntrevistaQualidade] = useState(false)
    const [novoFormulario, setNovoFormulario] = useState('')
    const [loading, setLoading] = useState(false)
    const [cidsSelecionados, setCidsSelecionados] = useState([])
    const [cidsDs, setCidsDs] = useState([])
    const [respostasFormulario, setRespostasFormulario] = useState({})
    const [imc, setImc] = useState(0)
    const [indicadorImc, setIndicadorImc] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [loadingEnviando, setLoadingEnviando] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [severityToast, setSeverityToast] = useState('success')

    const alterarFormulario = async () => {
        try {
            setLoading(true)
            if (novoFormulario !== '') {
                await alterarFormularioEntrevista({ id, formulario: novoFormulario })
                window.location.reload()
            } else {
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarInfoPessoa = async () => {
            try {
                const result = await getPropostaById(id)
                setPessoa(result)
                if (result.formulario !== 'adulto') {
                    setHabitos(false)
                }
                setInfoAdicional(result)
            } catch (error) {
                console.log(error);
            }
        }
        buscarInfoPessoa()
    }, [id])

    useEffect(() => {
        const buscarPerguntas = async () => {
            try {
                let result = await getPerguntas()
                result = result.perguntas.filter(pergunta => {
                    const sexo = pergunta.sexo === 'N'
                    return pergunta.formulario === pessoa.formulario && (pergunta.sexo === pessoa.sexo || sexo)
                })
                setPerguntas(result)
                setRespostasFormulario({})
            } catch (error) {
                console.log(error);
            }
        }
        if (pessoa) buscarPerguntas()
    }, [pessoa])

    useEffect(() => {
        if (respostasFormulario?.peso?.resposta && respostasFormulario?.altura?.resposta) {
            const peso = parseFloat(respostasFormulario.peso.resposta)
            const altura = parseFloat(respostasFormulario.altura.resposta)
            console.log(peso, altura);
            const imc = peso / (altura * altura)
            console.log(imc);
            setImc(imc)
            if (imc >= 40) {
                setIndicadorImc('OBESIDADE III')
            }
            if (imc >= 35 && imc <= 39.99) {
                setIndicadorImc('OBESIDADE II')
            }
            if (imc >= 30 && imc <= 34.99) {
                setIndicadorImc('OBESIDADE I')
            }
        }
    }, [respostasFormulario?.peso?.resposta, respostasFormulario?.altura?.resposta])

    useEffect(() => {
        if (respostasFormulario?.espectro?.resposta === 'Sim') {
            setAutismo(true)
        } else {
            setAutismo(false)
        }
    }, [respostasFormulario?.espectro?.resposta])

    useEffect(() => {
        console.log(tea);
    }, [tea])

    return (
        <>
            <Sidebar>
                <Container>
                    <Box
                        mt={2}
                    >
                        {
                            loading ? (
                                <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                            ) : null
                        }

                        <Title
                            size={'medium'}
                        >
                            Entrevista Qualificativa
                        </Title>
                        <Box display='flex' mt={2}>
                            <FormControl size="small" style={{ minWidth: '130px' }}>
                                <InputLabel>Formulário</InputLabel>
                                <Select
                                    label='Formulário'
                                    onChange={e => setNovoFormulario(e.target.value)}
                                >
                                    <MenuItem>
                                        <em>Formulário</em>
                                    </MenuItem>
                                    <MenuItem value='adulto-f'>Adulto feminino</MenuItem>
                                    <MenuItem value='adulto-m'>Adulto masculino</MenuItem>
                                    <MenuItem value='0-2 anos'>0-2 anos</MenuItem>
                                    <MenuItem value='2-8 anos'>2-8 anos</MenuItem>
                                </Select>
                            </FormControl>
                            <Button style={{ marginLeft: '10px' }} variant="contained" size="small" onClick={alterarFormulario}>Alterar</Button>
                        </Box>

                        <EntrevistaQualidade setEntrevistaQualidade={setEntrevistaQualidade} entrevistaQualidade={entrevistaQualidade} />

                        <Box m={2} textAlign='center'>
                            <InfoAdicionais data={infoAdicional} />
                        </Box>
                        <RoteiroTeleEntrevista />
                        <InfoPessoaEntrevista pessoa={pessoa} />
                        <Divider />
                        <Chip
                            label={`IMC: ${imc.toFixed(2)} ${indicadorImc}`}
                            color={indicadorImc ? 'error' : 'primary'}
                            variant='filled'
                            sx={{
                                mt: 2
                            }}
                        />
                        <Title
                            size={'small'}
                        >
                            Questionário Médico
                        </Title>
                        <Box
                            display='flex'
                            flexDirection='column'
                            gap={2}
                        >
                            {
                                perguntas.filter(pergunta => pergunta.categoria === 'questionario').map(pergunta => {
                                    return (
                                        <React.Fragment key={pergunta._id}>
                                            {!pergunta.existeSub ? <FormControlTextField
                                                key={pergunta._id}
                                                label={pergunta.pergunta}
                                                placeholder={'Resposta'}
                                                onBlur={e => {
                                                    setRespostasFormulario({
                                                        ...respostasFormulario, [pergunta.name]: {
                                                            resposta: e.target.value
                                                        }
                                                    })
                                                }}
                                            /> : (
                                                <RadioQuestion
                                                    tea={tea}
                                                    setTea={setTea}
                                                    pessoa={pessoa}
                                                    pergunta={pergunta}
                                                    respostasFormulario={respostasFormulario}
                                                    setRespostasFormulario={setRespostasFormulario}
                                                />
                                            )}

                                        </React.Fragment>
                                    )
                                })
                            }
                        </Box>
                        {
                            habitos && (
                                <Box>
                                    <Title
                                        size={'small'}
                                    >
                                        HÁBITOS E HISTÓRICO FAMILIAR
                                    </Title>
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        gap={2}
                                    >
                                        {
                                            perguntas.filter(pergunta => pergunta.categoria === 'habitos').map(pergunta => {
                                                return (
                                                    <FormControlTextField
                                                        key={pergunta._id}
                                                        label={pergunta.pergunta}
                                                        placeholder={'Resposta'}
                                                        onBlur={e => {
                                                            setRespostasFormulario({ ...respostasFormulario, [pergunta.name]: { resposta: e.target.value } })
                                                        }}
                                                    />
                                                )
                                            })
                                        }
                                    </Box>
                                </Box>
                            )
                        }
                        <Box
                            m={2}
                        >
                            <FormControl fullWidth sx={{ maxWidth: '300px' }}>
                                <InputLabel>Identifica Divergência</InputLabel>
                                <Select
                                    label='Identifica Divergência'
                                    onChange={e => {
                                        setDivergencia(e.target.value)
                                    }}
                                    value={divergencia}
                                    size="small"
                                >
                                    <MenuItem value={false}>Não</MenuItem>
                                    <MenuItem value={true}>Sim</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Collapse in={divergencia} mountOnEnter unmountOnExit >
                            <Box>
                                <Title
                                    size={'small'}
                                >
                                    IDENTIFICAÇÃO DE DIVERGÊNCIAS
                                </Title>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    width={'100%'}
                                    gap={2}
                                >
                                    <Alert severity='error'>
                                        <Typography m={1}>
                                            Notamos que houve divergência para as patologias: A, B, C (listar patologias) em relação ao preenchimento da DS. Para estas, iremos imputar CPT para ficar de acordo com as informações concedidas pelo Senhor(a). As demais coberturas permanecem inalteradas, caso haja necessidade de maior esclarecimentos procure seu corretor.
                                        </Typography>
                                        <Typography m={1}>
                                            * Cobertura Parcial Temporária (CPT) aquela que admite, por um período ininterrupto de até 24 meses, a partir da data da contratação ou adesão ao plano privado de assistência à saúde, a suspensão da cobertura de Procedimentos de Alta Complexidade (PAC), leitos de alta tecnologia e procedimentos cirúrgicos, desde que relacionados exclusivamente às doenças ou lesões preexistentes declaradas pelo beneficiário ou seu representante legal. (para os CIDs declarados, não para todo tipo de tratamento)
                                        </Typography>
                                    </Alert>
                                    {/* <FormControlTextField label='Qual divergência?' name='qual-divergencia' onChange={e => setQualDivergencia(e.target.value)} placeholder={'Resposta'} value={qualDivergencia} /> */}
                                    <FormControlTextField label='Por que o beneficiário não informou na Declaração de Saúde essas patologias?' name='motivo-beneficiario' onChange={e => setMotivoBeneficiario(e.target.value)} placeholder={'Resposta'} value={motivoBeneficiario} />
                                    <Cids cidsSelecionados={cidsSelecionados} setCidsSeleciados={setCidsSelecionados} />
                                </Box>
                            </Box>
                        </Collapse>
                        {
                            pessoa?.tipoContrato === 'ADESÃO' && (
                                <Box>
                                    <Typography
                                        m={2}
                                        variant='h6'

                                    >
                                        Cids Declaração de Saúde
                                    </Typography>
                                    <Cids cidsSelecionados={cidsDs} setCidsSeleciados={setCidsDs} />
                                </Box>
                            )
                        }
                        {
                            indicadorImc && (
                                <Alert severity="error">
                                    <Typography>
                                        De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso {indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.
                                    </Typography>
                                </Alert>
                            )
                        }
                        {
                            autismo && pessoa.tipoContrato !== 'ADESÃO' && (
                                <Alert severity="error">
                                    Agradecemos pelas informações fornecidas e, apenas para fins de esclarecimento, informamos que o serviço de Acompanhante Terapêutico Escolar não possui cobertura pela Operadora de Saúde, visto o disposto na Lei de nº 14.454/2022 e o parecer da Agência Nacional de Saúde Suplementar 25/2022, que é nosso órgão regulador, que dispõe sobre a não cobertura em razão da falta de eficácia científica e técnica e de recomendação dos órgãos competentes.
                                </Alert>
                            )
                        }
                    </Box>
                    <Box alignItems={'center'} m={3} >
                        <Button
                            size="large"
                            variant='contained'
                            onClick={async () => {
                                try {
                                    setLoadingEnviando(true)
                                    setOpenDialog(true)

                                    for (const pergunta of perguntas) {
                                        if (!respostasFormulario[pergunta.name]?.resposta) {
                                            setOpenDialog(false)
                                            setOpenToast(true)
                                            setMessageToast('Preencha todas as perguntas!' + pergunta.pergunta)
                                            setSeverityToast('error')
                                            return
                                        }
                                    }

                                    if (divergencia && cidsSelecionados.length === 0) {
                                        setOpenDialog(false)
                                        setOpenToast(true)
                                        setMessageToast('Selecione os CIDs da divergência!')
                                        setSeverityToast('error')
                                        return
                                    }

                                    const data = await finalizarEntrevista(
                                        {
                                            id,
                                            respostas: respostasFormulario,
                                            pessoa,
                                            divergencia: divergencia ? 'Sim' : 'Não',
                                            qualDivergencia,
                                            motivoBeneficiario,
                                            cids: cidsSelecionados.map(cid => {
                                                return {
                                                    ...cid,
                                                    codigo: cid.subCategoria
                                                }
                                            }),
                                            cidsDs: cidsDs.map(cid => {
                                                return {
                                                    ...cid,
                                                    codigo: cid.subCategoria
                                                }
                                            }),
                                            tea
                                        }
                                    )
                                    setLoadingEnviando(false)
                                    await gerarPdf(data._id)
                                } catch (error) {
                                    console.log(error);
                                    setLoadingEnviando(false)
                                    setOpenDialog(false)
                                    setOpenToast(true)
                                    setMessageToast('Erro ao enviar formulário!')
                                    setSeverityToast('error')
                                }
                            }}
                            endIcon={<Save />}
                        >
                            Enviar Formulário
                        </Button>
                    </Box>
                    <Dialog
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                    >
                        <DialogContent>
                            {
                                loadingEnviando ? (
                                    <CircularProgress />
                                ) : (
                                    <Alert severity='success'>
                                        Formulário enviado com sucesso!
                                    </Alert>
                                )
                            }
                        </DialogContent>
                    </Dialog>
                    <Toast
                        open={openToast}
                        onClose={() => setOpenToast(false)}
                        message={messageToast}
                        severity={severityToast}
                    />
                </Container>
            </Sidebar>
        </>
    )
}

export default Formulario