import { Box, TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import AnaliticoCards from "./AnaliticoCards";
import AnaliticoChart from "./AnaliticoChart";
import AnaliticoTable from "./AnaliticoTable";
import PropostasCards from "./PropostasCards";
import PropostasChart from "./PropostasChart";

const AnaliticoAgendamento = () => {

    const [mes, setMes] = useState(moment().format('MM/YYYY'))

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
            <AnaliticoCards mes={mes} />  {/*Card Analitico*/}
            <AnaliticoChart mes={mes} />  {/*Gráfico Analitico*/}
            <AnaliticoTable mes={mes} />  {/*Tabela Analitico*/}
            <PropostasCards mes={mes} />  {/*Card propostas*/}
            <PropostasChart mes={mes} />  {/*Desenvolvendo ainda*/}
        </Box>
    );
}

export default AnaliticoAgendamento;