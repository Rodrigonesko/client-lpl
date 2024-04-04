import { Close, Edit } from "@mui/icons-material"
import { AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography, TextField } from "@mui/material"
import { forwardRef, useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { getPerguntas, updateQuestionario } from "../../../../_services/teleEntrevistaV2.service"
import { grey } from "@mui/material/colors"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Pergunta = ({
    pergunta,
    setRefQuestionario,
    refQuestionario
}) => {

    const [posicao, setPosicao] = useState(0)

    const handleAdicionar = () => {
        if (posicao <= 0) return
        if (refQuestionario.perguntas.find(p => p.pergunta._id === pergunta._id)) return
        setRefQuestionario(prev => ({ ...prev, perguntas: [...prev.perguntas, { pergunta, posicao }] }))
    }

    return (
        <Box
            key={pergunta._id}
            sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '5px',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="body1"
                >
                    {pergunta.texto}
                </Typography>
                <TextField
                    size="small"
                    label="Posição"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={posicao}
                    onChange={(e) => setPosicao(e.target.value)}
                />
            </Box>
            {
                !refQuestionario.perguntas.find(p => p.pergunta._id === pergunta._id) && (
                    <Button
                        variant="contained"
                        onClick={handleAdicionar}
                    >
                        Adicionar
                    </Button>
                )
            }
        </Box>
    )
}


const ModalAlterarQuestionario = ({
    questionario,
    setFlushHook
}) => {

    const [open, setOpen] = useState(false)
    const [perguntas, setPerguntas] = useState([])
    const [refQuestionario, setRefQuestionario] = useState(questionario)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [loading, setLoading] = useState(false)

    const handleOpen = async () => {
        setOpen(true)
        const response = await getPerguntas()
        setPerguntas(response)
    }

    const handleAlterar = async () => {
        setLoading(true)
        try {
            const auxQuestionario = { ...refQuestionario, perguntas: refQuestionario.perguntas.map(p => ({ pergunta: p.pergunta._id, posicao: p.posicao })) }
            console.log(auxQuestionario);
            await updateQuestionario(auxQuestionario)
            setMessage('Questionário alterado com sucesso!')
            setSeverity('success')
            setOpenToast(true)
            setFlushHook(prev => !prev)
        } catch (error) {
            setMessage('Erro ao alterar questionário!')
            setSeverity('error')
            setOpenToast(true)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <IconButton
                onClick={handleOpen}
            >
                <Edit color="primary" />
            </IconButton>

            <Dialog
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: grey[600] }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <Close />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Questionario
                        </Typography>
                        <Button autoFocus onClick={handleAlterar} color="inherit" disabled={loading}>
                            Alterar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        p: 2
                    }}
                >
                    {
                        refQuestionario.perguntas.sort((a, b) => {
                            return a.posicao - b.posicao;
                        }).map((pergunta, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>
                                    {pergunta.posicao}. {pergunta.pergunta.texto}
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        setRefQuestionario(prev => ({ ...prev, perguntas: prev.perguntas.filter(p => p.pergunta._id !== pergunta.pergunta._id) }))
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                        ))
                    }
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        p: 2
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        label="Nome"
                        value={questionario.nome}
                        disabled
                    />
                    {
                        !loading ? perguntas.filter(pergunta => {
                            return !refQuestionario.perguntas.find(p => p.pergunta._id === pergunta._id)
                        }).map(pergunta => (
                            <Pergunta
                                key={pergunta._id}
                                pergunta={pergunta}
                                setRefQuestionario={setRefQuestionario}
                                refQuestionario={refQuestionario}
                            />
                        )) : (
                            <Typography>Carregando...</Typography>
                        )
                    }
                </Box>
            </Dialog>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </>
    )
}

export default ModalAlterarQuestionario