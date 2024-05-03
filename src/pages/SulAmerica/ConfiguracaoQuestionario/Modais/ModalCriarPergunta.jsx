import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import Toast from "../../../../components/Toast/Toast"
import { Delete } from "@mui/icons-material"
import AdicionarSubPergunta from "./AdicionarSubPergunta"
import AdicionarOpcoes from "./AdicionarOpções"
import { criarPergunta } from "../../../../_services/sulAmerica.service"
import { tiposPergunta } from "../utils/tiposPergunta"
import { categorias } from "../utils/categorias"

const ModalCriarPergunta = ({ setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [pergunta, setPergunta] = useState('')
    const [tipo, setTipo] = useState('')
    const [categoria, setCategoria] = useState('')
    const [subPerguntas, setSubPerguntas] = useState([])
    const [opcoes, setOpcoes] = useState([])

    const handleAdicionarPergunta = async () => {
        try {
            setLoading(true)
            await criarPergunta({
                pergunta,
                tipo: tipo.toUpperCase(),
                categoria: categoria.toUpperCase(),
                subPerguntas,
                opcoes,
                // opcoesSubPergunta
            })
            setOpen(false)
            setOpenToast(true)
            setMessage('Pergunta adicionada com sucesso')
            setSeverity('success')
            setFlushHook(prev => !prev)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao adicionar pergunta')
            setSeverity('error')
            setLoading(false)
        }

    }

    return (
        <Box sx={{
            mt: 2,
            mb: 2
        }}>
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
                            <FormLabel>Tipo de Pergunta</FormLabel>
                            <RadioGroup
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                row
                            >
                                {
                                    tiposPergunta.map((tipo, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={tipo}
                                            control={<Radio />}
                                            label={tipo}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        {tipo === 'Opções' && (
                            <>
                                <Divider />
                                <Typography
                                    variant="h6"
                                >
                                    Opções
                                </Typography>
                                {
                                    opcoes.map((opcao, index) => (
                                        <Typography
                                            variant="body2"
                                            key={index}>
                                            {opcao}
                                            <Tooltip title="Remover Opção">
                                                <IconButton
                                                    onClick={() => {
                                                        setOpcoes(opcoes.filter((_, i) => i !== index))
                                                    }}
                                                    size="small"
                                                    color="error"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Tooltip>
                                        </Typography>
                                    ))
                                }
                                <AdicionarOpcoes setOpcoes={setOpcoes} />
                            </>
                        )}
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            <RadioGroup
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                row
                            >
                                {
                                    categorias.map((categoria, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={categoria}
                                            control={<Radio />}
                                            label={categoria}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        {
                            tipo === 'Escolha' && (
                                <>
                                    <Divider />
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
                                            </Box>
                                        ))
                                    }
                                    <AdicionarSubPergunta setSubperguntas={setSubPerguntas} />
                                </>
                            )
                        }
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

        </Box>
    )
}

export default ModalCriarPergunta