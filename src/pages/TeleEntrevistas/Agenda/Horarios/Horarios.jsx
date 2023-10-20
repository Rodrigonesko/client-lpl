import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Typography } from "@mui/material";
import FecharDia from "./FecharDia";
import FecharHorarios from "./FecharHorarios";
import ReabrirHorarios from "./ReabrirHorarios";
import AbrirNovoHorario from "./AbrirNovoHorario";

const Horarios = () => {

    const [responsaveis, setResponsaveis] = useState([])

    const buscarEnfermeira = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/users/enfermeiros`, { withCredentials: true })

            setResponsaveis(result.data.enfermeiros)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarEnfermeira()
    }, [])

    return (
        <>
            <Sidebar />
            <Container>

                <Typography variant="h5" m={1}>
                    Ajustar Horários
                </Typography>

                <FecharDia responsaveis={responsaveis} />

                <FecharHorarios responsaveis={responsaveis} />

                <ReabrirHorarios responsaveis={responsaveis} />

                <AbrirNovoHorario responsaveis={responsaveis} />
            </Container>
        </>
    )
}

export default Horarios