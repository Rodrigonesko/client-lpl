import { green, grey, yellow } from "@mui/material/colors";
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { mandarPropostaParaImplantacao } from "../../../../../_services/teleEntrevista.service";

const MandarImplantacao = ({ proposta, setFlushHook }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleConcluir = async () => {
        await mandarPropostaParaImplantacao({ id: proposta._id })
        setFlushHook(true)
        setOpen(false)
    }

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    bgcolor: yellow[100],
                    color: yellow[900],
                    '&:hover': {
                        bgcolor: yellow[600],
                        opacity: 0.8,
                    },
                }}
                onClick={handleClickOpen}
            >
                Implantação
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 'bold',
                                position: 'relative',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '30%',
                                    height: '2px',
                                    bottom: 0,
                                    left: '0%',
                                    backgroundColor: yellow[800],
                                    transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                                },
                                '&:hover::after': {
                                    width: '100%',
                                    left: '0%',
                                },
                            }}
                        >
                            Mandar para implantação
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Divider />
                    <Typography
                        variant="body1"

                    >
                        Gostaria de mandar para implantação a proposta {proposta.proposta} do beneficiario {proposta.nome}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{
                            bgcolor: grey[100],
                            color: grey[800],
                            '&:hover': {
                                bgcolor: grey[500],
                                opacity: 0.8,
                            },
                        }}
                    >
                        Fechar
                    </Button>
                    <Button
                        onClick={handleConcluir}
                        variant="contained"
                        sx={{
                            bgcolor: yellow[100],
                            color: yellow[900],
                            '&:hover': {
                                bgcolor: yellow[600],
                                opacity: 0.8,
                            }
                        }}
                    >
                        Implantação
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MandarImplantacao;