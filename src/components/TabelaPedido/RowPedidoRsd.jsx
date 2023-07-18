import { TableRow, TableCell, TextField, Typography, Button, Checkbox, Alert, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { buscarClinica, editarPedido } from "../../_services/rsd.service"
import { useState } from "react"


const RowPedidoRsd = ({ pedido }) => {

    const [numero, setNumero] = useState(pedido.numero)
    const [valorApresentado, setValorApresentado] = useState(pedido.valorApresentado)
    const [cnpj, setCnpj] = useState(pedido.cnpj)
    const [clinica, setClinica] = useState(pedido.clinica)
    const [nf, setNf] = useState(pedido.nf)
    const [motivoInativo, setMotivoInativo] = useState('Devolvido')
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

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

    return (
        <TableRow>
            <TableCell><TextField onChange={e => setNumero(e.target.value)} value={numero} inputProps={{
                style: { fontSize: '14px', padding: '4px', width: '80px' }
            }} /></TableCell>
            <TableCell>{pedido.status}</TableCell>
            <TableCell><TextField size="small" onChange={e => setValorApresentado(e.target.value)} value={valorApresentado} inputProps={{
                style: { fontSize: '14px', padding: '4px', width: '80px' }
            }} /></TableCell>
            <TableCell>{pedido.valorReembolsado}</TableCell>
            <TableCell><TextField onChange={e => {
                setCnpj(e.target.value)
                buscaClinica(e.target.value)
            }} size="small" value={cnpj} inputProps={{
                style: { fontSize: '14px', padding: '4px', width: '80px' }
            }} /></TableCell>
            <TableCell><TextField onChange={e => setClinica(e.target.value)} size="small" value={clinica} inputProps={{
                style: { fontSize: '14px', padding: '4px', width: '80px' }
            }} /></TableCell>
            <TableCell><TextField onChange={e => setNf(e.target.value)} size="small" value={nf} inputProps={{
                style: { fontSize: '14px', padding: '4px', width: '80px' }
            }} /></TableCell>
            <TableCell><Button color="success" size="small" onClick={handleEditarPedido} >Salvar</Button></TableCell>
            <TableCell><Button color='inherit' size="small" onClick={handleOpenDialog} >Inativar</Button></TableCell>
            <TableCell>{pedido.fila}</TableCell>
            <TableCell><Checkbox></Checkbox></TableCell>
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
                    <Button onClick={handleCloseDialog}>Fechar</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
                        Inativar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableRow>
    )
}

export default RowPedidoRsd