import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Snackbar, Alert } from "@mui/material"
import { useState } from "react"
import DragAndDrop from "../../../../components/DragAndDrop/DragAndDrop"
import * as XLSX from "xlsx";
import { updateHorarioPonto } from "../../../../_services/user.service";

const ModalHorarioPonto = ({ setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [file, setFile] = useState()
    const [dados, setDados] = useState([])

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const onDrag = async () => {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const result = XLSX.utils.sheet_to_json(worksheet)
        setDados(result)
    }

    const handleUpload = async () => {

        const result = await updateHorarioPonto({ dados })

        if (result) {
            setOpenSnack(true)
            setFlushHook(true)
            setOpen(false)
            setFile(null)
        }
    }

    return (
        <>
            <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleOpen}>Ponto</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Upload do arquivo"}
                </DialogTitle>
                <DialogContent>
                    <DragAndDrop
                        fontColor='green'
                        bgColor='green'
                        text='Arraste ou anexe o arquivo aqui'
                        textOnDrag='Solte o arquivo'
                        textOnDrop={<>
                            <div onMouseEnter={async () => {
                                await onDrag()
                            }} >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Colaborador
                                            </TableCell>
                                            <TableCell>
                                                Banco Horas
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            dados.map(e => {
                                                return (
                                                    <TableRow key={e.NOME}>
                                                        <TableCell>
                                                            {e.NOME}
                                                        </TableCell>
                                                        <TableCell>
                                                            {e.NORMAIS}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        </>}
                        file={file}
                        setFile={setFile}
                    />
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" onClick={handleUpload} autoFocus>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Banco de Horas Atualziado com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalHorarioPonto