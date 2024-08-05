import { Box, Checkbox, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import moment from "moment";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListAltIcon from '@mui/icons-material/ListAlt';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useState } from "react";
import PopoverAlterarTelefone from "../Components/PopoverAlterarTelefone";
import { deepPurple } from "@mui/material/colors";
import SelectAlterarSexo from "../Components/SelectAlterarSexo";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import gerarPdf from "../../../TeleEntrevistas/Pdf/Pdf";
import PopoverTentativaContato from "../Components/PopoverTentativaContato";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import { getDadosEntrevistaByPropostaId } from "../../../../_services/teleEntrevistaV2.service";

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

const Row = ({ item, setShowConversas, setNomeWhatsapp, setResponsavelAtendimentoWhatsapp, setWhatsappSelected, setConversaSelecionada, selectedObjects, setSelectedObjects, setFlushHook }) => {

    const { name } = useContext(AuthContext)

    const [openRow, setOpenRow] = useState(false)

    const handleShowConversa = () => {
        setNomeWhatsapp(item.nome)
        setResponsavelAtendimentoWhatsapp(item.responsavelConversa)
        setWhatsappSelected(item.whatsapp)
        setConversaSelecionada(item)
        setShowConversas(true)
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center" padding={'none'}>
                    {
                        (item.newStatus !== 'Concluído' || item.status !== 'Concluído') && (
                            <Checkbox
                                checked={selectedObjects.some(obj => obj._id === item._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedObjects(prev => [...prev, item])
                                    } else {
                                        setSelectedObjects(prev => prev.filter(obj => item._id !== obj._id))
                                    }
                                    console.log(selectedObjects);
                                }}
                            />
                        )
                    }

                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.atendimentoHumanizado ? (
                        <Tooltip title='Em atendimento humanizado'>
                            <Chip label={item.newStatus} sx={{ bgcolor: deepPurple[100] }} />
                        </Tooltip>
                    ) : (
                        <Chip label={item.newStatus} />
                    )}
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
                    <SelectAlterarSexo setFlushHook={setFlushHook} _id={item._id} sexo={item.sexo} />
                    {/* {item.sexo} */}
                </TableCell>
                <TableCell align="center" padding="none">
                    {item.riscoBeneficiario}
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.telefone}
                    <PopoverAlterarTelefone setFlushHook={setFlushHook} _id={item._id} telefone={item.telefone} />
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {
                        item.enfermeiro === name ? (
                            <Chip label={item.enfermeiro} color="success" variant="outlined" />
                        ) : (
                            item.enfermeiro
                        )
                    }
                </TableCell>
                <TableCell align="center" padding={'none'}>
                    {item.janelaHorario}
                </TableCell>
                <TableCell align="center" padding="none">
                    {item.dataEntrevista && moment(item.dataEntrevista).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align="center" padding="none">
                    {item.dataEntrevista && moment(item.dataEntrevista).format('HH:mm:ss')}
                </TableCell>
                <TableCell align="center" padding="none">
                    {item.canal}
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
                    {
                        item.status !== 'Cancelado' && (
                            <Box display={'flex'}>
                                <Tooltip title={item.status !== 'Concluído' ? 'Formulario' : 'Editar Formulario'}>
                                    <IconButton href={item.status !== 'Concluído' ? `/entrevistas/formulario/${item._id}` : `/entrevistas/propostas/editar/${item._id}`} target="_blank" color="primary">
                                        {
                                            item.status !== 'Concluído' ? (
                                                <ListAltIcon />
                                            ) : (
                                                <AppRegistrationIcon />
                                            )
                                        }
                                    </IconButton>
                                </Tooltip>
                                {
                                    (item.newStatus === 'Concluído' || item.status === 'Concluído') && (
                                        <Tooltip title='PDF'>
                                            <IconButton onClick={async () => {
                                                const dadosEntrevista = await getDadosEntrevistaByPropostaId(item._id)
                                                gerarPdf(dadosEntrevista._id)
                                            }} color="error">
                                                <PictureAsPdfIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )
                                }
                            </Box>
                        )
                    }

                </TableCell>
                <TableCell align="center" padding="none">
                    <Tooltip title='Conversas'>
                        <IconButton color={!item.visualizado ? "success" : 'warning'} onClick={handleShowConversa}>
                            <WhatsAppIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow >
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
                                {
                                    item.tentativasDeContato.map((tentativa, index) => (
                                        <Typography key={index}>
                                            <strong>{tentativa.data}:</strong> {tentativa.canal} - {tentativa.responsavel}
                                        </Typography>
                                    ))
                                }
                                <PopoverTentativaContato
                                    _id={item._id}
                                    setFlushHook={setFlushHook}
                                >
                                    Tentativa de Contato
                                </PopoverTentativaContato>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Informações
                                </Typography>
                                <Box display={'flex'}>
                                    <Box m={1}>
                                        <Typography>
                                            <strong>CPF: </strong> {item.cpf}
                                        </Typography>
                                        <Typography>
                                            <strong>Data Nascimento: </strong> {item.dataNascimento}
                                        </Typography>
                                        <Typography>
                                            <strong>Filial: </strong>  {item.filial}
                                        </Typography>
                                        <Typography>
                                            <strong>Proposta: </strong> {item.proposta}
                                        </Typography>
                                    </Box>
                                    <Box m={1}>
                                        <Typography>
                                            <strong>Peso: </strong> {item.peso}
                                        </Typography>
                                        <Typography>
                                            <strong>Altura: </strong>  {item.altura}
                                        </Typography>
                                        <Typography>
                                            <strong>IMC: </strong> {item.imc}
                                        </Typography>
                                        <Typography>
                                            <strong>Data Conclusão: </strong> {moment(item.dataConclusao).format('DD/MM/YYYY HH:mm:ss')}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

const CardInfoTele = ({ data, setShowConversas, showConversas, setNomeWhatsapp, setResponsavelAtendimentoWhatsapp, setWhatsappSelected, setConversaSelecionada, selectedObjects, setSelectedObjects, setFlushHook }) => {

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
                                    key={item._id}
                                    item={item}
                                    setShowConversas={setShowConversas}
                                    showConversas={showConversas}
                                    setNomeWhatsapp={setNomeWhatsapp}
                                    setResponsavelAtendimentoWhatsapp={setResponsavelAtendimentoWhatsapp}
                                    setWhatsappSelected={setWhatsappSelected}
                                    setConversaSelecionada={setConversaSelecionada}
                                    selectedObjects={selectedObjects}
                                    setSelectedObjects={setSelectedObjects}
                                    setFlushHook={setFlushHook}
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