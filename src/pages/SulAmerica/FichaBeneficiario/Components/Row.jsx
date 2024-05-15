import { Cancel, Edit, FeedOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { IconButton, TableCell, TableRow, TextField, Tooltip, Typography } from "@mui/material"
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
import { deepOrange, red } from "@mui/material/colors"

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
                <TableCell>{item.status}</TableCell>
                <TableCell>
                    {
                        item.status === 'A INICIAR' && <ModalAgendamento pedido={item._id} />
                    }
                    {
                        item.status === 'AGENDADO' && <Tooltip title='Reagendar'>
                            <IconButton size='small' color='warning' >
                                <FaRegArrowAltCircleLeft />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        (item.status === 'A INICIAR' || item.status === 'AGENDADO') && <Tooltip title='Formulário'>
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
                        (item.status === 'A INICIAR' || item.status === 'AGENDADO') && (
                            <ModalComponent
                                buttonIcon={<Cancel />}
                                buttonText='Cancelar'
                                buttonColorScheme='error'
                                headerText='Cancelar Pedido'
                                onAction={async () => {
                                    try {
                                        await updatePedido(item._id, { justificativa, status: 'CANCELADO' })
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
                                        await updatePedido(item._id, { status: 'A INICIAR' })
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
                </TableCell>
            </TableRow>
            <CollapseBeneficiario item={item} openRow={openRow} />
        </>
    )
}

export default Row