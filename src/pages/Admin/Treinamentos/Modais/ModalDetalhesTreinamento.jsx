import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Chip, TextField, Snackbar, Alert, Tooltip } from "@mui/material"
import { useState } from "react"
import { getByIdTreinamentos, naoPrecisaTreinamento, treinamentoRealizado } from "../../../../_services/treinamento.service";
import { AiOutlineCheck, AiOutlineClose, AiFillFileExcel } from 'react-icons/ai'
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";
import moment from "moment";
import InsightsIcon from '@mui/icons-material/Insights';

const ModalDetalhesTreinamento = ({ nome, id }) => {

    const [open, setOpen] = useState(false)
    const [realizados, setRealizados] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

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

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    const handleFinalizarTreinamento = async (nome) => {
        await treinamentoRealizado({
            idTreinamento: id,
            nome,
            data: moment().format(`YYYY-MM-DD`)
        })
        setFlushHook(true)
        setOpenSnack(true)

    }

    const handleNaoPrecisaTreinamento = async (nome) => {
        await naoPrecisaTreinamento({
            idTreinamento: id,
            nome
        })

        setFlushHook(true)
    }

    const handleAlterarDataTreinamento = async (nome, data) => {
        await treinamentoRealizado({
            idTreinamento: id,
            nome,
            data
        })
        setFlushHook(true)
        setOpenSnack(true)
    }


    const handleReport = () => {

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Colaborador</th>"
        xls += "<th>Status</th>"
        xls += "<th>Data</th>"
        xls += "<th>Nome Treinamento</th>"
        xls += "</tr>"

        for (const user of realizados) {
            xls += "<tr>"
            xls += `<td>${user.nome}</td>`
            xls += `<td>${user.realizado ? 'Finalizado' : 'A fazer'}</td>`
            xls += `<td>${user.data}</td>`
            xls += `<td>${nome}</td>`
            xls += "</tr>"
        }

        xls += "</tbody></table>"

        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = 'relatorio treinamentos.xls'
        a.click()

    }

    return (
        <>
            <Tooltip title={`Detalhes`}>
                <IconButton sx={{ m: 1 }} variant="contained" color="primary" onClick={handleClickOpen}>
                    <InsightsIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {`Treinamento: ${nome}`}
                </DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <Tooltip title='Report'>
                                <Button onClick={handleReport} variant='outlined' color="success" ><AiFillFileExcel /></Button>
                            </Tooltip>
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
                                realizados.map((user, index) => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                {user.nome}
                                            </TableCell>
                                            <TableCell>
                                                <Chip label={user.realizado ? 'Finalizado' : 'A fazer'} color={user.realizado ? 'success' : 'error'} />
                                            </TableCell>
                                            <TableCell width={`150px`}>
                                                {user.data ? <TextField defaultValue={user.data} onChange={(e) => {
                                                    let arrAux = realizados
                                                    arrAux[index].data = e.target.value
                                                    console.log(realizados[index]);
                                                    setRealizados(arrAux)
                                                }} type="date" size="small" fullWidth /> : ''}
                                            </TableCell>
                                            {
                                                !user.realizado ? (
                                                    <>
                                                        <TableCell>
                                                            <IconButton color="success" onClick={() => {
                                                                handleFinalizarTreinamento(user.nome)
                                                            }}>
                                                                <AiOutlineCheck />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color="error" onClick={() => {
                                                                handleNaoPrecisaTreinamento(user.nome)
                                                            }}>
                                                                <AiOutlineClose />
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell>
                                                            <IconButton color="primary" onClick={() => {
                                                                handleAlterarDataTreinamento(user.nome, realizados[index].data)
                                                            }}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color="error" onClick={() => {
                                                                handleNaoPrecisaTreinamento(user.nome)
                                                            }}>
                                                                <AiOutlineClose />
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
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
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Data de Treinamento alterada com sucesso!
                </Alert>
            </Snackbar>

        </>
    )
}

export default ModalDetalhesTreinamento