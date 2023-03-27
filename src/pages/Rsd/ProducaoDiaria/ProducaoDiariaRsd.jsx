import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment";
import ProducaoDiariaMui from "../../../components/TabelaProducaoMui/ProducaoDiariaMui";
import { Container, Box } from "@mui/material";

const ProducaoDiariaRsd = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [data, setData] = useState('')

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/producaoDiaria/${moment().format('YYYY-MM-DD')}`, { withCredentials: true })

            console.log(result);

            setProducao(result.data.producao)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosData = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/producaoDiaria/${data}`, { withCredentials: true })

            setProducao(result.data.producao)
            setTotal(result.data.total)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <Container>
                <Box m={3} display='flex' justifyContent='center' alignItems='center' >

                    <ProducaoDiariaMui producao={producao} total={total} setData={setData} title='RSD' buscarDadosData={buscarDadosData} />
                </Box>
            </Container>
        </>
    )
}

export default ProducaoDiariaRsd