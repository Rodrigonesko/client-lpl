import { Box, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import AnaliticoCards from "./AnaliticoCards";
import AnaliticoChart from "./AnaliticoChart";
import AnaliticoTable from "./AnaliticoTable";
import PropostasCards from "./PropostasCards";
import PropostasChart from "./PropostasChart";
import PropostasTable from "./PropostasTable";
import { getAnaliticoAgendamentoMensal, getProducaoAnalistasAgendamento } from "../../../../../_services/teleEntrevistaExterna.service";

const AnaliticoAgendamento = () => {

    const [mes, setMes] = useState(moment().format('YYYY-MM'))

    useEffect(() => {
        const fetch = async () => {
            const result = await getAnaliticoAgendamentoMensal(mes)

            console.log(result);
        }

        fetch()
    })

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
            <AnaliticoCards mes={mes} key={`${mes}-chart-cards`} />  {/*Card Analitico*/}
            <AnaliticoChart mes={mes} key={`${mes}-chart-agendadas`} />  {/*Gráfico Analitico*/}
            <AnaliticoTable mes={mes} key={`${mes}-table-agendadas`} />  {/*Tabela Analitico*/}
            <PropostasCards mes={mes} />  {/*Card propostas*/}
            <PropostasChart mes={mes} />  {/*Gráfico propostas*/}
            <PropostasTable mes={mes} />  {/*Tabela propostas*/}
        </Box>
    );
}

export default AnaliticoAgendamento;