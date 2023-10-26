import { Container } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import TabelaSolicitarChamados from "./Tabela/TabelaSolicitarChamados";
import ModalSolicitarChamados from "./Modais/ModalSolicitarChamados";

const SolicitarChamados = () => {

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
            <Sidebar />
            <Container>
                <ModalSolicitarChamados />
                <TabelaSolicitarChamados />
            </Container >
        </>
    )
}

export default SolicitarChamados;