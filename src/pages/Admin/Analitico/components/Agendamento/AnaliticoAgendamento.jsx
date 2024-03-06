import { Box, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import AnaliticoCards from "./AnaliticoCards";
import AnaliticoChart from "./AnaliticoChart";
import AnaliticoTable from "./AnaliticoTable";
import PropostasCards from "./PropostasCards";
import PropostasChart from "./PropostasChart";
import PropostasTable from "./PropostasTable";
import { getAnaliticoAnexos } from "../../../../../_services/teleEntrevista.service";

const AnaliticoAgendamento = () => {

    const [mes, setMes] = useState(moment().format('YYYY-MM'))
    const [dataAnexos, setDataAnexos] = useState({
        totalAnexos: 0,
        totalEnviadosImplantacao: 0,
        totalImplantados: 0,
        situacoesAmil: [],
        producao: []
    })

    useEffect(() => {
        const fetch = async () => {
            const result = await getAnaliticoAnexos(mes)
            setDataAnexos(result)
        }
        fetch()
    }, [mes])

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
            }}>

                <TextField
                    label='Mês'
                    focused
                    type='month'
                    variant='standard'
                    size='small'
                    value={mes}
                    onChange={(e) => { setMes(e.target.value) }}
                />
            </Box>
            <AnaliticoCards mes={mes} key={`${mes}-cards-agendadas`} />
            <AnaliticoChart mes={mes} key={`${mes}-chart-agendadas`} />
            <AnaliticoTable mes={mes} key={`${mes}-table-agendadas`} />
            <PropostasCards mes={mes} key={`${mes}-cards-anexos`} data={dataAnexos} />
            <PropostasChart mes={mes} key={`${mes}-chart-anexos`} data={dataAnexos} />
            <PropostasTable mes={mes} key={`${mes}-table-anexos`} data={dataAnexos} />
        </Box>
    );
}

export default AnaliticoAgendamento;