import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProducaoDiariaMui from '../../../components/TabelaProducaoMui/ProducaoDiariaMui'
import { Box, Paper, Typography } from "@mui/material";
import Axios from 'axios'
import moment from "moment";

import RelatorioElegibilidade from "./RelatorioElegibilidade";

const ProducaoElegibilidade = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState('')
    const [data, setData] = useState(moment().format('YYYY-MM-DD'))
    const [dadosReport, setDadosReport] = useState([])
    // const [loading, setLoading] = useState(false)

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/producao/${data}`, {
                withCredentials: true
            })

            setProducao(result.data.producao)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const report = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/report`, {
                withCredentials: true
            })

            setDadosReport(result.data)

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        buscarDados()
        report()
    }, [])

    return (
        <>
            <Sidebar />
            <Box display='flex' alignItems='center' justifyContent='center' width='100%' flexDirection='column'>
                <ProducaoDiariaMui title='Produção diaria Elegibilidade' producao={producao} total={total} setData={setData} buscarDadosData={buscarDados} />
                <Box component={Paper} p={2} mt={3} elevation={3}>
                    <Typography>
                        Bom dia
                    </Typography>
                    <Typography>
                        Demanda diária (ELEGIBILIDADE)
                    </Typography>
                    <Typography>
                        Recebidas Hoje: {dadosReport.recebidasHoje} (A iniciar)
                    </Typography>
                    <Typography>
                        Em análise: {dadosReport.emAnalise} (backlog)
                    </Typography>
                    <Typography>
                        Total em análise: {dadosReport.totalEmAnalise}
                    </Typography>
                    <Typography>
                        {
                            Object.keys(dadosReport).length !== 0 ? dadosReport.vigencias.map(vigencia => {
                                return (
                                    <div>
                                        vigencia: {moment(vigencia.vigencia).format('DD/MM/YYYY')}: {vigencia.quantidade}
                                    </div>
                                )
                            }) : null
                        }
                    </Typography>
                </Box>

                <RelatorioElegibilidade />

            </Box>
        </>
    )
}

export default ProducaoElegibilidade