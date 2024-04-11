import { ArrowDropDown, ArrowDropUp, East, Info, UndoOutlined } from "@mui/icons-material"
import { Box, Button, Collapse, Drawer, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography, Checkbox } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { finalizarDemanda, getChecklist, getItemChecklist, voltarDemanda } from "../../../_services/sindicancia.service"
import Toast from "../../../components/Toast/Toast"
import moment from "moment"
import AuthContext from "../../../context/AuthContext"

const ItemChecklist = ({
    item,
    index,
    respostas,
    setRespostas,
    finalizado,
    naoSeAplica
}) => {

    const [open, setOpen] = useState(false)

    return (
        <Box
            sx={{
                mb: 1,
                borderBottom: '1px solid #ccc',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                }}
            >
                <FormControl>
                    <FormLabel>{index + 1} - {item.item}</FormLabel>
                    <RadioGroup
                        name={`item-${index}`}
                        row
                        value={respostas[index].resposta}
                        onChange={(e) => setRespostas(prev => {
                            const newRespostas = [...prev];
                            newRespostas[index].resposta = e.target.value;
                            return newRespostas;
                        })}
                    >
                        <FormControlLabel
                            value="sim"
                            control={<Radio />}
                            label="Sim"
                            disabled={finalizado || naoSeAplica}
                        />
                        <FormControlLabel
                            value="nao"
                            control={<Radio />}
                            label="Não"
                            disabled={finalizado || naoSeAplica}
                        />
                    </RadioGroup>
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center'
                    }}
                >
                    <Tooltip title={item.descricao}>
                        <Info color="info" />
                    </Tooltip>
                    <IconButton
                        onClick={() => setOpen(!open)}
                    >
                        {
                            open ? <ArrowDropUp /> : <ArrowDropDown />
                        }
                    </IconButton>
                </Box>
            </Box>
            <Collapse
                direction="down"
                in={respostas[index].resposta === 'nao'}
                mountOnEnter
                unmountOnExit
            >
                <TextField
                    label="Justificativa"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={respostas[index].justificativa}
                    onChange={(e) => setRespostas(prev => {
                        const newRespostas = [...prev];
                        newRespostas[index].justificativa = e.target.value;
                        return newRespostas;
                    })}
                    disabled={finalizado || naoSeAplica}
                />
            </Collapse>
            <Collapse
                direction="down"
                in={open}
                mountOnEnter
                unmountOnExit
                sx={{
                    mt: 1
                }}
            >
                <TextField
                    label="Observação"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={respostas[index].observacao}
                    onChange={(e) => setRespostas(prev => {
                        const newRespostas = [...prev];
                        newRespostas[index].observacao = e.target.value;
                        return newRespostas;
                    })}
                    disabled={finalizado || naoSeAplica}
                />
            </Collapse>
        </Box>
    )
}


