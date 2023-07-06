import { forwardRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Alert, Snackbar } from "@mui/material";
import { semDocumentos } from "../../../../_services/elegibilidade.service";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalSemDocumentos = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSemDocumentos = async () => {

        setOpenSnack(true)

        await semDocumentos({
            id
        })

        setTimeout(() => {
            navigate('/elegibilidade/analise')
        }, '1000')

    }

    return (
        <>
            <Button color="warning" variant='contained' onClick={handleClickOpen} >Sem documentos</Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Sem Documentos</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Mandar para a fase de falta de documentos
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='inherit' >Fechar</Button>
                    <Button onClick={handleSemDocumentos} color="warning" >Salvar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert variant="filled" onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Enviado para a fase de sem documentação com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalSemDocumentos