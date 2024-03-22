import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { UpdateFerias } from "../../../../_services/ferias";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ModalEditarFerias = ({ setFlushHook, id, trocaData }) => {

    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false)
    const [data, setData] = useState(trocaData)
    const [textoSnack, setTextoSnack] = useState('')
    const [severitySnack, setSeveritySnack] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            const result = await UpdateFerias({
                _id: id,
                data
            })
            console.log(result)
            setFlushHook(true)
            setOpenSnack(true)
            setSeveritySnack('success')
            setTextoSnack('Texto atualizado com sucesso!')
            setOpen(false)
            return

        } catch (error) {
            console.log(error.response.data.msg);
            setTextoSnack('Erro ao solicitar férias.' + error.response.data.msg)
            setSeveritySnack('error')
            setOpenSnack(true)
        }
    }

    return (
        <>
            <IconButton onClick={handleClickOpen} variant='contained' color="success"><EditOutlinedIcon /></IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Editar Férias Existente"}
                </DialogTitle>
                <DialogContent sx={{ width: '500px' }}>
                    <Box display='flex' flexDirection='column' minHeight='150px' justifyContent='space-around'>
                        <TextField type="date" label='Altere a data de Férias selecionada' size="small" value={data} onChange={e => setData(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                    <Button onClick={handleSave} variant="contained" color="success">
                        Atualizar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity={severitySnack} sx={{ width: '100%' }}>
                    {textoSnack}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalEditarFerias;