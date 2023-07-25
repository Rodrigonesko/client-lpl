import React from "react";
import { Box, Paper } from "@mui/material";

import ModalEnviarUnder from "./Modals/ModalEnviarUnder";
import ModalDevolucao from "./Modals/ModalDevolucao";
import ModalEnviarCancelamento from "./Modals/ModalEnviarCancelamento";
import ModalCancelamento from "./Modals/ModalCancelamento";
import ModalCancelarCpf from "./Modals/ModalCancelarCpf";
import ModalPatologias from "../../../components/ModalPatologias/ModalPatologias";
import { useParams } from "react-router-dom";

const BotoesElegibilidade = ({ atualizarDados, proposta, blacklistPlanos }) => {

    const { id } = useParams()

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
                    proposta.status === 'Fase Cancelamento' || blacklistPlanos.includes(proposta.plano) ? (
                        <>
                            <ModalCancelamento atualizarDados={atualizarDados} />
                            <ModalCancelarCpf atualizarDados={atualizarDados} proposta={proposta} />
                        </>
                    ) : null
                }
                <ModalPatologias celula='Elegibilidade' idCelula={id} />
            </Box>
        </>
    )
}

export default BotoesElegibilidade