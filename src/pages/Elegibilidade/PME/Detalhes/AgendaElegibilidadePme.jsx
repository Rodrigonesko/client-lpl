import { Box, Paper, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { AiOutlineSend } from 'react-icons/ai'
import { adicionaComentarioElegibilidadePme, getAgendaElegibilidadePmePorProposta } from "../../../../_services/elegibilidadePme.service"
import moment from "moment"

const AgendaElegibilidadePme = ({ proposta }) => {

    const [agenda, setAgenda] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [comentario, setComentario] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const fetchData = async () => {
        const result = await getAgendaElegibilidadePmePorProposta(proposta)
        setAgenda(result)

    }

    const handleAdicionarComnentario = async () => {

        await adicionaComentarioElegibilidadePme({
            proposta,
            comentario
        })

        setFlushHook(true)
        setOpen(true)

    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook, proposta])

    return (
        <Box component={Paper} p={2} mt={2} width='100%'>
            <Box width='100%' textAlign='center'>
                <TextField multiline rows={2} placeholder="agenda" value={comentario} onChange={e => setComentario(e.target.value)} />
                <Button onClick={handleAdicionarComnentario} style={{ position: 'relative', top: '25px', marginLeft: '10px' }} variant="contained"><AiOutlineSend /></Button>
            </Box>
            <TableContainer style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Table className="table" style={{ maxWidth: '500px' }}>
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Analista</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Comentario</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            agenda.map(item => {
                                return (
                                    <TableRow>
                                        <TableCell>{item.analista}</TableCell>
                                        <TableCell>{moment(item.data).format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                                        <TableCell>{item.comentario}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Comentario adicionado com sucesso
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default AgendaElegibilidadePme