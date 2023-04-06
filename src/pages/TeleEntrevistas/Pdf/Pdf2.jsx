import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'
import jsPDF from 'jspdf'
import { Container, Box, Paper, Typography, Table, TableRow, TableHead, TableCell, TableContainer } from '@mui/material'

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

            console.log(totalPDFPages);

            for (let i = 1; i <= totalPDFPages; i++) {
                pdf.addPage(PDF_Width, PDF_Height);
                pdf.addImage(
                    imgData,
                    "JPG",
                    top_left_margin,
                    -(PDF_Height * i) + top_left_margin * 4,
                    canvas_image_width,
                    canvas_image_height
                );
            }

            pdf.save(`callback.pdf`);
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
        gerarPDF()
    }, [nome, proposta])

    return (
        <Container id='pdf' ref={tableRef}> 
            <Box mt={1}>
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
                            <TableCell>{moment(dadosEntrevista.dataNascimento).format('DD/MM/YYYY')}</TableCell>
                        </TableRow>
                    </Table>
                </Box>
                <Box mt={4}>
                    {
                        perguntas.map(e => {
                            if (e.formulario === dadosEntrevista.tipoFormulario) {
                                return (
                                    <Box component={Paper} p={2} m={1} elevation={5}>
                                        <Typography>
                                            {e.pergunta}
                                        </Typography>
                                        <Typography component={Paper} elevation={1} p={2}>
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
            </Box>
        </Container>
    )
}

export default Pdf2