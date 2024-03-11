import { Add, Delete } from "@mui/icons-material"
import { Button, Dialog, TextField, Box, DialogTitle, DialogContent, DialogActions, TableContainer, Table, TableHead, TableRow, TableCell, Tab, TableBody, IconButton } from "@mui/material"
import { green } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getAllWhatsappNumbers, deleteWhatsappNumber, createWhatsappNumber } from "../../../_services/whatsapp.service"
import Toast from "../../../components/Toast/Toast"

const ModalNumeros = () => {

    const [open, setOpen] = useState(false)
    const [whatsappNumbers, setWhatsappNumbers] = useState([])
    const [nome, setNome] = useState('')
    const [numero, setNumero] = useState('')
    const [celula, setCelula] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [severity, setSeverity] = useState('success')
    const [flushHook, setFlushHook] = useState(false)

    const handleCreateWhatsappNumber = async () => {
        try {
            await createWhatsappNumber({ nome, numero, celula })
            setMessageToast('Número adicionado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setOpen(false)
            setNome('')
            setNumero('')
            setCelula('')
            setFlushHook(prev => !prev)
        } catch (error) {
            setMessageToast('Erro ao adicionar número')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    const handleDeleteWhatsappNumber = async (id) => {
        await deleteWhatsappNumber(id)
        setFlushHook(prev => !prev)
    }

    useEffect(() => {
        const fetch = async () => {
            const result = await getAllWhatsappNumbers()
            console.log(result);
            setWhatsappNumbers(result)
        }

        fetch()
    }, [flushHook])

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: green[500],
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: green[700]
                    }
                }}
                endIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Adicionar Whatsapp
            </Button>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
            >
                <DialogTitle>
                    Adicionar Whatsapp
                </DialogTitle>
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
                            label="Nome"
                            variant="outlined"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <TextField
                            label="Número"
                            variant="outlined"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                        <TextField
                            label="Celula"
                            variant="outlined"
                            value={celula}
                            onChange={(e) => setCelula(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: green[500],
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: green[700]
                                }
                            }}
                            onClick={handleCreateWhatsappNumber}
                        >
                            Adicionar
                        </Button>
                        <TableContainer>
                            <Table
                                size="small"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nome
                                        </TableCell>
                                        <TableCell>
                                            Número
                                        </TableCell>
                                        <TableCell>
                                            Celula
                                        </TableCell>
                                        <TableCell>

                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        whatsappNumbers.map((whatsappNumber) => (
                                            <TableRow
                                                key={whatsappNumber._id}
                                            >
                                                <TableCell>
                                                    {whatsappNumber.nome}
                                                </TableCell>
                                                <TableCell>
                                                    {whatsappNumber.numero}
                                                </TableCell>
                                                <TableCell>
                                                    {whatsappNumber.celula}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDeleteWhatsappNumber(whatsappNumber._id)}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                </DialogActions>
            </Dialog>

            <Toast
                open={openToast}
                message={messageToast}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </>
    )
}

export default ModalNumeros