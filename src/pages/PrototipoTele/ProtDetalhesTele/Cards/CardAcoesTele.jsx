import { Box, Divider, Paper, Typography } from "@mui/material"

import ModalDeletar from "../Modais/ModalDeletar";
import ModalCancelar from "../Modais/ModalCancelar";
import ModalEnviarHumanizado from "../Modais/ModalEnviarHumanizado";
import ModalRetroceder from "../Modais/ModalRetroceder";
import ModalReagendar from "../Modais/ModalReagendar";
import ModalAgendar from "../Modais/ModalAgendar";

const CardAcoesTele = ({ objects, setFlushHook }) => {
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
            <ModalCancelar objects={objects} setFlushHook={setFlushHook} />
            <ModalDeletar objects={objects} setFlushHook={setFlushHook} />
        </Box>
    )
}

export default CardAcoesTele