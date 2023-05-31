import React from "react";
import { Box, Paper } from "@mui/material";

import ModalEnviarUnder from "./Modals/ModalEnviarUnder";
import ModalDevolucao from "./Modals/ModalDevolucao";
import ModalEnviarCancelamento from "./Modals/ModalEnviarCancelamento";
import ModalCancelamento from "./Modals/ModalCancelamento";
import ModalCancelarCpf from "./Modals/ModalCancelarCpf";

const BotoesElegibilidade = ({ atualizarDados, proposta }) => {
    return (
        <>
            <Box component={Paper} elevation={3} p={2} mt={3}>
                {
                    proposta.status === 'A iniciar' || proposta.status === 'Em andamento' || proposta.status === 'Devolvida' || proposta.status === 'Fase Cancelamento' ? (
                        <>
                            <ModalEnviarUnder atualizarDados={atualizarDados} />
                            <ModalEnviarCancelamento atualizarDados={atualizarDados} />
                            <ModalDevolucao atualizarDados={atualizarDados} proposta={proposta} />
                        </>
                    ) : null
                }
                {
                    proposta.status === 'Fase Cancelamento' ? (
                        <>
                            <ModalCancelamento atualizarDados={atualizarDados} />
                            <ModalCancelarCpf atualizarDados={atualizarDados} proposta={proposta} />
                        </>
                    ) : null
                }

            </Box>
        </>
    )
}

export default BotoesElegibilidade