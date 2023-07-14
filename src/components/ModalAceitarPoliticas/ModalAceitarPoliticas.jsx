import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControlLabel, Checkbox, Alert, Snackbar } from "@mui/material"
import { useState } from "react";
import { lerPolitica } from "../../_services/user.service";

const ModalAceitarPoliticas = ({ open, setOpen, idPolitica, setFlushHook }) => {

    const [deAcordo, setDeAcordo] = useState(true)
    const [openSnack, setOpenSnack] = useState(false)

    const handleAceitar = async () => {
        await lerPolitica({ id: idPolitica._id })
        setOpenSnack(true)
        setFlushHook(true)
        handleClose()
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                fullWidth
                maxWidth={'xl'}
                style={{ maxHeight: '100vh' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <DialogTitle id="alert-dialog-title">
                    {idPolitica.nome}
                </DialogTitle>
                <DialogContent sx={{ height: '85vh' }} >
                    <object data={`${process.env.REACT_APP_API_KEY}/media${idPolitica.arquivo}`} type='application/pdf' height='100%' width='100%'>
                        PDF
                    </object>
                </DialogContent>
                <DialogActions>
                    <FormControlLabel control={<Checkbox checked={!deAcordo} onChange={e => setDeAcordo(!deAcordo)} />} label="Declaro que li e estou de acordo com as condições" />
                    <Button variant="contained" color="inherit" onClick={handleClose}>Fechar</Button>
                    <Button disabled={deAcordo} variant="contained" onClick={handleAceitar} autoFocus>
                        Aceitar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Política lida com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalAceitarPoliticas