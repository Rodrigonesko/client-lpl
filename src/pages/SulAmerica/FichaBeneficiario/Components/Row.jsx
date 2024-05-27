import { Cancel, Edit, FeedOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Chip, IconButton, TableCell, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import ModalAgendamento from "./ModalAgendamento"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { BsFilePdf } from "react-icons/bs"
import { RiArrowGoBackFill } from "react-icons/ri"
import CollapseBeneficiario from "./CollapseBeneficiario"
import moment from "moment"
import { getRespostasByPedidoId, updatePedido } from "../../../../_services/sulAmerica.service"
import { createPdf } from "../../PDF/createPdf"
import ModalComponent from "../../../../components/ModalComponent/ModalComponent"
import { blue, deepOrange, green, orange, red } from "@mui/material/colors"
import { reabrirHorarios } from "../../../../_services/teleEntrevista.service"

const colorStatus = {
    'A INICIAR': blue[900],
    'AGENDADO': orange[900],
    'EM ANDAMENTO': deepOrange[900],
    'CONCLUÍDO': green[900],
    'CANCELADO': red[900]
}

const Row = ({ item, flushHook, setOpenSnack, setFlushHook, setMsg, setSeveritySnack }) => {

    const [openRow, setOpenRow] = useState(false)
    const [justificativa, setJustificativa] = useState('')

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => {
                            setOpenRow(!openRow)
                        }}
                    >
                        <Tooltip title='Detalhes'>
                            {openRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </Tooltip>
                    </IconButton>
                </TableCell>
                <TableCell>{item.prestador.nome}</TableCell>
                <TableCell>{item.beneficiario.nome}</TableCell>
                <TableCell>{item.responsavel}</TableCell>
                <TableCell>{item.dataAgendamento}</TableCell>
                <TableCell>{moment(item.dataCriacao).format('DD/MM/YYYY')}</TableCell>
                <TableCell
                    align="center"
                >
                    <Chip
                        label={item.status}
                        sx={{
                            backgroundColor: colorStatus[item.status],
                            color: 'white'
                        }}
                        size="small"
                    />
                </TableCell>
                <TableCell
                    align="center"
                >
                    {
                        item.divergencia && <Chip
                            label='Divergência'
                            color='error'
                            size='small'
                        />
                    }
                </TableCell>
                <TableCell>
                    {
                        (item.status === 'A INICIAR' || item.status === 'EM ANDAMENTO') && <ModalAgendamento pedido={item._id} />
                    }
                    {
                        item.status === 'AGENDADO' && (
                            <>
                                <IconButton size='small' color='warning' >
                                    <ModalComponent
                                        buttonIcon={<FaRegArrowAltCircleLeft size={'20px'} />}
                                        buttonText='Reagendar'
                                        headerText='Reagendar Pedido'
                                        buttonColorScheme={'warning'}
                                        onAction={async () => {
                                            try {
                                                console.log({
                                                    data: moment(item.dataAgendamento).format('YYYY-MM-DD'),
                                                    responsavel: item.responsavel,
                                                    horarios: [moment(item.dataAgendamento).format('HH:mm')]
                                                });
                                                await updatePedido(item._id, { status: 'A INICIAR', dataAgendamento: '', responsavel: 'A DEFINIR' })
                                                await reabrirHorarios({
                                                    data: moment(item.dataAgendamento).format('YYYY-MM-DD'),
                                                    responsavel: item.responsavel,
                                                    horarios: [moment(item.dataAgendamento).format('HH:mm')]
                                                })
                                                setFlushHook(!flushHook)
                                                setOpenSnack(true)
                                                setSeveritySnack('success')
                                                setMsg(`Alterado status com sucesso`)
                                            }
                                            catch (error) {
                                                console.log(error);
                                                setOpenSnack(true)
                                                setSeveritySnack('error')
                                                setMsg(`Erro! ${error}`)
                                            }
                                        }}
                                        size={'sm'}
                                        saveButtonColorScheme={orange[900]}
                                        textButton={'Reagendar'}
                                    >
                                        <Typography>
                                            Tem certeza que deseja reagendar o pedido do prestador {item.prestador.nome}?
                                        </Typography>
                                    </ModalComponent>
                                </IconButton>
                            </>
                        )
                    }
                    {
                        (item.status === 'A INICIAR' || item.status === 'AGENDADO' || item.status === 'EM ANDAMENTO') && <Tooltip title='Formulário'>
                            <IconButton size='small' color='primary' href={`/sulAmerica/formulario/${item._id}`} >
                                <FeedOutlined />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        item.status === 'CONCLUÍDO' && <Tooltip title='PDF'>
                            <IconButton sie='small' color='error' onClick={async () => {
                                try {
                                    const response = await getRespostasByPedidoId(item._id)
                                    createPdf(response)
                                } catch (error) {
                                    console.log(error);
                                    setOpenSnack(true)
                                    setSeveritySnack('error')
                                    setMsg(`Erro! ${error}`)
                                }
                            }} >
                                <BsFilePdf />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        item.status === 'CONCLUÍDO' && <Tooltip title='Editar Formulário'>
                            <IconButton size='small' color='primary' href={`/sulAmerica/editarFormulario/${item._id}`} >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        (item.status === 'A INICIAR' || item.status === 'AGENDADO' || item.status === 'EM ANDAMENTO') && (
                            <ModalComponent
                                buttonIcon={<Cancel />}
                                buttonText='Cancelar'
                                buttonColorScheme='error'
                                headerText='Cancelar Pedido'
                                onAction={async () => {
                                    try {
                                        await updatePedido(item._id, { justificativaCancelamento: justificativa, status: 'CANCELADO', dataConclusao: moment().format('YYYY-MM-DD') })
                                        setFlushHook(!flushHook)
                                        setJustificativa('')
                                        setOpenSnack(true)
                                        setSeveritySnack('success')
                                        setMsg('Pedido cancelado com sucesso')
                                    } catch (error) {
                                        console.log(error);
                                        setOpenSnack(true)
                                        setSeveritySnack('error')
                                        setMsg(`Erro! ${error}`)
                                    }
                                }}
                                size={'sm'}
                                saveButtonColorScheme={red[900]}
                            >
                                <Typography>
                                    Tem certeza que deseja cancelar o pedido do prestador {item.prestador.nome}?
                                </Typography>
                                <TextField
                                    placeholder='Justificativa'
                                    fullWidth
                                    multiline
                                    rows={2}
                                    sx={{ mt: 2 }}
                                    value={justificativa}
                                    onChange={(e) => setJustificativa(e.target.value)}
                                />
                            </ModalComponent>
                        )
                    }
                    {
                        (item.status === 'CONCLUÍDO' || item.status === 'CANCELADO') && (
                            <ModalComponent
                                buttonIcon={<Tooltip title='Reabrir' >
                                    <IconButton size='small' color='warning' >
                                        <RiArrowGoBackFill />
                                    </IconButton>
                                </Tooltip>
                                }
                                buttonText='Reabrir'
                                headerText='Reabrir Pedido'
                                onAction={async () => {
                                    try {
                                        await updatePedido(item._id, { status: 'EM ANDAMENTO' })
                                        setFlushHook(!flushHook)
                                    } catch (error) {
                                        console.log(error);
                                        setOpenSnack(true)
                                        setSeveritySnack('error')
                                        setMsg(`Erro! ${error}`)
                                    }
                                }}
                                size={'sm'}
                                saveButtonColorScheme={deepOrange[900]}
                                textButton={'Reabrir'}
                            >
                                <Typography>
                                    Tem certeza que deseja reabrir o pedido do prestador {item.prestador.nome}?
                                </Typography>
                            </ModalComponent>
                        )
                    }
                </TableCell >
            </TableRow >
            <CollapseBeneficiario item={item} openRow={openRow} />
        </>
    )
}

export default Row