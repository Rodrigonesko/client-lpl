import { Add, Close } from "@mui/icons-material"
import { AppBar, Box, Button, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { forwardRef, useState } from "react"
import { createQuestionario, getPerguntas } from "../../../../_services/teleEntrevistaV2.service";
import Toast from "../../../../components/Toast/Toast";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Pergunta = ({
    pergunta,
    setPerguntasAdicionadas,
    perguntasAdicionandas
}) => {

    const [posicao, setPosicao] = useState(0)

    const handleAdicionar = () => {
        if (posicao <= 0) return
        if (perguntasAdicionandas.find(p => p.posicao === posicao)) return
        setPerguntasAdicionadas((prev) => [...prev, { ...pergunta, posicao }])
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
                !perguntasAdicionandas.find(p => p._id === pergunta._id) && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdicionar}
                    >
                        Adicionar
                    </Button>
                )
            }
        </Box>
    )
}

const ModalCriarQuestionarios = () => {

    const [open, setOpen] = useState(false)
    const [perguntas, setPerguntas] = useState([])
    const [loading, setLoading] = useState(false)
    const [perguntasAdicionadas, setPerguntasAdicionadas] = useState([])
    const [nome, setNome] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleOpen = async () => {
        setOpen(true)
        const response = await getPerguntas()
        setPerguntas(response)
    }

    const handleCriar = async () => {
        setLoading(true)
        try {

            if (nome === '' || perguntasAdicionadas.length === 0) {
                setLoading(false)
                setOpenToast(true)
                setMessage('Preencha todos os campos')
                setSeverity('error')
                return
            }

            await createQuestionario({
                nome,
                perguntas: perguntasAdicionadas.map(p => {
                    return {
                        pergunta: p._id,
                        posicao: p.posicao
                    }
                })
            })

            setLoading(false)
            setOpen(false)
            setOpenToast(true)
            setMessage('Questionario criado com sucesso')
            setSeverity('success')

            setNome('')
            setPerguntasAdicionadas([])

        } catch (error) {
            console.log(error);
            setLoading(false)
            setOpenToast(true)
            setMessage('Erro ao criar questionario | ', error?.response?.data?.message || error.message)
            setSeverity('error')
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                endIcon={<Add />}
                onClick={handleOpen}
            >
                Criar Questionario
            </Button>
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
                        <Button autoFocus color="inherit" onClick={handleCriar} disabled={loading}>
                            Criar
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
                        perguntasAdicionadas.map(pergunta => (
                            <Box
                                key={pergunta._id}
                                sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>
                                    {pergunta.posicao}. {pergunta.texto}
                                </Typography>
                                <IconButton
                                    onClick={() => setPerguntasAdicionadas(prev => prev.filter(p => p._id !== pergunta._id))}
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
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    {
                        !loading ? perguntas.filter(pergunta => {
                            return !perguntasAdicionadas.find(p => p._id === pergunta._id)
                        }).map(pergunta => (
                            <Pergunta
                                key={pergunta._id}
                                pergunta={pergunta}
                                setPerguntasAdicionadas={setPerguntasAdicionadas}
                                perguntasAdicionandas={perguntasAdicionadas}
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

export default ModalCriarQuestionarios