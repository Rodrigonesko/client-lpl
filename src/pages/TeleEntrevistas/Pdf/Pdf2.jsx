import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Button, Box, Paper, Typography, Table, TableRow, TableCell } from '@mui/material'
import logo from './logo.png'

const Pdf2 = () => {

    const { proposta, nome } = useParams()

    console.log(proposta, nome);

    const [perguntas, setPerguntas] = useState([])
    const [dadosEntrevista, setDadosEntrevista] = useState({})

    const tableRef = useRef(null);

    const gerarPDF = () => {
        const table = tableRef.current;
        const HTML_Width = table.offsetWidth;
        const HTML_Height = table.offsetHeight;
        const top_left_margin = 15;
        const PDF_Width = HTML_Width + top_left_margin * 2;
        const PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
        const canvas_image_width = HTML_Width;
        const canvas_image_height = HTML_Height;

        const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

        html2canvas(table, { allowTaint: true }).then(function (canvas) {
            canvas.getContext("2d");

            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
            pdf.addImage(
                imgData,
                "JPG",
                top_left_margin,
                top_left_margin,
                canvas_image_width,
                canvas_image_height
            );

            for (let i = 1; i <= totalPDFPages; i++) {

                pdf.addPage();
                console.log('passou');
                pdf.addImage(
                    imgData,
                    "JPG",
                    top_left_margin,
                    -(PDF_Height * i) + top_left_margin * 4,
                    canvas_image_width,
                    canvas_image_height
                );
            }



            pdf.save(`${nome} - ${proposta}.pdf`);
        });
    };

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

            setPerguntas(result.data.perguntas)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const buscarDadosEntrevista = async () => {
            try {

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista/${proposta}/${nome}`, { withCredentials: true })

                setDadosEntrevista(result.data.result[0])

                console.log(result);

            } catch (error) {
                console.log(error);
            }
        }

        buscarDadosEntrevista()
        buscarPerguntas()
        // gerarPDF()
    }, [nome, proposta])

    return (
        <Box>
            <Box m={2} pb={1} borderBottom='2px solid gray'>
                <Button variant='contained' onClick={gerarPDF}>Download</Button>
            </Box>
            <Box mt={1} ref={tableRef} p={3}>
                <img src={logo} style={{ width: '150px', height: '150px', borderRadius: '20px', position: 'absolute', right: '10px' }} alt='Logo' />
                <Box style={{ width: '40%' }} component={Paper} elevation={6}>
                    <Table >
                        <TableRow >
                            <TableCell>Data Entrevista</TableCell>
                            <TableCell>{moment(dadosEntrevista.createdAt).format('DD/MM/YYYY')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>{dadosEntrevista.nome}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>CPF</TableCell>
                            <TableCell>{dadosEntrevista.cpf}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Proposta</TableCell>
                            <TableCell>{dadosEntrevista.proposta}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Data Nascimento</TableCell>
                            <TableCell>{dadosEntrevista.dataNascimento}</TableCell>
                        </TableRow>
                    </Table>
                </Box>
                <Box mt={4}>
                    <Typography variant='h6'>
                        Questionário médico
                    </Typography>
                    {
                        perguntas.map(e => {
                            if (e.formulario === dadosEntrevista.tipoFormulario && e.categoria === 'questionario' && (dadosEntrevista.sexo === e.sexo || e.sexo === 'N' )) {
                                return (
                                    <Box component={Paper} p={2} m={1} elevation={5}>
                                        <Typography>
                                            {e.pergunta}
                                        </Typography>
                                        <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                                            {dadosEntrevista[e.name]}
                                        </Typography>
                                    </Box>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </Box>
                <Box mt={4}>
                    <Typography variant='h6'>
                        HÁBITOS E HISTÓRICO FAMILIAR
                    </Typography>
                    {
                        perguntas.map(e => {
                            if (e.formulario === dadosEntrevista.tipoFormulario && e.categoria === 'habitos') {
                                return (
                                    <Box component={Paper} p={2} m={1} elevation={5}>
                                        <Typography>
                                            {e.pergunta}
                                        </Typography>
                                        <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                                            {dadosEntrevista[e.name]}
                                        </Typography>
                                    </Box>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </Box>
                <Box mt={4}>
                    <Typography variant='h6'>
                        Resumo
                    </Typography>
                    <Box component={Paper} p={2} m={1} elevation={5}>
                        <Typography>
                            Tipo de atendimento?
                        </Typography>
                        <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                            Telefone
                        </Typography>
                    </Box>
                    <Box component={Paper} p={2} m={1} elevation={5}>
                        <Typography>
                            Houve Divergência?
                        </Typography>
                        <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                            {dadosEntrevista.houveDivergencia}
                        </Typography>
                    </Box>
                    {
                        dadosEntrevista.houveDivergencia === 'Sim' ? (
                            <>
                                <Box component={Paper} p={2} m={1} elevation={5}>
                                    <Typography>
                                        Qual divergência?
                                    </Typography>
                                    <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                                        {dadosEntrevista.divergencia}
                                    </Typography>
                                </Box>
                                <Box component={Paper} p={2} m={1} elevation={5}>
                                    <Typography>
                                        Por que o beneficiario não informou na ds essas patologias?
                                    </Typography>
                                    <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                                        {dadosEntrevista.patologias}
                                    </Typography>
                                </Box>
                                <Box component={Paper} p={2} m={1} elevation={5}>
                                    <Typography>
                                        CIDs
                                    </Typography>
                                    <Typography component={Paper} elevation={1} p={2} fontWeight='bold' fontStyle='italic'>
                                        {dadosEntrevista.cids}
                                    </Typography>
                                </Box>
                            </>
                        ) : null
                    }
                </Box>
                <br />
                <br />
                <Box m={1}>
                    <Typography style={{ textDecoration: 'underline' }}>
                        Entrevista realizada pela profissional de enfermagem {dadosEntrevista.responsavel} (COREN PR- 001.786.031)
                    </Typography>
                </Box>
            </Box>
        </Box>

    )
}

export default Pdf2