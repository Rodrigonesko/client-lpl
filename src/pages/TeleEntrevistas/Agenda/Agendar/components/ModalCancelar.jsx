import { Block } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { cancelarEntrevista } from "../../../../../_services/teleEntrevistaV2.service";

const ModalCancelar = ({ proposta, setRefresh, setOpenToast, setMessage, setSeverity }) => {

    const [open, setOpen] = useState(false)

    const [motivo, setMotivo] = useState('Sem Sucesso de Contato!')

    const handleCancel = async () => {
        try {
            const res = await cancelarEntrevista({
                id: proposta._id,
                motivo
            })
            console.log(res);
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
                    Cancelar <Block />
                </Box>
            </MenuItem>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Excluir Proposta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecione o motivo do cancelamento
                    </DialogContentText>
                    <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                        <InputLabel>Motivo</InputLabel>
                        <Select
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            label="Motivo"
                        >
                            <MenuItem value='Sem Sucesso de Contato!'>Sem Sucesso de Contato!</MenuItem>
                            <MenuItem value='Beneficiario Solicitou o Cancelamento'>Beneficiario Solicitou o Cancelamento</MenuItem>
                        </Select>
                    </FormControl>
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
                        onClick={handleCancel}
                        color="error"
                        variant="contained"
                        endIcon={<Block />}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalCancelar;