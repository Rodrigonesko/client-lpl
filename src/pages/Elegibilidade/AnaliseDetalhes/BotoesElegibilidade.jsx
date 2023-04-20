import React from "react";
import { Box, Paper, Button } from "@mui/material";

import ModalEnviarUnder from "./Modals/ModalEnviarUnder";
import ModalDevolucao from "./Modals/ModalDevolucao";
import ModalEnviarCancelamento from "./Modals/ModalEnviarCancelamento";
import ModalCancelamento from "./Modals/ModalCancelamento";

const BotoesElegibilidade = ({ atualizarDados }) => {
    return (
        <>
            <Box component={Paper} elevation={3} p={2} mt={3}>
                <ModalEnviarUnder atualizarDados={atualizarDados} />
                <ModalDevolucao atualizarDados={atualizarDados} />
                <ModalEnviarCancelamento atualizarDados={atualizarDados} />
                <ModalCancelamento atualizarDados={atualizarDados} />
            </Box>
        </>
    )
}

export default BotoesElegibilidade