const DrawerFinalizacao = ({ demanda }) => {

    const { acessos } = useContext(AuthContext)

    const [open, setOpen] = useState(false)

    const [itensChecklist, setItensChecklist] = useState([])
    const [respostas, setRespostas] = useState([])
    const dataInicio = moment(demanda.data_criacao_pacote)
    const dataFim = moment(demanda.data_finalizacao || new Date())
    const diff = dataFim.businessDiff(dataInicio)
    let data = demanda
    const [justificativa, setJustificativa] = useState(demanda.justificativa_finalizacao || '')
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [dataFinalizacao, setDataFinalizacao] = useState('')
    const [naoSeAplica, setNaoSeAplica] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleFinalizar = async () => {


        if (!naoSeAplica) {
            for (const item of respostas) {
                if (item.resposta === 'nao' && item.justificativa === '') {
                    setOpenToast(true)
                    setMessage('Justifique todos os itens que foram respondidos como "Não"')
                    setSeverity('error')
                    return
                }
                if (item.resposta === '') {
                    setOpenToast(true)
                    setMessage('Responda todos os itens')
                    setSeverity('error')
                    return
                }
            }
        }

        setLoading(true)
        if (diff > 3 && !justificativa) {
            setOpenToast(true)
            setMessage('Justificativa é obrigatória')
            setSeverity('error')
            setLoading(false)
            return
        }
        if (!dataFinalizacao || dataFinalizacao === '') {
            setOpenToast(true)
            setMessage('Data é obrigatória')
            setSeverity('error')
            setLoading(false)
            return
        }
        const result = await finalizarDemanda({
            id_demanda: demanda.id,
            justificativa,
            data: dataFinalizacao,
            checklist: respostas
        })
        if (!result.error) {
            setOpenToast(true)
            setMessage('Demanda finalizada com sucesso')
            setSeverity('success')
            data.data_finalizacao = new Date()
            data.justificativa_finalizacao = justificativa
        } else {
            setOpenToast(true)
            setMessage('Erro ao finalizar demanda')
            setSeverity('error')
        }
        setLoading(false)
    }

    const handleVoltar = async () => {
        setLoading(true)
        try {
            const result = await voltarDemanda(demanda.id)

            if (result.msg === 'ok') {
                setOpenToast(true)
                setMessage('Demanda retornada com sucesso')
                setSeverity('success')
                data.data_finalizacao = null
                data.justificativa_finalizacao = ''
                setRespostas(itensChecklist.map(item => ({
                    id_demanda: demanda.id,
                    item: item.item,
                    resposta: '',
                    justificativa: '',
                    observacao: ''
                })))
            } else {
                setOpenToast(true)
                setMessage('Erro ao retornar demanda')
                setSeverity('error')
            }
            setLoading(false)

        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao retornar demanda')
            setSeverity('error')
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const result = await getItemChecklist()
            const resultChecklist = await getChecklist(demanda.id)
            if (resultChecklist.length > 0) {
                setRespostas(resultChecklist)
            } else {
                setRespostas(result.map(item => ({
                    id_demanda: demanda.id,
                    item: item.item,
                    resposta: '',
                    justificativa: '',
                    observacao: ''
                })))
            }
            setItensChecklist(result)
        }
        fetch()
    }, [])

    return (
        <Box
            sx={{
                m: 2
            }}
        >
            <Button
                variant="contained"
                color={data.data_finalizacao ? 'success' : 'error'}
                endIcon={<East />}
                onClick={handleOpen}
            >
                Checklist
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '100%',
                        maxWidth: 600,
                    }
                }}
            >
                <Box
                    sx={{
                        m: 2
                    }}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold'
                            }}
                        >
                            Checklist finalização
                        </Typography>
                        <FormControlLabel control={<Checkbox />} label="Não se aplica" value={naoSeAplica}
                            onChange={(e) => {
                                setNaoSeAplica(e.target.checked)
                            }}
                        />
                    </Box>

                    {
                        itensChecklist.map((item, index) => (
                            <ItemChecklist item={item} index={index} respostas={respostas} setRespostas={setRespostas} finalizado={!!data.data_finalizacao} naoSeAplica={naoSeAplica} />
                        ))
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        m: 2
                    }}
                >
                    {
                        !demanda.data_finalizacao && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleFinalizar}
                                    disabled={loading}
                                >
                                    Finalizar
                                </Button>
                                <TextField
                                    label="Data"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    value={dataFinalizacao}
                                    onChange={(e) => setDataFinalizacao(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={loading}
                                />

                            </Box>
                        )
                    }
                    {
                        diff > 3 && (
                            <TextField
                                label="Justificativa"
                                variant="outlined"
                                size="small"
                                multiline
                                rows={2}
                                color="error"
                                value={justificativa}
                                onChange={(e) => setJustificativa(e.target.value)}
                            />
                        )
                    }
                    {
                        data.data_finalizacao && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexDirection: 'column'
                                }}
                            >
                                <TextField
                                    label="Data Inicio"
                                    variant="outlined"
                                    size="small"
                                    value={moment(data.data_demanda).format('DD/MM/YYYY')}
                                    disabled
                                />
                                <TextField
                                    label="Data Fim"
                                    variant="outlined"
                                    size="small"
                                    value={moment(data.data_finalizacao).format('DD/MM/YYYY')}
                                    disabled
                                />
                                <TextField
                                    label="Dias"
                                    variant="outlined"
                                    size="small"
                                    value={diff}
                                    disabled
                                />
                                <TextField
                                    label="Justificativa"
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={2}
                                    value={data.justificativa_finalizacao}
                                    disabled
                                />
                            </Box>
                        )
                    }
                    {
                        data.data_finalizacao && acessos?.administrador ? (
                            <Tooltip title='Voltar Demanda'>
                                <Button disabled={loading} onClick={handleVoltar} type='submit' variant='contained'><UndoOutlined /></Button>
                            </Tooltip>
                        ) : (
                            <>
                            </>
                        )
                    }
                </Box>
                <Toast
                    open={openToast}
                    message={message}
                    severity={severity}
                    onClose={() => setOpenToast(false)}
                />
            </Drawer>
        </Box>
    )
}

export default DrawerFinalizacao