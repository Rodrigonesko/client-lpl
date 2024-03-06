import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Tooltip } from "@mui/material"
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { useState } from "react";
import { alterarVigenciaPorCpfTitular } from "../../../../_services/teleEntrevistaExterna.service";

const ModalAlterarVigencia = ({ data, setFlushHook }) => {

    const [open, setOpen] = useState(false)
    const [vigencia, setVigencia] = useState('' || data.vigencia)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleAlterarVigencia = async () => {
        console.log(vigencia)
        await alterarVigenciaPorCpfTitular({ cpfTitular: data.cpf, vigencia: vigencia })
        setFlushHook(true)
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Alterar Vigência'>
                <Button onClick={handleClickOpen} variant="contained" size="small" color="secondary" sx={{ ml: '20px' }}>
                    <ManageHistoryIcon />
                </Button>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>

                <DialogTitle>Alterar Vigência</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Alterar vigência de todas as pessoas vinculadas ao cpf
                    </DialogContentText>
                    <TextField sx={{ mt: 2 }} size="small" type="date" focused label="Vigência" variant="outlined" fullWidth value={vigencia} onChange={(e) => setVigencia(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button color="secondary" onClick={handleAlterarVigencia}>Alterar</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalAlterarVigencia