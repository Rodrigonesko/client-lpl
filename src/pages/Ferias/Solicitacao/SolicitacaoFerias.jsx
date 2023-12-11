import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Container } from "@mui/material";
import ModalFeriasElegiveis from "./Modais/ModalFeriasElegiveis";
import ModalSolicitar from "./Modais/ModalSolicitar";
import TabelaSolicitacao from "./Tabela/TabelaSolicitacao";

const SolicitacaoFerias = () => {

    const [flushHook, setFlushHook] = useState(false)

    return (

        <Sidebar>
            <Container maxWidth>
                <div className="title">
                    <h2>Solicitação de Férias</h2>
                </div>
                <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                    <Box>
                        <ModalSolicitar setFlushHook={setFlushHook} />
                        <ModalFeriasElegiveis />
                    </Box>
                </Box>

                <TabelaSolicitacao flushHook={flushHook} setFlushHook={setFlushHook} />
            </Container >
        </Sidebar>

    )
}

export default SolicitacaoFerias