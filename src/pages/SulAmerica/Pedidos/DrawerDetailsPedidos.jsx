import { ArrowForward, Close } from "@mui/icons-material";
import { AccordionDetails, Box, Drawer, IconButton, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import Toast from "../../../components/Toast/Toast";

const DrawerDetailsPedidos = ({ data }) => {

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState('35%');
    const [pedido, setPedido] = useState(data);

    const [openToast, setOpenToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [severity, setSeverity] = useState('success');


    const handleOpen = async () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title='Detalhes'>
                <IconButton
                    size='small'
                    onClick={handleOpen}
                >
                    <ArrowForward />
                </IconButton>
            </Tooltip>
            <Drawer
                anchor='right'
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    sx: {
                        width: size,
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: grey[300],
                        p: 1
                    }}
                >
                    <Tooltip title='Fechar'>
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Typography variant="h6" sx={{
                    m: 2,
                }}>

                    Detalhes do Pedido { }
                </Typography>
                <AccordionDetails>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            mt: 2
                        }}
                    >
                    </Box>
                </AccordionDetails>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mt: 2
                    }}
                >
                </Box>
            </Drawer >
            <Toast
                message={msg}
                severity={severity}
                open={openToast}
                onClose={() => setOpenToast(false)}
            />
        </>
    )
}

export default DrawerDetailsPedidos