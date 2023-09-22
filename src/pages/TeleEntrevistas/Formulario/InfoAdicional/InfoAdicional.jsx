import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import React, { useState } from "react";

const InfoAdicionais = ({
    data
}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen} variant="contained">Info Adicional</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"informações adicionais"}
                </DialogTitle>
                <DialogContent sx={{ width: '400px' }}>
                    <Box display='flex' flexDirection='column' minHeight='1500px' justifyContent='space-around' >
                        <TextField label='Risco Beneficiário' value={data.riscoBeneficiario} />
                        <TextField label='Risco Imc' value={data.riscoImc} />
                        <TextField label='Sinistral' value={data.sinistral} />
                        <TextField label='Tipo Associado' value={data.tipoAssociado} />
                        <TextField label='Grupo Carência' value={data.grupoCarencia} />
                        <TextField label='DS 1' value={data.d1} />
                        <TextField label='DS 2' value={data.d2} />
                        <TextField label='DS 3' value={data.d3} />
                        <TextField label='DS 4' value={data.d4} />
                        <TextField label='DS 5' value={data.d5} />
                        <TextField label='DS 6' value={data.d6} />
                        <TextField label='DS 7' value={data.d7} />
                        <TextField label='DS 8' value={data.d8} />
                        <TextField label='DS 9' value={data.d9} />
                        <TextField label='Peso' value={data.peso} />
                        <TextField label='Altura' value={data.altura} />
                        <TextField label='IMC' value={data.imc} />
                        <TextField label='Cid Anterior 1' value={data.cidAnterior1} />
                        <TextField label='Cid Anterior 2' value={data.cidAnterior2} />
                        <TextField label='Cid Anterior 3' value={data.cidAnterior3} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InfoAdicionais