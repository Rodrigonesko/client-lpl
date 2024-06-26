import { Box, Container } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalCriarInventario from "./Modais/ModalCriarInventario";
import TabelaInventario from "./Tabela/TabelaInventario";
import Title from "../../../components/Title/Title";

const Inventario = () => {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/findAll`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                        <Box>
                            <Title size={'medium'}>Inventário LPL</Title>
                            <ModalCriarInventario setFlushHook={setFlushHook} />
                            <br />
                        </Box>
                    </Box>
                    <Box>
                        <TabelaInventario flushHook={flushHook} setFlushHook={setFlushHook} />
                    </Box>
                </Container >
            </Sidebar>

        </>
    )
}

export default Inventario