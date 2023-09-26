import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useState } from "react"
import { getFeriasElegiveis } from "../../../../_services/user.service"

const ModalFeriasElegiveis = () => {

    const [open, setOpen] = useState(false)
    const [colaboradores, setColaboradores] = useState([])

    const handleClickOpen = () => {
        setOpen(true)
        fetchData()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const fetchData = async () => {
        const result = await getFeriasElegiveis()

        setColaboradores(result)
    }

    return (
        <>
            <Button sx={{ ml: '20px' }} onClick={handleClickOpen} >Vencimentos</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Vencimentos
                </DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Colaborador
                                    </TableCell>
                                    <TableCell>
                                        Ano Férias
                                    </TableCell>
                                    <TableCell>
                                        Ano Vencimento
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    colaboradores.map(colaborador => {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    {colaborador.nome}
                                                </TableCell>
                                                <TableCell>
                                                    {colaborador.anoFerias}
                                                </TableCell>
                                                <TableCell>
                                                    {colaborador.vencimento}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalFeriasElegiveis