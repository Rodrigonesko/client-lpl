import { Box, Checkbox, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip, Typography } from "@mui/material"
import moment from "moment";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListAltIcon from '@mui/icons-material/ListAlt';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

const EnhancedTableHead = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Status
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Nome
                </TableCell>
                <TableCell sx={{ minWidth: '40px' }} align="center" padding={'none'}>
                    Idade
                </TableCell>
                <TableCell sx={{ minWidth: '40px' }} align="center" padding={'none'}>
                    Sexo
                </TableCell>
                <TableCell sx={{ minWidth: '60px' }} align="center" padding="none">
                    Risco
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Telefone
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Analista
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Janela Escolhida
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Data
                </TableCell>
                <TableCell sx={{ minWidth: '100px' }} align="center" padding={'none'}>
                    Hora
                </TableCell>
                <TableCell align="center" >
                    Canal
                </TableCell>
                <TableCell align="center" padding="checkbox">

                </TableCell>
                <TableCell align="center" padding="checkbox">

                </TableCell>
                <TableCell align="center" padding="none">

                </TableCell>
            </TableRow>
        </TableHead>
    )
}

const Row = ({ item, setShowConversas, setNomeWhatsapp, setResponsavelAtendimentoWhatsapp, setWhatsappSelected }) => {

    const [openRow, setOpenRow] = useState(false)

    const handleShowConversa = () => {
        setNomeWhatsapp(item.nome)
        setResponsavelAtendimentoWhatsapp(item.responsavelConversa)
        setWhatsappSelected(item.whatsapp)
        setShowConversas(true)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center" padding={'none'}>
                    <Checkbox></Checkbox>
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    Status
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {
                        item.tipoAssociado === 'Titular' ? (
                            <Chip label={item.nome} color="primary" />
                        ) : (
                            item.nome
                        )
                    }
                    {
                        item.retrocedido && (
                            <Chip sx={{ ml: '2px' }} variant="outlined" label='ret' color="secondary" />
                        )
                    }
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.idade}
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.sexo}
                </TableCell>
                <TableCell align="center" padding="none">
                    {item.riscoBeneficiario}
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.telefone}
                    <Tooltip title='Editar Telefone'>
                        <IconButton sx={{ ml: '10px' }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.enfermeiro}
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.janelaHorario}
                </TableCell>
                <TableCell align="center" padding="none">
                    {moment(item.dataEntrevista).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align="center" padding="none">
                    {moment(item.dataEntrevista).format('HH:mm:ss')}
                </TableCell>
                <TableCell align="center" padding="none">
                    0800
                </TableCell>
                <TableCell align="center" padding="none">
                    <IconButton
                        size="small"
                        onClick={() => setOpenRow(!openRow)}
                    >
                        {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}

                    </IconButton>
                </TableCell>
                <TableCell align="center" padding="none">
                    <Tooltip title='Formulario'>
                        <IconButton color="primary">
                            <ListAltIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="center" padding="none">
                    <Tooltip title='Conversas'>
                        <IconButton color="success" onClick={handleShowConversa}>
                            <WhatsAppIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
                    <Collapse in={openRow} timeout="auto" unmountOnExit>
                        <Typography m={1} variant="h5" gutterBottom component="div">
                            Dados
                        </Typography>
                        <Box sx={{ margin: 1 }} justifyContent={'space-between'} display={'flex'}>
                            <Box>
                                <Typography variant="h6">
                                    Contatos
                                </Typography>
                                <Box display={'flex'}>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>1° Contato:</span>  {item.contato1}
                                    </Typography>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>Responsavel:</span> {item.responsavelContato1}
                                    </Typography>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>Tipo:</span> {item.tipoContato1}
                                    </Typography>
                                </Box>
                                <Box display={'flex'}>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>2° Contato:</span>  {item.contato2}
                                    </Typography>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>Responsavel:</span> {item.responsavelContato2}
                                    </Typography>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>Tipo:</span> {item.tipoContato2}
                                    </Typography>
                                </Box>
                                <Box display={'flex'}>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>3° Contato:</span>  {item.contato3}
                                    </Typography>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>Responsavel:</span> {item.responsavelContato3}
                                    </Typography>
                                    <Typography mr={2}>
                                        <span style={{ fontWeight: 'bold' }}>Tipo:</span> {item.tipoContato3}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Informações
                                </Typography>
                                <Box display={'flex'}>
                                    <Typography>
                                        CPF:
                                    </Typography>
                                    <Typography>
                                        Data Nascimento:
                                    </Typography>
                                    <Typography>
                                        Filial:
                                    </Typography>
                                    <Typography>
                                        Peso:
                                    </Typography>
                                    <Typography>
                                        Altura:
                                    </Typography>
                                    <Typography>
                                        IMC:
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const CardInfoTele = ({ data, setShowConversas, showConversas, setNomeWhatsapp, setResponsavelAtendimentoWhatsapp, setWhatsappSelected }) => {

    return (
        <Box component={Paper} p={1} m={2} sx={{ overflow: 'hidden' }}>
            <TableContainer sx={{ marginBottom: '20px' }}>
                <Table
                    size={'small'}

                >
                    <EnhancedTableHead />
                    <TableBody>
                        {data.map(item => {
                            return (
                                <Row
                                    item={item}
                                    setShowConversas={setShowConversas}
                                    showConversas={showConversas}
                                    setNomeWhatsapp={setNomeWhatsapp}
                                    setResponsavelAtendimentoWhatsapp={setResponsavelAtendimentoWhatsapp}
                                    setWhatsappSelected={setWhatsappSelected}
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CardInfoTele