import { Box, Container } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalCriarInventario from "./Modais/ModalCriarInventario";
import TabelaInventario from "./Tabela/TabelaInventario";

const Inventario = () => {

    const [solicitacoes, setSolicitacoes] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/inventario/findAll`, { withCredentials: true })
        setSolicitacoes(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <>
            <Sidebar>
                <Container>
                    <Box display={"flex"} paddingTop={"15px"} paddingBottom={"15px"}>
                        <Box>
                            <div className="title">
                                <h2>Inventário LPL</h2>
                            </div>
                            <br />
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