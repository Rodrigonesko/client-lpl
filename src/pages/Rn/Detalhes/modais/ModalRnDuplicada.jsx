import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { HiDuplicate } from "react-icons/hi";
import { rnDuplicada } from "../../../../_services/teleEntrevista.service";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalRnDuplicada = (props) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const duplicada = async () => {

        await rnDuplicada({ id: props.id })
        handleClose()
        props.flushHook(true)
    }

    return (
        <>
            <Button style={{ marginLeft: '18px' }} startIcon={<HiDuplicate />} variant="contained" color='warning' onClick={handleClickOpen}>
                Duplicada
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
                        Você tem certeza de que a proposta <strong>{props.proposta}</strong> está duplicada?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" color="warning" onClick={duplicada}>Duplicada</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalRnDuplicada