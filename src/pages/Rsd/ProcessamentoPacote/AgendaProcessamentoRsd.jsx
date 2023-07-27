import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import moment from "moment"
import { useState } from "react"
import { novoParecerAgenda } from "../../../_services/rsd.service"
import { useParams } from "react-router-dom"

const AgendaProcessamentoRsd = ({ agenda, flushHook }) => {

    const { idPacote } = useParams()

    const [open, setOpen] = useState(false)
    const [parecer, setParecer] = useState('')


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeParecer = (e) => {
        setParecer(e.target.value)
    }

    const handleEnviarParecer = async () => {
        await novoParecerAgenda({
            pacote: idPacote,
            parecer
        })

        handleClose()
        flushHook(true)
        setParecer('')
    }

    return (
        <Box>
            <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                Agenda
            </Typography>
            <TableContainer>
                <Table className="table">
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Analista</TableCell>
                            <TableCell>Parecer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            agenda.map(item => {
                                return (
                                    <TableRow key={item._id}>
                                        <TableCell>{moment(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{item.usuario}</TableCell>
                                        <TableCell>{item.parecer}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleClickOpen} size="small" sx={{ mt: 2, ml: 1 }}>Escrever</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Inserir Parecer
                </DialogTitle>
                <DialogContent>
                    <TextField multiline rows={3} value={parecer} onChange={handleChangeParecer} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" size="small" onClick={handleEnviarParecer} autoFocus>
                        Inserir
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

}

export default AgendaProcessamentoRsd