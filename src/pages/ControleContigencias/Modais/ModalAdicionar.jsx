import { Button, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Snackbar, Autocomplete } from "@mui/material"
import { useState } from "react"
import { FaPlus } from 'react-icons/fa'
import DragAndDrop from "../../../components/DragAndDrop/DragAndDrop"
import { uploadContingencias } from "../../../_services/contingencias.service"

const ModalAdicionar = ({ setFlushHook, contingencias }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [file, setFile] = useState()
    const [contingencia, setContingencia] = useState('')
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append('file', file, file.name)

        const result = await uploadContingencias(
            formData,
            contingencia
        )

        if (result.msg === 'ok') {
            setError(false)
            setMsg('Contingencia/Incidente adicionado com sucesso')
            setOpenSnack(true)
            handleClose()
            setFile('')
            setContingencia('')
            setFlushHook(true)
        } else {
            setError(true)
            setMsg('Algo deu errado ou ja existe uma politica com esse nome e versão')
            setOpenSnack(true)
        }
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} ><FaPlus /></Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Adicionar ou atualizar nova Contingência
                </DialogTitle>
                <DialogContent>
                    <DragAndDrop
                        file={file}
                        setFile={setFile}
                        fontColor={'black'}
                        bgColor={'red'}
                        textOnDrag={'Solte aqui'}
                        text={'Arraste e solte o pdf aqui'}
                        textOnDrop={<object data={file ? URL.createObjectURL(file) : null} type="application/pdf" height={500} >
                            PDF
                        </object>}
                    />
                    <Box mt={2}>
                        <Autocomplete
                            freeSolo
                            options={contingencias}
                            getOptionLabel={(contingencia) => contingencia.nome}
                            onChange={e => {
                                setContingencia(e.target.textContent)
                            }}
                            renderInput={(params) => <TextField {...params} label='Contingencia/Incidente' onChange={e => {
                                setContingencia(e.target.value)
                            }} value={contingencias} />}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" onClick={handleUpload} autoFocus>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={error ? 'error' : 'success'} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalAdicionar