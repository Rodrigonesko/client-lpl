import { Add, Delete } from "@mui/icons-material"
import { Box, Button, Dialog, IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useState } from "react"
import { createTipoIrregularidade, deleteTipoIrregularidade, getTipoIrregularidade } from "../../../_services/sindicancia.service"

const ModalCriarTipoIrregularidade = () => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [nome, setNome] = useState('')
    const [irregularidades, setIrregularidades] = useState([])

    const handleClickOpen = async () => {
        setOpen(true)
        setLoading(true)
        const result = await getTipoIrregularidade()
        setIrregularidades(result)
        setLoading(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async () => {
        setLoadingButton(true)
        const result = await createTipoIrregularidade({
            irregularidade: nome
        })
        console.log(result);
        setIrregularidades([...irregularidades, { nome, id: result.id }])
        setNome('')
        setLoadingButton(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)
        const result = await deleteTipoIrregularidade(id)
        console.log(result);
        setIrregularidades(irregularidades.filter(irregularidade => irregularidade.id !== id))
        setLoading(false)
    }

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                sx={{
                    ml: 2
                }}
            >
                Irregularidades
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        padding: '20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '10px'
                        }}
                    >
                        <TextField
                            label="Nome"
                            type="text"
                            id="nome"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            size="small"
                            fullWidth
                            variant="standard"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={loadingButton}
                            onClick={handleSubmit}
                        >
                            <Add />
                        </Button>
                    </Box>
                    <TableContainer>
                        <Table
                            size='small'
                        >
                            <TableHead
                                sx={{
                                    backgroundColor: '#f5f5f5'
                                }}
                            >
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    !loading ? (irregularidades.map((irregularidade, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{irregularidade.nome}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => handleDelete(irregularidade.id)}
                                                    color="error"
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (
                                        <TableRow>
                                            <TableCell colSpan={2}><LinearProgress /></TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        >
                            Fechar
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}
export default ModalCriarTipoIrregularidade;
