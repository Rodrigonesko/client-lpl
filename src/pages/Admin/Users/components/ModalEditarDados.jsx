import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useState } from "react";
import { green, grey } from "@mui/material/colors";

const ModalEditarDados = ({ user }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Tooltip title="Editar">
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Editar dados
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        variant="contained"
                        sx={{
                            backgroundColor: grey[500],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: grey[700],
                                color: 'white',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        //onClick={() => handleSubmit()}
                        variant="contained"
                        sx={{
                            backgroundColor: green[500],
                            color: 'white',
                            '&:hover': {
                                backgroundColor: green[700],
                                color: 'white',
                            },
                        }}
                    >
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalEditarDados