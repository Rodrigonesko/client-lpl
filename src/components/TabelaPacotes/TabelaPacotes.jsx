import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Tooltip, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from "react"
import moment from "moment";
import { FaHandPaper, FaRegEye } from 'react-icons/fa'
import { MdBlockFlipped } from 'react-icons/md'
import TabelaProtocoloRsd from "../TabelaProtocolo/TabelaProtocoloRsd";
import { assumirPacote, devolverPacote } from "../../_services/rsd.service";

function Row(props) {

    const { row, pedidos, flushHook, verificaPacote, finalizados } = props

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [loading, setLoading] = useState(false)
    const [motivoInativo, setMotivoInativo] = useState('Devolvido')
    const [msg, setMsg] = useState('')

    const handleAssumirPacote = async () => {

        assumirPacote({
            pacote: row.pacote
        })

        setMsg('Pacote assumido com sucesso!')
        setOpenSnack(true)
        flushHook(true)

    }

    const handleInativar = async () => {

        setLoading(true)

        await devolverPacote({
            pacote: row.pacote,
            motivoInativo
        })

        setMsg('Pacote inativado com sucesso!')
        setOpenSnack(true)
        setLoading(false)
        flushHook(true)
        handleCloseDialog()
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align='center' component="th" scope="row" >
                    {row.pacote}
                </TableCell>
                <TableCell align='center' component="th" scope="row" >
                    {moment(row.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='center' component="th" scope="row" >
                    {row.statusPacote}
                </TableCell>
                <TableCell align='center' component="th" scope="row">
                    {row.analista}
                </TableCell>
                <TableCell align='center' component="th" scope="row">
                    <Tooltip title='Assumir'>
                        <Button onClick={handleAssumirPacote} variant="contained"><FaHandPaper /></Button>
                    </Tooltip>
                </TableCell>
                <TableCell align='center' component="th" scope="row">
                    <Tooltip title='Inativar'>
                        <Button onClick={handleOpenDialog} sx={{ bgcolor: '#616161', ":hover": { bgcolor: '#424242' } }} variant="contained"><MdBlockFlipped /></Button>
                    </Tooltip>
                </TableCell>
                <TableCell align='center' component="th" scope="row">
                    <Tooltip title='Verificar Processamento'>
                        <Button href={`/rsd/ProcessamentoPacote/${row.mo}/${row.pacote}`} sx={{ bgcolor: '#3f51b5', ":hover": { bgcolor: '#303f9f' } }} variant="contained"><FaRegEye /></Button>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TabelaProtocoloRsd open={open} pacote={row.pacote} pedidos={pedidos} flushHook={flushHook} />
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Inativar
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Motivo de inativação
                    </Typography>
                    <FormControl fullWidth style={{ marginTop: '20px' }}>
                        <InputLabel>Motivo inativo</InputLabel>
                        <Select
                            label='Motivo inativo'
                            value={motivoInativo}
                            onChange={(e) => {
                                setMotivoInativo(e.target.value)
                            }}
                        >
                            <MenuItem>
                                <em>
                                    Motivo Inativo
                                </em>
                            </MenuItem>
                            <MenuItem value='Devolvido'>
                                Devolvido
                            </MenuItem>
                            <MenuItem value='Duplicidade'>
                                Duplicidade
                            </MenuItem>
                            <MenuItem value='Vip'>
                                Vip
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} disabled={loading} variant="contained" color="inherit">Fechar</Button>
                    <Button startIcon={loading ? <CircularProgress size='20px' /> : null} disabled={loading} onClick={handleInativar} variant="contained" >
                        Inativar
                    </Button>
                </DialogActions>
            </Dialog >
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert variant="filled" onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )

}

const TabelaPacotes = (props) => {

    const { pacotes, pedidos, verificaPacote, finalizados, flushHook } = props

    return (
        <TableContainer>
            <Table className="table">
                <TableHead className="table-header">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align='center'>ID LPL</TableCell>
                        <TableCell align='center'>ANS</TableCell>
                        <TableCell align='center'>Status</TableCell>
                        <TableCell align='center'>Analista</TableCell>
                        <TableCell align='center'></TableCell>
                        <TableCell align='center'></TableCell>
                        <TableCell align='center'></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pacotes.map(pacote => {
                            if (pacote.statusPacote !== 'Não iniciado' && pacote.statusPacote !== 'Finalizado' && pacote.statusPacote !== 'Cancelado' && pacote.statusPacote !== 'Comprovante Correto') {
                                return (
                                    <Row row={pacote} pedidos={pedidos} verificaPacote={verificaPacote} finalizados={finalizados} flushHook={flushHook} />
                                )
                            }
                        })
                    }
                </TableBody>
            </Table>

        </TableContainer>
    )

}

export default TabelaPacotes