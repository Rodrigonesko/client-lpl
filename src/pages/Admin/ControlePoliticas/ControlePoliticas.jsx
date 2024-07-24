import Sidebar from '../../../components/Sidebar/Sidebar'
import { Box, Container, Typography, Divider, Paper, Card, CardActions, CardContent, Button, Tooltip } from '@mui/material'
import ModalAdicionarPolitica from './Modals/ModalAdicionarPolitica'
import { useEffect } from 'react'
import { useState } from 'react'
import { getPoliticas, updatePoliticas } from '../../../_services/politicas.service'
import { FaRegFilePdf, FaRegEyeSlash } from 'react-icons/fa'
import ModalFaltouAssinar from './Modals/ModalFaltouAssinar'
import Title from '../../../components/Title/Title'
import { BiSpreadsheet } from 'react-icons/bi'
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ControlePoliticas = () => {

    const [politicas, setPoliticas] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const result = await getPoliticas()
        setPoliticas(result)
    }

    const handleInativarClick = async (_id, inativo) => {
        await updatePoliticas({
            _id: _id,
            inativo,
        })
        setFlushHook(true)
    };

    const gerarRelatorio = async (politica) => {
        console.log(politica);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relatório de Assinaturas');

        worksheet.columns = [
            { header: 'Nome', key: 'nome', width: 10 },
            { header: 'Data', key: 'data', width: 10 },
            { header: 'Politica', key: 'politica', width: 10 }
        ];

        // Removendo duplicatas
        const nomesVistos = {};
        const assinaturasUnicas = politica.assinaturas.filter(assinatura => {
            if (nomesVistos[assinatura.nome]) {
                return false;
            } else {
                nomesVistos[assinatura.nome] = true;
                return true;
            }
        });

        assinaturasUnicas.forEach(assinatura => {
            worksheet.addRow({
                nome: assinatura.nome,
                data: new Date(assinatura.data),
                politica: politica.nome
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), `Relatório de Assinaturas - ${politica.nome}.xlsx`);
    };
    useEffect(() => {
        setFlushHook(false)
        fetchData()

    }, [flushHook])
    return (

        <Sidebar>
            <Box width='100%' height='100vh' overflow='auto'>
                <Container>
                    <Title size={'medium'} >Controle e Gestão de Políticas</Title>
                    <Divider />
                    <Box mt={1} mb={1}>
                        <ModalAdicionarPolitica setFlushHook={setFlushHook} politicas={politicas} />
                    </Box>
                    <Divider />
                    <Box component={Paper} p={1} mt={1} display='flex' flexWrap='wrap'>
                        {
                            politicas.map(politica => {
                                return (
                                    <Card key={politica._id} sx={{ width: '230px', margin: '10px', bgcolor: politica.inativo ? 'lightgray' : '', padding: '5px' }}>
                                        <object data={`${process.env.REACT_APP_API_KEY}/media${politica.arquivo}`} type='application/pdf' height={250} width='100%'>
                                            PDF
                                        </object>
                                        <CardContent>
                                            <Typography variant='h6'>
                                                {politica.nome}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                Versão: {politica.versao}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title='Visualizar'>
                                                <Button variant='contained' target='_blank' color='error' href={`${process.env.REACT_APP_API_KEY}/media${politica.arquivo}`} ><FaRegFilePdf /></Button>
                                            </Tooltip>
                                            <ModalFaltouAssinar id={politica._id} />
                                            {/* <Tooltip title='Inativar'>
                                                <Button type='button' variant='contained' target='_blank' color='error' onClick={() => handleInativarClick(politica._id, !politica.inativo)}><FaRegEyeSlash /></Button>
                                            </Tooltip> */}
                                            <Tooltip title='Relatório'>
                                                <Button
                                                    variant='contained'
                                                    color='success'
                                                    onClick={() => gerarRelatorio(politica)}
                                                >
                                                    <BiSpreadsheet />
                                                </Button>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
                    </Box>
                </Container>
            </Box>
        </Sidebar>

    )
}

export default ControlePoliticas