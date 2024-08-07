import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import './ProducaoDiariaTele.css'
import moment from "moment";
import ProducaoDiariaMui from "../../../components/TabelaProducaoMui/ProducaoDiariaMui";
import { Container, Box } from "@mui/material";

const ProducaoDiariaTele = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [data, setData] = useState('')
    // const [totalRn, setTotalRn] = useState(0)
    const [loading, setLoading] = useState(false)

    const buscarDados = async () => {
setLoading(true)
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/producao/diaria/${moment().format('YYYY-MM-DD')}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setProducao(result.data.producao)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }
    
    const buscarDadosData = async () => {
        setLoading(true)
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/producao/diaria/${data}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setProducao(result.data.producao)
            setTotal(result.data.total)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar>
                <Container>
                    <Box m={3} display='flex' justifyContent='center' alignItems='center'>
                        <ProducaoDiariaMui producao={producao} total={total} setData={setData} buscarDadosData={buscarDadosData} loading={loading}></ProducaoDiariaMui>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default ProducaoDiariaTele