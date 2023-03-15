import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Button } from "@mui/material";
import Axios from 'axios'
import moment from "moment";

const AtendimentoHumanizado = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)

    const reportContatos = async () => {
        try {

            setLoading(true)

            let csv = "Name; Given Name; Additional Name; Family Name; Yomi Name; Given Name Yomi; Additional Name Yomi; Family Name Yomi; Name Prefix; Name Suffix; Initials; Nickname; Short Name; Maiden Name; Birthday; Gender; Location; Billing Information; Directory Server; Mileage; Occupation; Hobby; Sensitivity; Priority; Subject; Notes; Language; Photo; Group Membership; Phone 1 - Type; Phone 1 - Value\n";

            propostas.forEach(e => {
                let telefone = `(${e.celular}) ${e.ddd}`
                let proposta = e.proposta
                let nome = e.nome

                let data = new Date()

                data = moment(data).format('DD/MM/YYYY')

                let dataArr = data.split('/')

                let mes = dataArr[1]
                let ano = dataArr[2]

                csv += `${mes}/${ano} - ${proposta} - ${nome}`
                csv += `;${mes}/${ano} - ${proposta} - ${nome}`
                csv += `;;;;;;;;;;;;;;;;;;;;;;;;;;`
                csv += `;* myContacts;`
                csv += `; ${telefone}`
                csv += `\n`
            })

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'contatos.csv';
            hiddenElement.click();

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    const report = async () => {
        try {

            setLoading(true)

            let xls = '\ufeff'
            xls += "<table border='1'>"
            xls += "<thead><tr>"
            xls += "<th>Data Recebimento</th>"
            xls += "<th>Data Vigencia</th>"
            xls += "<th>Proposta</th>"
            xls += "<th>Nome</th>"
            xls += "<th>Cpf</th>"
            xls += "<th>Data Nascimento</th>"
            xls += "<th>Administrador</th>"
            xls += "<th>Risco</th>"
            xls += "<th>Sinistralidade</th>"
            xls += "<th>Divergencia</th>"
            xls += "<th>Cid Irregularidade</th>"
            xls += "<th>Status</th>"
            xls += "<th>Cid Identificado</th>"
            xls += "<th>Data Entrevista</th>"
            xls += "<th>Idade</th>"
            xls += "<th>Sexo</th>"
            xls += "<th>Telefone</th>"
            xls += "<th>DS 1</th>"
            xls += "<th>DS 2</th>"
            xls += "<th>DS 3</th>"
            xls += "<th>DS 4</th>"
            xls += "<th>DS 5</th>"
            xls += "<th>DS 6</th>"
            xls += "<th>DS 7</th>"
            xls += "<th>DS 8</th>"
            xls += "<th>DS 9</th>"
            xls += "<th>Status</th>"
            xls += "<th>Data Conclusão</th>"
            xls += "<th>Tipo Contrato</th>"
            xls += "<th>1° Contato</th>"
            xls += "<th>Responsavel 1° Contato</th>"
            xls += "<th>2° Contato</th>"
            xls += "<th>Responsavel 2° Contato</th>"
            xls += "<th>3° Contato</th>"
            xls += "<th>Responsavel 3° Contato</th>"
            xls += "</tr>"
            xls += "</thead>"
            xls += "<tbody>"

            propostas.forEach(e => {
                xls += "<tr>"
                xls += `<td>${moment(e.dataRecebimento).format('DD/MM/YYYY')}</td>`
                xls += `<td>${moment(e.vigencia).format('DD/MM/YYYY')}</td>`
                xls += `<td>${e.proposta}</td>`
                xls += `<td>${e.nome}</td>`
                xls += `<td>${e.cpf}</td>`
                xls += `<td>${e.dataNascimento}</td>`
                xls += `<td>${e.administradora}</td>`
                xls += `<td>${e.riscoImc}</td>`
                xls += `<td>${e.sinistral}</td>`
                xls += `<td>${e.divergencia}</td>`
                xls += `<td>${e.cid}</td>`
                xls += `<td>${e.status}</td>`
                xls += `<td>${e.cids}</td>`
                xls += `<td>${e.dataEntrevista}</td>`
                xls += `<td>${e.idade}</td>`
                xls += `<td>${e.sexo}</td>`
                xls += `<td>${e.telefone}</td>`
                xls += `<td>${e.d1?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d2?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d3?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d4?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d5?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d6?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d7?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d8?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.d9?.replaceAll('#', ' ')}</td>`
                xls += `<td>${e.status}</td>`

                if (e.dataConclusao) {
                    xls += `<td>${moment(e.dataConclusao).format('DD/MM/YYYY')}</td>`
                } else {
                    xls += `<td></td>`
                }
                xls += `<td>${e.tipoContrato}</td>`
                e.contato1 ? (
                    xls += `<td>${e.contato1}</td>`
                ) : (
                    xls += `<td></td>`
                )
                e.responsavelContato1 ? (
                    xls += `<td>${e.responsavelContato1}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato2 ? (
                    xls += `<td>${e.contato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato2 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.contato3 ? (
                    xls += `<td>${e.contato3}</td>`
                ) : (
                    xls += `<td></td>`
                )

                e.responsavelContato3 ? (
                    xls += `<td>${e.responsavelContato2}</td>`
                ) : (
                    xls += `<td></td>`
                )
                xls += `</tr>`
            })

            xls += "</tbody></table>"

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            a.href = data_type + ', ' + xls.replace(/ /g, '%20');
            a.download = 'Relatório Propostas.xls'
            a.click()

            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {

        const buscarPropostas = async () => {
            try {

                setLoading(true)

                const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/atendimentoHumanizado`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${document.cookie.split('=')[1]}` }
                })

                setPropostas(result.data)

                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant="h5">
                        Atendimento Humanizado: {propostas.length}
                        <Box display='flex' justifyContent='end'>
                            <Button onClick={reportContatos}>Report Contatos</Button>
                            <Button variant="contained" onClick={report}>Report</Button>
                        </Box>
                    </Typography>
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }}></CircularProgress>
                        ) : null
                    }
                    <Box>
                        <TableContainer>
                            <Table className="table">
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell>Proposta</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Cpf</TableCell>
                                        <TableCell>Cpf Titular</TableCell>
                                        <TableCell>Tipo Associado</TableCell>
                                        <TableCell>DDD</TableCell>
                                        <TableCell>Celular</TableCell>
                                        <TableCell>Conversa</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        propostas.map(e => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{e.proposta}</TableCell>
                                                    <TableCell>{e.nome}</TableCell>
                                                    <TableCell>{e.cpf}</TableCell>
                                                    <TableCell>{e.cpfTitular}</TableCell>
                                                    <TableCell>{e.tipoAssociado}</TableCell>
                                                    <TableCell>{e.ddd}</TableCell>
                                                    <TableCell>{e.celular}</TableCell>
                                                    <TableCell><Button variant="contained" href={`/entrevistas/chat/${e.whatsapp}`}>Ver Conversa</Button></TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default AtendimentoHumanizado