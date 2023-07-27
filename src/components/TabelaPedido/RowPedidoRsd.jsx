import { TableRow, TableCell, TextField, Typography, Button, Checkbox, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, CircularProgress, FormControlLabel, Tooltip } from "@mui/material"
import { buscarClinica, devolverPedido, editarPedido, prioridadeDossie, voltarFasePedido } from "../../_services/rsd.service"
import { useState, useEffect } from "react"
import { AiOutlineRollback } from 'react-icons/ai'

const RowPedidoRsd = ({ pedido, flushHook, checkPedidos, setCheckPedidos }) => {

    const [numero, setNumero] = useState(pedido.numero)
    const [valorApresentado, setValorApresentado] = useState(pedido.valorApresentado)
    const [cnpj, setCnpj] = useState(pedido.cnpj)
    const [clinica, setClinica] = useState(pedido.clinica)
    const [nf, setNf] = useState(pedido.nf)
    const [motivoInativo, setMotivoInativo] = useState('Devolvido')
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [check, setCheck] = useState(false)
    const [prioridade, setPrioridade] = useState(pedido.prioridadeDossie)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const buscaClinica = async (cnpj) => {
        try {

            const result = await buscarClinica({ cnpj })

            if (result.clinica) {
                setClinica(result.clinica.descricao)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleEditarPedido = async () => {
        try {

            await editarPedido({
                pedido: pedido._id,
                pedidoEditado: numero,
                nf,
                cnpj,
                clinica,
                valorApresentado,
            })

            setOpen(true)

        } catch (error) {
            console.log(error);
        }
    }

    const handleInativar = async () => {

        setLoading(true)

        await devolverPedido({
            id: pedido._id,
            motivoInativo
        })

        setLoading(false)
        flushHook(true)
        handleCloseDialog()
    }

    const handleAdicionarPedidoPacote = (e) => {
        if (e.target.checked) {
            const novoArray = [...checkPedidos]
            novoArray.push(pedido._id)
            setCheckPedidos(novoArray)

        } else {
            const novoArray = checkPedidos.filter(id => {
                return pedido._id !== id
            })

            setCheckPedidos(novoArray)
        }
    }

    const verifyChecked = () => {

        if (checkPedidos) {
            if (checkPedidos.some(id => pedido._id === id)) {
                setCheck(true)
            } else {
                setCheck(false)
            }
        }
    }

    const handlePrioridadeDossie = async () => {
        setPrioridade(!prioridade)
        const res = await prioridadeDossie({
            pedido: numero,
            prioridade: !prioridade
        })

        flushHook(true)
        console.log(res);
    }

    const handleVoltarFase = async () => {
        voltarFasePedido({
            pedido: numero
        })
        flushHook(true)
    }

    useEffect(() => {
        verifyChecked()
    }, [JSON.stringify(checkPedidos)])

    return (
        <TableRow>
            <TableCell>
                <TextField onChange={e => setNumero(e.target.value)} value={numero} inputProps={{
                    style: { fontSize: '14px', padding: '4px', width: '80px' }
                }} />
            </TableCell>
            <TableCell>{pedido.status}</TableCell>
            <TableCell>
                <TextField size="small" onChange={e => setValorApresentado(e.target.value)} value={valorApresentado} inputProps={{
                    style: { fontSize: '14px', padding: '4px', width: '80px' }
                }} />
            </TableCell>
            <TableCell>{pedido.valorReembolsado}</TableCell>
            <TableCell>
                <TextField onChange={e => {
                    setCnpj(e.target.value)
                    buscaClinica(e.target.value)
                }} size="small" value={cnpj} inputProps={{
                    style: { fontSize: '14px', padding: '4px', width: '80px' }
                }} />
            </TableCell>
            <TableCell>
                <TextField onChange={e => setClinica(e.target.value)} size="small" value={clinica} inputProps={{
                    style: { fontSize: '14px', padding: '4px', width: '80px' }
                }} />
            </TableCell>
            <TableCell>
                <TextField onChange={e => setNf(e.target.value)} size="small" value={nf} inputProps={{
                    style: { fontSize: '14px', padding: '4px', width: '80px' }
                }} />
            </TableCell>
            {
                pedido.fase !== 'Finalizado' ? (
                    <>
                        <TableCell>
                            <Button color="success" size="small" onClick={handleEditarPedido} >Salvar</Button>
                        </TableCell>
                        <TableCell>
                            <Button color='inherit' size="small" onClick={handleOpenDialog} >Inativar</Button>
                        </TableCell>
                    </>
                ) : (
                    <>
                        <TableCell>
                            <Tooltip title='Voltar fase'>
                                <Button onClick={handleVoltarFase} variant="contained" color='warning'><AiOutlineRollback /></Button>
                            </Tooltip>
                        </TableCell>
                        <TableCell>

                        </TableCell>
                    </>
                )
            }

            <TableCell>{pedido.fila}</TableCell>
            {
                pedido.statusPacote === 'Não iniciado' ? (

                    <TableCell>
                        <Checkbox checked={check} onChange={handleAdicionarPedidoPacote} />
                    </TableCell>

                ) : (
                    <TableCell>
                        <FormControlLabel control={<Checkbox checked={prioridade} />} label='Prioridade Dossiê' onChange={handlePrioridadeDossie} />
                    </TableCell>
                )
            }
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose} >
                <Alert variant="filled" onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
                    Pedido editado com sucesso
                </Alert>
            </Snackbar>
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
            </Dialog>
        </TableRow>
    )
}

export default RowPedidoRsd