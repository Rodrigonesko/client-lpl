import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Container } from "@mui/material";
import ModalFeriasElegiveis from "./Modais/ModalFeriasElegiveis";
import ModalSolicitar from "./Modais/ModalSolicitar";
import TabelaSolicitacao from "./Tabela/TabelaSolicitacao";

const SolicitacaoFerias = () => {

    // const [pesquisa, setPesquisa] = useState('')
    // const [alerta, setAlerta] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

    // const handleChange = (elemento) => {
    //     setPesquisa(elemento.target.value)
    // }

    // const handleFilter = async (event) => {
    //     event.preventDefault()

    //     if (pesquisa.length <= 2) {
    //         setAlerta(true)
    //         return
    //     }

    //     const result = await axios.get(`${process.env.REACT_APP_API_KEY}/vacation/filter?colaborador=rodrigo&mes=2023-09&vencimento=2023`, {
    //         withCredentials: true
    //     })

    // }

    // const handleCloseInput = () => {
    //     setAlerta(false)
    // }

    return (
        <>
            <Sidebar />
            <Container>
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
        </>
    )
}

export default SolicitacaoFerias