import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { MdOutlineSmsFailed } from 'react-icons/md'
import { cancelarRn } from "../../../../_services/teleEntrevista.service";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalCancelarRn = (props) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = async () => {

        await cancelarRn({id: props.id})
        handleClose()
        props.flushHook(true)
    }

    return (
        <>
            <Button style={{ marginLeft: '18px' }} startIcon={<MdOutlineSmsFailed />} variant="contained" color='error' onClick={handleClickOpen}>
                Sem sucesso
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Cancelar RN?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Você deseja cancelar a proposta {props.proposta} como sem sucesso de contato?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" color="error" onClick={handleCancel}>Sem sucesso</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalCancelarRn