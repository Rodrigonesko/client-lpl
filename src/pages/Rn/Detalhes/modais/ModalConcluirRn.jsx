import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { AiOutlineCheck } from 'react-icons/ai'
import { concluirRn } from "../../../../_services/teleEntrevista.service";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalConcluirRn = (props) => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccess = async () => {

        await concluirRn({
            id: props.id,
            email: props.email,
            dataContato1: props.data1,
            dataContato2: props.data2,
            dataContato3: props.data3,
            horarioContato1: props.horario1,
            horarioContato2: props.horario2,
            horarioContato3: props.horario3,
            observacoes: props.observacoes
        })
        handleClose()
        props.flushHook(true)
    }

    return (
        <>
            <Button style={{ marginLeft: '18px' }} startIcon={<AiOutlineCheck />} variant="contained" color='success' onClick={handleClickOpen}>
                Concluir
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
                        Anexou no SisAmil?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color='inherit' onClick={handleClose}>Fechar</Button>
                    <Button variant="contained" color="success" onClick={handleSuccess}>Concluir</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalConcluirRn