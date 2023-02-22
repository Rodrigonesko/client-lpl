import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
//import './ProducaoDiariaTele.css'
import moment from "moment";
import { Container, Box, Typography, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, TextField, Button } from "@mui/material";
import TabelaProducaoMui from "../../TeleEntrevistas/Producao/TabelaProducao/TabelaProducaoMui";

const UrgenciaEmergenciaProducao = () => {

    const [producao, setProducao] = useState([])
    const [total, setTotal] = useState(0)
    const [data, setData] = useState('')

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/producao/${moment().format('YYYY-MM-DD')}`, { withCredentials: true })

            // const result2 = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/producaoTotal`, {
            //     withCredentials: true
            // })

            // console.log(result2);

            setProducao(result.data.producao)
            setTotal(result.data.total)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarDadosData = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/producao/${data}`, { withCredentials: true })

            setProducao(result.data.producao)
            setTotal(result.data.total)
        } catch (error) {
            console.log(error);
        }
    }

    const relatorio = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/todas`, { withCredentials: true })

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

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatorio Urgencia Emergencia.xls'
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
            <Sidebar></Sidebar>
            <Container>
                <Button onClick={relatorio} variant='contained' style={{ position: 'absolute', top: '20px', right: '30px' }} >Relatório</Button>
                <Box>
                    <Box width='50%'>

                        <Card>
                            <CardContent>
                                <Typography variant="h6" align='center'>
                                    Produção Diaria
                                </Typography>
                                <Box m={1} display='flex' justifyContent='center'>
                                    <TextField type='date' size="small" onChange={e => { setData(e.target.value) }} focused label='Data' />
                                    <Button variant="contained" size="small" onClick={buscarDadosData} >Buscar</Button>
                                </Box>
                                <Table>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell>Analista</TableCell>
                                            <TableCell>Quantidade</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            producao.map(item => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{item.analista}</TableCell>
                                                        <TableCell>{item.quantidade}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell>{total}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>

                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default UrgenciaEmergenciaProducao