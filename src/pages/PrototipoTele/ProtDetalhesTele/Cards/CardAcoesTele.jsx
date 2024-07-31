import { Box, Divider, Paper, Typography } from "@mui/material"

import ModalCancelar from "../Modais/ModalCancelar";
import ModalEnviarHumanizado from "../Modais/ModalEnviarHumanizado";
import ModalRetroceder from "../Modais/ModalRetroceder";
import ModalReagendar from "../Modais/ModalReagendar";
import ModalAgendar from "../Modais/ModalAgendar";
import ModalEncerrarHumanizado from "../Modais/ModalEncerrarHumanizado";
import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";

const CardAcoesTele = ({ objects, setFlushHook }) => {

    const { acessos } = useContext(AuthContext)

    console.log(acessos);

    return (
        <Box component={Paper} p={1} m={2}>
            <Typography m={2} variant="h5">
                Ações
            </Typography>
            <Divider />
            <ModalAgendar objects={objects} setFlushHook={setFlushHook} />
            <ModalReagendar objects={objects} setFlushHook={setFlushHook} />
            <ModalRetroceder objects={objects} setFlushHook={setFlushHook} />
            <ModalEnviarHumanizado objects={objects} setFlushHook={setFlushHook} />
            {
                (acessos?.administrador || acessos?.agendamento) && (
                    <ModalCancelar objects={objects} setFlushHook={setFlushHook} />
                )
            }
            {/* <ModalDeletar objects={objects} setFlushHook={setFlushHook} /> */}
            <ModalEncerrarHumanizado objects={objects} setFlushHook={setFlushHook} />
        </Box>
    )
}

export default CardAcoesTele