import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Typography } from "@mui/material";
import FecharDia from "./FecharDia";
import FecharHorarios from "./FecharHorarios";
import ReabrirHorarios from "./ReabrirHorarios";
import AbrirNovoHorario from "./AbrirNovoHorario";
import { filterUsers } from "../../../../_services/user.service";

const Horarios = () => {

    const [responsaveis, setResponsaveis] = useState([])

    const buscarEnfermeira = async () => {
        try {
            const result = await filterUsers({
                atividadePrincipal: "Tele Entrevista",
                inativo: { $ne: true }
            })

            setResponsaveis(result)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarEnfermeira()
    }, [])

    return (
        <>
            <Sidebar>
                <Container>
                    <Typography variant="h5" m={1}>
                        Ajustar Horários
                    </Typography>
                    <FecharDia responsaveis={responsaveis} />
                    <FecharHorarios responsaveis={responsaveis} />
                    <ReabrirHorarios responsaveis={responsaveis} />
                    <AbrirNovoHorario responsaveis={responsaveis} />
                </Container>
            </Sidebar>
        </>
    )
}

export default Horarios