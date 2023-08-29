import { forwardRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControlLabel, Checkbox, FormGroup, TextField, Snackbar, Alert } from "@mui/material";
import { createPatologia, getPatologiaById } from "../../_services/patologia.service";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalPatologias = ({ celula, idCelula }) => {

    const [open, setOpen] = useState(false)
    const [openSnack, setOpenSnack] = useState(false)
    const [obesidade, setObesidade] = useState(false)
    const [autismo, setAutismo] = useState(false)
    const [cronicos, setCronicos] = useState(false)
    const [observacoes, setObservacoes] = useState('')

    const handleClickOpen = () => {
        fetchData()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

    const handleSend = async () => {

        await createPatologia({
            celula,
            idCelula,
            obesidade,
            autismo,
            cronicos,
            observacoes
        })

        handleClose()
        setOpenSnack(true)

    }

    const fetchData = async () => {
        const result = await getPatologiaById(celula, idCelula)
        console.log(result);
        setObesidade(result.obesidade)
        setAutismo(result.autismo)
        setCronicos(result.cronicos)
        setObservacoes(result.observacoes)
    }

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
                            <FormControlLabel control={<Checkbox value={obesidade} checked={obesidade} />} onChange={() => setObesidade(!obesidade)} label='Obesidade' />
                            <FormControlLabel control={<Checkbox value={autismo} checked={autismo} />} onChange={() => setAutismo(!autismo)} label='Autismo' />
                            <FormControlLabel control={<Checkbox value={cronicos} checked={cronicos} />} onChange={() => setCronicos(!cronicos)} label='Crônicos' />
                            <TextField multiline rows={2} value={observacoes} onChange={e => setObservacoes(e.target.value)} />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='inherit' >Fechar</Button>
                    <Button onClick={handleSend} color="success" >Salvar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    Salvo com sucesso
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModalPatologias