import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControlLabel, Checkbox, FormGroup, TextField } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PatologiaElegibilidade = () => {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant='contained' onClick={handleClickOpen} >Marcação de Patologia</Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Marcação de Patologia</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label='Obesidade' />
                            <FormControlLabel control={<Checkbox />} label='Autismo' />
                            <FormControlLabel control={<Checkbox />} label='Crônicos' />
                            <TextField multiline rows={2} />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='inherit' >Fechar</Button>
                    <Button onClick={handleClose} color="success" >Salvar</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default PatologiaElegibilidade