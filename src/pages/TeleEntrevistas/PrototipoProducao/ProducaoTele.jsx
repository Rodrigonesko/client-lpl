import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import { CircularProgress, Box, Typography, Container } from "@mui/material";
import TabelaProducaoTele from "./TabelaProducao/TabelaProducaoTele";
import TabelaRnsTele from "./TabelaProducao/TabelaRnsTele";
import moment from "moment";

const ProducaoTele = () => {

    const [producao, setProducao] = useState([])
    const [loading, setLoading] = useState(false)
    const [producaoRns, setProducaoRns] = useState([])
    const [data, setData] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const handleFilterProducao = async () => {
        try {
            setLoading(true)

            const requestData = data === '' ? moment().format('YYYY-MM') : data;

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/filterProducao?data=${requestData}`, { withCredentials: true })
            console.log(result.data);

            setProducao(result.data)

            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const buscarDados = async () => {
            try {

                setLoading(true)

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/teste/producao`, { withCredentials: true })

                setProducao(result.data.arrQuantidadeTotalMes)

                console.log(result.data.arrRns);

                setProducaoRns(result.data.arrRns)

                setLoading(false)

            } catch (error) {
                console.log(error);
            }
        }
        setFlushHook(false)
        buscarDados()
        // if (handleFilterProducao !== 0) {
        //     handleFilterProducao()
        // }
    }, [flushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Produção Entrevistas</h2>
                    </div>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }} />
                        ) : (
                            <>
                                <Box display='flex' width={'100%'} >
                                    <Box width={'100%'}>
                                        <Typography variant='h6'>
                                            Produção Tele
                                        </Typography>
                                        <TabelaProducaoTele producao={producao} data={data} setData={setData} handleFilterProducao={handleFilterProducao} />
                                    </Box>
                                    <Box width={'100%'}>
                                        <Typography variant='h6'>
                                            Produção Rn
                                        </Typography>
                                        <TabelaRnsTele producao={producaoRns} setProducao={setProducaoRns} />
                                    </Box>
                                </Box>
                            </>
                        )
                    }
                </Container>
            </Sidebar>
        </>
    )
}

export default ProducaoTele