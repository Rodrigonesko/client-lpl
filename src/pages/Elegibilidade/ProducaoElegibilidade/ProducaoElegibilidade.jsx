import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProducaoDiariaMui from '../../../components/TabelaProducaoMui/ProducaoDiariaMui'
import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";

import RelatorioElegibilidade from "./RelatorioElegibilidade";
import { getProducao, getReport } from "../../../_services/elegibilidade.service";
import { getProducaoDiariaPme } from "../../../_services/elegibilidadePme.service";

const ProducaoElegibilidade = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState('')
    const [producaoPme, setProducaoPme] = useState([])
    const [totalPme, setTotalPme] = useState('')
    const [data, setData] = useState(moment().format('YYYY-MM-DD'))
    const [dataPme, setDataPme] = useState(moment().format('YYYY-MM-DD'))
    const [dadosReport, setDadosReport] = useState([])
    // const [loading, setLoading] = useState(false)

    const buscarDados = async () => {
        try {

            const result = await getProducao(data)

            setProducao(result.producao)
            setTotal(result.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosPme = async () => {
        const resultPme = await getProducaoDiariaPme(dataPme)

        setProducaoPme(resultPme.producao)
        setTotalPme(resultPme.total)
    }

    const report = async () => {
        try {

            const result = await getReport()

            setDadosReport(result)

        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        buscarDados()
        buscarDadosPme()
        report()
    }, [])

    return (
        <>
            <Sidebar />
            <Box display='flex' alignItems='center' justifyContent='space-around' width='100%' flexWrap='wrap'>
                <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
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
                                        <div key={vigencia.vigencia}>
                                            vigencia: {moment(vigencia.vigencia).format('DD/MM/YYYY')}: {vigencia.quantidade}
                                        </div>
                                    )
                                }) : null
                            }
                        </Typography>
                    </Box>

                    <RelatorioElegibilidade />
                </Box>
                <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                    <ProducaoDiariaMui title='Produção diaria Elegibilidade PME' producao={producaoPme} total={totalPme} setData={setDataPme} buscarDadosData={buscarDadosPme} />
                    {/* <Box component={Paper} p={2} mt={3} elevation={3}>
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
                    </Box> */}
                </Box>
            </Box>
        </>
    )
}

export default ProducaoElegibilidade