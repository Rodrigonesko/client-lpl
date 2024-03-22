import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from "react";
import DataAgenda from "./DataAgenda";

const ModalVisualizarDatas = ({ datasAgenda, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleOpen = async () => {
        setOpen(true)
    }

    const handleClose = async () => {
        setOpen(false)
    }

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
                                                <DataAgenda
                                                    item={item}
                                                    setOpenSnack={setOpenSnack}
                                                    setOpen={setOpen}
                                                    setFlushHook={setFlushHook}
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
                    <Button onClick={handleClose} >Fechar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Dados atualizado com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalVisualizarDatas