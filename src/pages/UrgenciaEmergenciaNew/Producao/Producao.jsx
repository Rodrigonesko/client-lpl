import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Button, CircularProgress, Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import Title from "../../../components/Title/Title";
import { producaoDiaria } from "../../../_services/urgenciaEmergenciaNew.service";
import { blue } from "@mui/material/colors";
import TabelaProducaoMui from "../../../components/TabelaProducaoMui/TabelaProducaoMui";
import { gerarRelatorio, producaoTotal } from "../../../_services/urgenciaEmergencia.service";

const Producao = () => {

    const [day, setDay] = useState(moment().format('YYYY-MM-DD'))
    const [producao, setProducao] = useState([])
    const [producaoAll, setProducaoAll] = useState([])
    const [loading, setLoading] = useState(false)

    const fetch = async () => {
        setLoading(true)
        try {
            const get = await producaoDiaria(day)
            const get2 = await producaoTotal()
            setProducao(get)
            setProducaoAll(get2.arrQuantidadeTotalMes)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    const relatorio = async () => {
        try {

            setLoading(true)

            const result = await gerarRelatorio()

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Pedido</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Analista</th>"
            xls += "</tr></thead><tbody>"

            result.propostas.forEach(e => {
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
        fetch()
    }, [day])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title size='medium' >Produção Urgência Emergência</Title>
                        <Button onClick={relatorio} variant='contained' >Relatório</Button>
                    </Box>
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <TextField type="date" label='Data' size='small' value={day} onChange={(e) => { setDay(e.target.value) }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '10px'
                                }
                            }}
                        />
                    </Box>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={6} lg={6}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Box >
                                    <Table size="small" >
                                        <TableHead sx={{ bgcolor: blue[600] }}>
                                            <TableRow>
                                                <TableCell sx={{ color: 'white' }}>Analista</TableCell>
                                                <TableCell sx={{ color: 'white' }}>Quantidade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                producao.map((item) => (
                                                    <TableRow>
                                                        <TableCell>{item.analista}</TableCell>
                                                        <TableCell>{item.total}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>

                                    </Table>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <TabelaProducaoMui producao={producaoAll} />
                        </Grid>
                    </Grid>
                </Container>
            </Sidebar>
        </>
    )
}

export default Producao