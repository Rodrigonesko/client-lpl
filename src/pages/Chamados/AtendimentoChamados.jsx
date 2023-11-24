import { Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react";
import axios from "axios";
import TabelaAtendimentoChamados from "./Tabela/TabelaAtendimentoChamados";

const AtendimentoChamados = () => {

    const [chamados, setChamados] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const resultado = await axios.get(`${process.env.REACT_APP_API_KEY}/tasks/findAll`, { withCredentials: true })
        setChamados(resultado.data.encontrarTodos)
    }

    useEffect(() => {
        fetchData()
        setFlushHook(false)
    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Container>
                    <TabelaAtendimentoChamados />
                </Container>
            </Sidebar>

        </>

    )

}

export default AtendimentoChamados;