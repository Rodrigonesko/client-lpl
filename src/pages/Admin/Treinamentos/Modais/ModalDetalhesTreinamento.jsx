import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Chip } from "@mui/material"
import { useState } from "react"
import { getByIdTreinamentos, treinamentoRealizado } from "../../../../_services/treinamento.service";
import { AiOutlineCheck } from 'react-icons/ai'
import { useEffect } from "react";
import moment from "moment";

const ModalDetalhesTreinamento = ({ nome, id }) => {

    const [open, setOpen] = useState(false)
    const [realizados, setRealizados] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
        fetchData()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const result = await getByIdTreinamentos(id)
        setRealizados(result.realizados)
    }

    const handleFinalizarTreinamento = async (nome) => {
        await treinamentoRealizado({
            idTreinamento: id,
            nome
        })
        setFlushHook(true)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} size="small">Detalhes</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Treinamento: ${nome}`}
                </DialogTitle>
                <DialogContent sx={{ minWidth: '400px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Colaborador
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Data
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                realizados.map(user => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                {user.nome}
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={user.realizado ? 'Finalizado' : 'A fazer'} color={user.realizado ? 'success' : 'error'} />
                                            </TableCell>
                                            <TableCell>
                                                {user.data ? moment(user.data).format('DD/MM/YYYY') : ''}
                                            </TableCell>
                                            {
                                                !user.realizado && (
                                                    <TableCell>
                                                        <IconButton color="success" onClick={() => {
                                                            handleFinalizarTreinamento(user.nome)
                                                        }}>
                                                            <AiOutlineCheck />
                                                        </IconButton>
                                                    </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalDetalhesTreinamento