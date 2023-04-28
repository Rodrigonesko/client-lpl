import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProducaoDiariaMui from '../../../components/TabelaProducaoMui/ProducaoDiariaMui'
import { Box, Paper, Typography } from "@mui/material";
import Axios from 'axios'
import moment from "moment";

const ProducaoElegibilidade = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState('')
    const [data, setData] = useState(moment().format('YYYY-MM-DD'))

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/producao/${data}`, {
                withCredentials: true
            })

            setProducao(result.data.producao)
            setTotal(result.data.total)

        } catch (error) {

        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar />
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' flexDirection='column'>
                <ProducaoDiariaMui title='Produção diaria Elegibilidade' producao={producao} total={total} setData={setData} buscarDadosData={buscarDados} />
                <Box>
                    <Typography>
                        Bom dia
                    </Typography>
                    <Typography>
                        Demanda diário (ELEGIBILIDADE)
                    </Typography>
                    <Typography>
                        Recebidas Hoje: x (A iniciar)
                    </Typography>
                    <Typography>
                        Em análise: 24 (backlog)
                    </Typography>
                    <Typography>
                        Total em análise: 27
                    </Typography>
                    <Typography>
                        Vigência: xx/xx/xxxx: x
                    </Typography>
                </Box>
                <Box>

                </Box>
            </Box>

        </>
    )
}

export default ProducaoElegibilidade