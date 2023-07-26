import { IconButton, TableRow, TableCell, Collapse, Box, Table, TableHead, TableBody, Button, Dialog, DialogTitle, DialogContent, Typography, FormControl, Select, InputLabel, MenuItem, DialogActions, CircularProgress } from "@mui/material"
import { useState, useEffect } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { devolverProtocoloInativo, getPedidosPorPacote } from "../../_services/rsd.service";
import moment from "moment";
import TabelaPedidoRsd from "../TabelaPedido/TabelaPedidoRsd";

function Row(props) {

    const { row, pedidos, pacote, flushHook } = props

    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [motivoInativo, setMotivoInativo] = useState('Devolvido')

    const handleCloseDialog = () => {

        setOpenDialog(false)

    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleInativar = async () => {

        setLoading(true)

        await devolverProtocoloInativo({
            pacote,
            protocolo: row.protocolo
        })

        handleCloseDialog()
        setLoading(false)
        flushHook(true)
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
                <TableCell align="center">
                    {row.protocolo}
                </TableCell>
                <TableCell align="center">
                    {moment(row.dataSolicitacao).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align="center">
                    {moment(row.dataPagamento).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align="center">
                    {row.statusProtocolo}
                </TableCell>
                <TableCell>
                    <Button onClick={handleOpenDialog} sx={{ bgcolor: '#616161', ":hover": { bgcolor: '#424242' } }} size="small" variant="contained">Inativar</Button>
                </TableCell>
            </TableRow>
            <TabelaPedidoRsd open={open} protocolo={row.protocolo} pedidos={pedidos} pacote={pacote} flushHook={flushHook} />
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
        </>
    )
}

const TabelaProtocoloRsd = (props) => {

    const { open, pacote, pedidos, verificaPacote, finalizados, flushHook } = props

    const [protocolos, setProtocolos] = useState([])

    useEffect(() => {

        let arrAuxProtocolos = []

        getPedidosPorPacote(pacote).then(value => {
            arrAuxProtocolos = value.pedidos
            arrAuxProtocolos = arrAuxProtocolos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            console.log(arrAuxProtocolos);

            setProtocolos(arrAuxProtocolos)
        })

    }, [])

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                <Collapse in={open} timeout='auto' unmountOnExit >
                    <Box sx={{ margin: 1 }}>
                        <Table size="small" >
                            <TableHead className="table-header">
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="center">Número Protocolo</TableCell>
                                    <TableCell align="center">Data Solicitação</TableCell>
                                    <TableCell align="center">Data Pagamento</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    protocolos.map(protocolo => {
                                        return (
                                            <Row row={protocolo} pedidos={pedidos} pacote={pacote} flushHook={flushHook} />
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}

export default TabelaProtocoloRsd