import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
// import TabelaProducao from "./TabelaProducao/TabelaProducao";
import TabelaProducaoMui from "../../../components/TabelaProducaoMui/TabelaProducaoMui";
import { CircularProgress, Box, Typography, Container } from "@mui/material";

const ProducaoEntrevistas = () => {

    const [producao, setProducao] = useState([])
    const [loading, setLoading] = useState(false)
    const [producaoRns, setProducaoRns] = useState([])

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

        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container className="scrollable">
                <Box style={{width: '100%'}}>
                    <Typography variant="h6">
                        Produção Entrevistas
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }} />
                        ) : null
                    }
                    {/* <TabelaProducao producao={producao}></TabelaProducao> */}
                    <Box display='flex' width={'100%'} justifyContent='space-between' alignItems='center'>
                        <Box width={'100%'}>
                            <Typography m={2} variant='h6'>
                                Produção Tele
                            </Typography>
                            <TabelaProducaoMui producao={producao}></TabelaProducaoMui>
                        </Box>
                        <Box width={'100%'}>
                            <Typography m={2} variant='h6'>
                                Produção Rn
                            </Typography>
                            <TabelaProducaoMui producao={producaoRns}></TabelaProducaoMui>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ProducaoEntrevistas