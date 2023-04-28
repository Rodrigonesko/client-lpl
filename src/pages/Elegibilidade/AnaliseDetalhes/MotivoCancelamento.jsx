import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const MotivoCancelamento = ({ proposta }) => {
    return (
        <Box component={Paper} elevation={3} p={2} mt={3}>
            <Typography variant="h6">
                Motivos Cancelamento
            </Typography>
            <Typography m={2}>
                <strong>Motivo Cancelamento:</strong> {proposta.motivoCancelamento}
            </Typography>
            <Typography m={2}>
                <strong>Categoria:</strong> {proposta.categoriaCancelamento}
            </Typography>
            <Typography m={2}>
                <strong>Evidência:</strong> {proposta.evidenciaFraude}
            </Typography>
        </Box>
    )
}

export default MotivoCancelamento