import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Container, Button, Box, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, Modal, LinearProgress, Alert, AlertTitle } from "@mui/material";
import Axios from 'axios'
import moment from 'moment-business-days'
import { getCookie } from "react-use-cookie";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const Enviados = () => {

    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [progressValue, setProgressValue] = useState(0)

    const reportContatos = async () => {
        try {

            setLoading(true)

            let csv = "Name; Given Name; Additional Name; Family Name; Yomi Name; Given Name Yomi; Additional Name Yomi; Family Name Yomi; Name Prefix; Name Suffix; Initials; Nickname; Short Name; Maiden Name; Birthday; Gender; Location; Billing Information; Directory Server; Mileage; Occupation; Hobby; Sensitivity; Priority; Subject; Notes; Language; Photo; Group Membership; Phone 1 - Type; Phone 1 - Value\n";

            propostas.forEach(e => {
                let telefone = `(${e.ddd}) ${e.celular}`
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

    const reenviarMensagens = async () => {
        try {

            //console.log(moment().businessAdd(3).format('YYYY-MM-DD'));

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/horariosDisponiveis/${moment().businessAdd(1).format('YYYY-MM-DD')}`, { withCredentials: true })

            const dia = moment().businessAdd(1).format('DD/MM/YYYY')
            const horarios = result.data

            let count = 0

            let arr = propostas.filter(proposta => {
                return moment().diff(moment(proposta.horarioEnviado), 'hours') >= 18
            }).filter(proposta => {
                return proposta.tipoAssociado.match(/[a-zA-Z]+/g).join('') === 'Titular'
            })

            for (const proposta of arr) {
                count++
                await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/reenviarMensagens`, {
                    dia,
                    horarios,
                    proposta
                }, {
                    withCredentials: true
                })
                setProgressValue((count / arr.length) * 100)
                buscarPropostas()
            }



        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostas = async () => {
        try {

            setLoading(true)

            const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/situacao/Enviada`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${getCookie('token')}` }
            })

            let arr = result.data.filter(e => {
                return e.status !== 'Concluído' && e.status !== 'Cancelado'
            })

            setPropostas(arr)

            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {

        buscarPropostas()

    }, [])

    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <Typography variant="h5">
                        Contatos enviados: {propostas.length}
                        <Box display='flex' justifyContent='end' m={2}>
                            <Button variant="contained" onClick={() => setOpenModal(true)} color='secondary' style={{ marginRight: '3px' }}>Reenviar</Button>
                            <Button onClick={reportContatos} variant='outlined' style={{ marginRight: '3px' }}>Report Contatos</Button>
                            <Button variant="contained" onClick={report} style={{ marginRight: '3px' }}>Report</Button>
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
                                        <TableCell>Horario Enviado</TableCell>
                                        <TableCell>Conversa</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        propostas.map(e => {
                                            return (
                                                <TableRow key={e._id}>
                                                    <TableCell>{e.proposta}</TableCell>
                                                    <TableCell>{e.nome}</TableCell>
                                                    <TableCell>{e.cpf}</TableCell>
                                                    <TableCell>{e.cpfTitular}</TableCell>
                                                    <TableCell>{e.tipoAssociado}</TableCell>
                                                    <TableCell>{moment(e.horarioEnviado).format('DD/MM/YYYY HH:mm')}</TableCell>
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
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Clique abaixo para reenviar as mensagens
                        </Typography>
                        <Box m={2}>
                            <LinearProgress variant="determinate" value={progressValue}></LinearProgress>
                        </Box>
                        {
                            progressValue === 100 ? (
                                <Alert severity="success">
                                    <AlertTitle>Sucesso!</AlertTitle>
                                    Todas as mensagens foram enviadas com sucesso!
                                </Alert>
                            ) : null
                        }
                        <Box m={1} display='flex' justifyContent='space-around'>
                            <Button variant="contained" color='inherit' onClick={() => setOpenModal(false)}>Fechar</Button>
                            <Button variant="contained" color='success' onClick={reenviarMensagens}>Enviar</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </>
    )
}

export default Enviados