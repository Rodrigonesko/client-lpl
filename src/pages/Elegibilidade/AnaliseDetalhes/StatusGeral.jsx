import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const StatusGeral = ({ statusProposta, status1Analise, status2Analise, status3Analise }) => {

    const [dados, setDados] = useState({
        statusProposta,
        status1Analise,
        status2Analise,
        status3Analise
    })

    return (
        <Box component={Paper} elevation={3} p={2} mt={2}>
            <Typography variant="h6">
                Status Geral
            </Typography>
            <Box mt={2}>
                <TextField label='Status Proposta' value={dados.statusProposta} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <TextField label='1° Análise' value={dados.status1Analise} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <TextField label='2° Análise' value={dados.status2Analise} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <TextField label='3° Análise' value={dados.status3Analise} focused InputProps={{
                    readOnly: true,
                }} size="small" style={{ marginRight: '10px' }} />
                <Button variant="contained" >Propostas</Button>
            </Box>
        </Box>
    )
}

export default StatusGeral