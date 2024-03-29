import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { createItemChecklist } from "../../../_services/sindicancia.service"

const ModalAdicionarItem = ({
    setFlushHook
}) => {

    const [open, setOpen] = useState(false)
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAdcionar = async () => {
        setLoading(true)
        await createItemChecklist({
            item: nome,
            descricao
        })
        setFlushHook(prev => !prev)
        setOpen(false)
        setDescricao('')
        setNome('')
        setLoading(false)
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Adicionar Item
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: 600,
                    }
                }}
            >
                <DialogTitle>
                    Adicionar Item
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Nome
                    </Typography>
                    <TextField
                        fullWidth
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        disabled={loading}
                    />
                    <Typography>
                        Descrição
                    </Typography>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                            mb: 2,
                            mt: 1
                        }}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        disabled={loading}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAdcionar}
                        disabled={loading}

                    >
                        {
                            loading ? 'Adicionando...' : 'Adicionar'
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalAdicionarItem