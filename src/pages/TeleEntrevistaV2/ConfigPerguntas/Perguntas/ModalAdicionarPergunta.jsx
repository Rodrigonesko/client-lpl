import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Input, InputLabel, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import AdicionarSubPergunta from "./AdicionarSubPegunta"
import { Delete } from "@mui/icons-material"
import { createPergunta } from "../../../../_services/teleEntrevistaV2.service"

const ModalAdicionarPerguntas = ({ setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [pergunta, setPergunta] = useState('')
    const [tipo, setTipo] = useState('')
    const [categoria, setCategoria] = useState('')
    const [subPerguntas, setSubPerguntas] = useState([])

    const handleAdicionarPergunta = async () => {
        try {
            if (pergunta === '' || tipo === '' || categoria === '') {
                setOpenToast(true)
                setMessage('Preencha todos os campos')
                setSeverity('error')
                setLoading(false)
                return
            }
            setLoading(true)
            await createPergunta({
                texto: pergunta,
                tipo,
                categoria,
                subPerguntas
            })

            setLoading(false)
            setOpen(false)
            setOpenToast(true)
            setMessage('Pergunta adicionada com sucesso')
            setSeverity('success')
            setPergunta('')
            setTipo('')
            setCategoria('')
            setSubPerguntas([])
            setFlushHook((prev) => !prev)
        } catch (error) {
            console.log(error);
            setLoading(false)
            setOpenToast(true)
            setMessage('Erro ao adicionar pergunta | ' + error?.response?.data?.message)
            setSeverity('error')
        }
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Adicionar Pergunta
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogTitle>
                    Adicionar Pergunta
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column',
                            m: 2
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Pergunta"
                            placeholder="Texto da Pergunta"
                            size="small"
                            variant="outlined"
                            multiline
                            disabled={loading}
                            rows={2}
                            value={pergunta}
                            onChange={(e) => setPergunta(e.target.value)}
                        />
                        <FormControl>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                row
                            >
                                <FormControlLabel
                                    value="Escolha"
                                    label="Escolha"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    value="Aberta"
                                    label="Aberta"
                                    control={<Radio />}
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            <RadioGroup
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                row
                            >
                                <FormControlLabel
                                    value="Questionário Médico"
                                    label="Questionário Médico"
                                    control={<Radio />}
                                />
                                <FormControlLabel
                                    value="Hábitos e Histórico Familiar"
                                    label="Hábitos e Histórico Familiar"
                                    control={<Radio />}
                                />
                            </RadioGroup>
                        </FormControl>
                        <Typography
                            variant="h6"
                        >
                            Sub Perguntas
                        </Typography>
                        {
                            subPerguntas.map((subPergunta, index) => (
                                <Box>
                                    <Typography
                                        variant="body2"
                                        key={index}>
                                        {subPergunta.texto}
                                        <Tooltip title="Remover Sub Pergunta">
                                            <IconButton
                                                onClick={() => {
                                                    setSubPerguntas(subPerguntas.filter((_, i) => i !== index))
                                                }}
                                                size="small"
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                    >
                                        Condição: {subPergunta.condicao}
                                    </Typography>
                                    <Typography>
                                        {subPergunta.autismo}
                                    </Typography>
                                </Box>
                            ))
                        }
                        <AdicionarSubPergunta setSubperguntas={setSubPerguntas} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                        variant="contained"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleAdicionarPergunta}
                        color="primary"
                        variant="contained"
                    >
                        Adicionar
                    </Button>
                </DialogActions>
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

export default ModalAdicionarPerguntas