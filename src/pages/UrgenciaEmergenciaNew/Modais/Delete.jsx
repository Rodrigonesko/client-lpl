import { DeleteOutline } from "@mui/icons-material"
import { Button, Dialog, DialogActions, DialogContent, IconButton, Tooltip } from "@mui/material"
import { useState } from "react"
import { deleteUrgenciaEmergencia } from "../../../_services/urgenciaEmergenciaNew.service"

const Delete = ({ pedido, setLoading }) => {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleDelete = async () => {
        setLoading(true)
        try {
            await deleteUrgenciaEmergencia(pedido.id)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <>
            <Tooltip title='Deletar' >
                <IconButton onClick={handleOpen}><DeleteOutline /></IconButton>
                <Dialog
                    open={open}
                >
                    <DialogContent>
                        Deseja excluir o pedido {pedido.pedido} ?
                    </DialogContent>
                    <DialogActions>
                        <Button color='error' onClick={handleClose}>Fechar</Button>
                        <Button color='success' onClick={handleDelete}>Deletar</Button>
                    </DialogActions>
                </Dialog>
            </Tooltip>
        </>
    )
}

export default Delete