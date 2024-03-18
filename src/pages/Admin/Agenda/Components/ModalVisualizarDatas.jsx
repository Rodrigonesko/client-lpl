import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect, useState } from "react";
import moment from "moment";

const ModalVisualizarDatas = ({ datasAgenda, setDatasAgenda, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [data, setData] = useState(datasAgenda?.proximasDatas.map(item => item.data))

    const handleOpen = async () => {
        setOpen(true)
    }

    const handleClose = async () => {
        setOpen(false)
    }

    // const handleUpdate = async () => {
    //     const find = await setData()
    //     console.log(find.proximasDatas.data);
    //     setDatasAgenda(find)
    //     setFlushHook(true)
    //     setOpenSnack(true)
    //     handleClose()
    // }

    return (
        <>
            <Tooltip title='Editar Datas' >
                <IconButton onClick={handleOpen} color='secondary' ><EditOutlinedIcon /></IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Verificar Datas"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Data
                                    </TableCell>
                                    <TableCell>
                                        Concluido
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (datasAgenda?.proximasDatas || []).map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <TextField label='Data' type='date' size='small' value={item.data} onChange={(e) => { setData(e.target.value) }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    InputProps={{
                                                        style: {
                                                            borderRadius: '10px'
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item.concluido === true ? <Chip label='Sim' color='success' ></Chip> : <Chip label='Não' color='error' ></Chip>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleClose} color='error' autoFocus>Deletar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Treinamento deletado com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalVisualizarDatas