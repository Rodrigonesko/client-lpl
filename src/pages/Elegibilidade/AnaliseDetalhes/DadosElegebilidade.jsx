import React from "react";
import { Box, Typography, TextField, Paper } from "@mui/material";
import moment from "moment";

const inputWidth = {
    width: '33%'
}

const DadosElegibilidade = ({
    proposta
}) => {
    return (
        <Box component={Paper} p={2} mt={3} elevation={3}>
            <Typography variant="h6">
                Dados
            </Typography>
            <Box p={1} display='flex' justifyContent='space-between' >
                <TextField label='Proposta' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.proposta} sx={inputWidth} />
                <TextField label='Vigência' size='small' InputProps={{
                    readOnly: true,
                }} value={moment(proposta.vigencia).format('DD/MM/YYYY')} sx={inputWidth} />
                <TextField label='Titular' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.nome} sx={inputWidth} />
            </Box>
            <Box p={1} display='flex' justifyContent='space-between' >
                <TextField label='Administradora' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.administradora} sx={inputWidth} />
                <TextField label='Vidas' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.vidas} sx={inputWidth} />
                <TextField label='Entidade' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.entidade} sx={inputWidth} />
            </Box>
            <Box p={1} display='flex' justifyContent='space-between' >
                <TextField label='Data LPL' size='small' InputProps={{
                    readOnly: true,
                }} value={moment(proposta.dataImportacao).format('DD/MM/YYYY')} sx={inputWidth} />
                <TextField label='Vinculo' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.tipoVinculo} sx={inputWidth} />
                <TextField label='Motor' size='small' InputProps={{
                    readOnly: true,
                }} value={proposta.statusMotor} sx={inputWidth} />
            </Box>
        </Box>
    )
}

export default DadosElegibilidade