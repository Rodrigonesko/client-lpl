import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment";
import { Container, Box, Button, CircularProgress } from "@mui/material";
import TabelaProducaoMui from "../../../components/TabelaProducaoMui/TabelaProducaoMui";
import ProducaoDiariaMui from "../../../components/TabelaProducaoMui/ProducaoDiariaMui";

const UrgenciaEmergenciaProducao = () => {

    const [producao, setProducao] = useState([])
    const [producaoTotal, setProducaoTotal] = useState([])
    const [total, setTotal] = useState(0)
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)

    const buscarDados = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/producao/${moment().format('YYYY-MM-DD')}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const result2 = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/producaoTotal`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })


            setProducaoTotal(result2.data.arrQuantidadeTotalMes)
            setProducao(result.data.producao)
            setTotal(result.data.total)

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosData = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/producao/${data}`, {
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
    }

    const relatorio = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/todas`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Pedido</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Analista</th>"
            xls += "</tr></thead><tbody>"

            result.data.propostas.forEach(e => {
                xls += "<tr>";
                xls += `<td>${e.pedido}</td>`
                xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.analista}</td>`
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            setLoading(false)

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Producao Urgencia Emergencia.xls'
            a.click()

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
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }} />
                        ) : null
                    }

                    <Button onClick={relatorio} variant='contained' style={{ position: 'absolute', top: '20px', right: '30px' }} >Relatório</Button>
                    <Box display='flex' m={2} justifyContent='space-around' alignItems='center'>
                        <Box width='50%'>
                            <ProducaoDiariaMui producao={producao} total={total} setData={setData} buscarDadosData={buscarDadosData} ></ProducaoDiariaMui>
                        </Box>
                        <Box>
                            <TabelaProducaoMui producao={producaoTotal}></TabelaProducaoMui>
                        </Box>
                    </Box>
                </Container>
            </Sidebar>
        </>
    )
}

export default UrgenciaEmergenciaProducao