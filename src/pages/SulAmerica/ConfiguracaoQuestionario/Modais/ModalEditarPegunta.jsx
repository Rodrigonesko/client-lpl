import { Delete, Edit } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { tiposPergunta } from "../utils/tiposPergunta"
import { categorias } from "../utils/categorias"
import Toast from "../../../../components/Toast/Toast"
import AdicionarOpcoes from "./AdicionarOpções"
import AdicionarSubPergunta from "./AdicionarSubPergunta"
import { atualizarPergunta } from "../../../../_services/sulAmerica.service"

const ModalEditarPergunta = ({ pergunta }) => {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState(pergunta)
    const [opcoes, setOpcoes] = useState(data.opcoes)
    const [subPerguntas, setSubPerguntas] = useState(data.subPerguntas)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const handleAtualizarPergunta = async () => {
        try {
            if (data.pergunta === '') {
                setOpenToast(true)
                setMessage('Preencha todos os campos')
                setSeverity('error')
                return
            }

            if (data.tipo === 'OPÇÕES' && opcoes.length === 0) {
                setOpenToast(true)
                setMessage('Adicione pelo menos uma opção')
                setSeverity('error')
                return
            }

            await atualizarPergunta(data._id, {
                ...data,
                opcoes,
                subPerguntas
            })

            setOpen(false)
            setOpenToast(true)
            setMessage('Pergunta adicionada com sucesso')
            setSeverity('success')

        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao atualizar pergunta')
            setSeverity('error')
        }
    }

    return (
        <>
            <Tooltip title="Editar pergunta">
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <Edit />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogTitle>Editar Pergunta</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
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
                            rows={2}
                            value={data.pergunta}
                            onChange={(e) => setData({ ...data, pergunta: e.target.value })}
                        />
                        <FormControl>
                            <FormLabel>Tipo de Pergunta</FormLabel>
                            <RadioGroup
                                value={data.tipo}
                                onChange={(e) => setData({ ...data, tipo: e.target.value })}
                                row
                            >
                                {
                                    tiposPergunta.map((tipo, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={tipo.toUpperCase()}
                                            control={<Radio />}
                                            label={tipo}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        {
                            data.tipo === 'OPÇÕES' && (
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
                                                key={index}
                                                variant="body1"
                                            >
                                                {opcao}
                                                <Tooltip title="Remover opção">
                                                    <IconButton
                                                        onClick={() => {
                                                            setOpcoes((prev) => prev.filter((item) => item !== opcao))
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
                            )
                        }
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            <RadioGroup
                                value={data.categoria}
                                onChange={(e) => setData({ ...data, categoria: e.target.value })}
                                row
                            >
                                {
                                    categorias.map((categoria, index) => (
                                        <FormControlLabel
                                            key={`${categoria}-${index}`}
                                            value={categoria.toUpperCase()}
                                            control={<Radio />}
                                            label={categoria}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                        {
                            data.tipo === 'ESCOLHA' && (
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
                        color="inherit"
                        variant="contained"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleAtualizarPergunta}
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark'
                            }
                        }}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </>
    )
}

export default ModalEditarPergunta