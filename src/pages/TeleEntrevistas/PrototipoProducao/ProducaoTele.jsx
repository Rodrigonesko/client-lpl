import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Typography, Container } from "@mui/material";
import TabelaProducaoTele from "./TabelaProducao/TabelaProducaoTele";
import TabelaRnsTele from "./TabelaProducao/TabelaRnsTele";
import moment from "moment";

const ProducaoTele = () => {

    const [producao, setProducao] = useState([])
    // const [loading, setLoading] = useState(false)
    const [loadingTele, setLoadingTele] = useState(false)
    const [loadingRns, setLoadingRns] = useState(false)
    const [producaoRns, setProducaoRns] = useState([])
    const [data, setData] = useState('')
    const [flushHook, setFlushHook] = useState(false)

    const buscarDadosTele = async () => {
        try {

            setLoadingTele(true)

            const dataBuscar = data || moment().format('MM/YYYY')
            // console.log(dataBuscar)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/teste/producaoTele?data=${dataBuscar}`, { withCredentials: true })
            // console.log(result.data.arrQuantidadeTotalMes);
            setProducao(result.data.arrQuantidadeTotalMes)

            setLoadingTele(false)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosRns = async () => {
        try {

            setLoadingRns(true)

            const dataBuscar = data || moment().format('MM/YYYY')
            console.log(dataBuscar)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/teste/producaoRns?data=${dataBuscar}`, { withCredentials: true })
            console.log(result.data.arrRns);
            setProducaoRns(result.data.arrRns)
            setLoadingRns(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFlushHook(false)
        buscarDadosTele()
        buscarDadosRns()
        // handleFilterProducao()
    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Produção Entrevistas</h2>
                    </div>
                    {
                        <>
                            <Box display='flex' width={'100%'} >
                                <Box width={'100%'}>
                                    <Typography variant='h6'>
                                        Produção Tele
                                    </Typography>
                                    <TabelaProducaoTele producao={producao} data={data} setData={setData} buscarDadosTele={buscarDadosTele} loadingTele={loadingTele} />
                                </Box>
                                <Box width={'100%'}>
                                    <Typography variant='h6'>
                                        Produção Rn
                                    </Typography>
                                    <TabelaRnsTele producao={producaoRns} data={data} setData={setData} buscarDadosRns={buscarDadosRns} loadingRns={loadingRns} />
                                </Box>
                            </Box>
                        </>
                    }
                </Container>
            </Sidebar>
        </>
    )
}

export default ProducaoTele