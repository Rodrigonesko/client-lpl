import { Delete } from "@mui/icons-material"
import { Box, Dialog, MenuItem, DialogActions, DialogTitle, DialogContent, DialogContentText, Button } from "@mui/material"
import { useState } from "react"
import { deletePropostaEntrevista } from "../../../../../_services/teleEntrevistaV2.service"

const ModalExcluir = ({ proposta, setRefresh, setOpenToast, setSeverity, setMessage }) => {

    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            await deletePropostaEntrevista(proposta._id)
            setRefresh(prev => !prev)
            setOpen(false)
            setOpenToast(true)
            setMessage('Proposta excluida com sucesso')
            setSeverity('success')
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao excluir')
            setSeverity('error')
        }
    }

    return (
        <>
            <MenuItem onClick={() => setOpen(true)}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"space-between"}
                    gap={1}
                    width={'100%'}
                >
                    Excluir <Delete />
                </Box>
            </MenuItem>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Excluir Proposta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente excluir a proposta {proposta.proposta} do beneficiario {proposta.nome}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="inherit"
                        variant="contained"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        endIcon={<Delete />}
                    >
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalExcluir;