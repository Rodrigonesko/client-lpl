import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment";
import ProducaoDiariaMui from "../../../components/TabelaProducaoMui/ProducaoDiariaMui";
import { Container, Box } from "@mui/material";
import { getProducaoDiaria } from "../../../_services/rsd.service";

const ProducaoDiariaRsd = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [data, setData] = useState('')

    const buscarDados = async () => {
        try {

            //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/producaoDiaria/${moment().format('YYYY-MM-DD')}`, { withCredentials: true })

            const result = await getProducaoDiaria(moment().format('YYYY-MM-DD'))

            setProducao(result.producao)
            setTotal(result.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosData = async () => {
        try {
            //const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/producaoDiaria/${data}`, { withCredentials: true })

            const result = await getProducaoDiaria(data)

            setProducao(result.producao)
            setTotal(result.total)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar>
                <Container>
                    <Box m={3} display='flex' justifyContent='center' alignItems='center' >

                        <ProducaoDiariaMui producao={producao} total={total} setData={setData} title='RSD' buscarDadosData={buscarDadosData} />
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default ProducaoDiariaRsd