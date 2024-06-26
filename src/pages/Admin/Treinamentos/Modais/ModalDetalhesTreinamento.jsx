import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Chip, TextField, Snackbar, Alert, Tooltip, Box } from "@mui/material"
import { useState } from "react"
import { deleteColaboradorDoTreinamento, getByIdTreinamentos, naoPrecisaTreinamento, treinamentoRealizado } from "../../../../_services/treinamento.service";
import { AiOutlineCheck, AiFillFileExcel } from 'react-icons/ai'
import SaveIcon from '@mui/icons-material/Save';
import { useEffect } from "react";
import moment from "moment";
import InsightsIcon from '@mui/icons-material/InsightsOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import { DeleteOutline } from "@mui/icons-material";
import ModalAddUserTreinamentos from "./ModalAddUserTreinamentos";

const ModalDetalhesTreinamento = ({ nome, id }) => {

    const [open, setOpen] = useState(false)
    const [realizados, setRealizados] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const [openSnack, setOpenSnack] = useState(false)
    const [severity, setSeverity] = useState('')
    const [msg, setMsg] = useState('')

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
        setSeverity('success')
        setMsg('Treinamento finalizado com sucesso!')

    }

    const handleNaoPrecisaTreinamento = async (nome, ativo) => {
        await naoPrecisaTreinamento({
            idTreinamento: id,
            nome,
            ativo
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
        setSeverity('success')
        setMsg('Data de Treinamento alterado com sucesso!')
    }

    const handleDeleteColaborador = async (_id) => {
        try {
            await deleteColaboradorDoTreinamento(
                id,
                _id,
            )
            setFlushHook(true)
            setOpenSnack(true)
            setSeverity('success')
            setMsg('Colaborador deletado com sucesso!')
        } catch (error) {
            console.log(error);
            setOpenSnack(true)
            setSeverity('error')
            setMsg('Colaborador não deletado!')
        }
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
                <IconButton sx={{ m: 1 }} variant="contained" color="primary" size='small' onClick={handleClickOpen}>
                    <InsightsIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {`Treinamento: ${nome}`}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                        <Tooltip title='Report'>
                            <Button onClick={handleReport} variant='outlined' color="success" ><AiFillFileExcel /></Button>
                        </Tooltip>
                        <ModalAddUserTreinamentos nome={nome} nomeUsuarios={realizados} id={id} setFlushHook={setFlushHook} flushHook={flushHook} />
                    </Box>
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
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
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
                                                                handleNaoPrecisaTreinamento(user.nome, user.ativo)
                                                            }}>
                                                                {user.ativo ? (<PersonOutlineOutlinedIcon color="primary" />) : (<PersonOffOutlinedIcon color="error" />)}
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color="inherit" href={`${process.env.REACT_APP_API_KEY}/media/certificados/${user.nome}-${id}.pdf`} target='_blank'>
                                                                {user.anexado ? (<FeedOutlinedIcon color="inherit" />) : (<FeedOutlinedIcon color="error" />)}
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color="secondary" onClick={() => { handleDeleteColaborador(user.id) }}>
                                                                <DeleteOutline />
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
                                                                <PersonOffOutlinedIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color="inherit" href={`${process.env.REACT_APP_API_KEY}/media/certificados/${user.nome}-${id}.pdf`} target='_blank'>
                                                                {user.anexado ? (<FeedOutlinedIcon color="inherit" />) : (<FeedOutlinedIcon color="error" />)}
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton color="secondary" onClick={() => { handleDeleteColaborador(user.id) }}>
                                                                <DeleteOutline />
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
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={severity} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalDetalhesTreinamento