import { ArrowForward, AssignmentReturnOutlined, Delete, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { Chip, IconButton, TableCell, TableRow, Tooltip } from "@mui/material"
import { useContext, useState } from "react"
import { colorStatusRsdBradesco } from "../../utils/types"
import SubCollapsePedidos from "./SubCollapsePedidos"
import ModalComponent from "../../../../components/ModalComponent/ModalComponent"
import { red } from "@mui/material/colors"
import { deletePacote, updatePacote } from "../../../../_services/rsdBradesco.service"
import AuthContext from "../../../../context/AuthContext"

const Pacotes = ({ pacote,
    setPacotes,
    setOpenToast,
    setMessage,
    setSeverity,
    segurados,
    setFlushHook
}) => {

    const [openRow, setOpenRow] = useState(false)

    const { name } = useContext(AuthContext)

    const handleDelete = async () => {
        try {
            await deletePacote(pacote._id)
            setMessage('Pacote deletado com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setPacotes(prev => prev.filter(item => item._id !== pacote._id))
        } catch (error) {
            console.log(error)
            setMessage('Erro ao deletar pacote')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    const handleAssume = async () => {
        try {
            await updatePacote(
                pacote._id,
                { responsavel: name }
            )
            setMessage('Pacote assumido com sucesso')
            setSeverity('success')
            setOpenToast(true)
            setFlushHook(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao assumir pacote')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="left" >
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
                <TableCell align="left">{pacote.codigo}</TableCell>
                <TableCell align="left">{pacote.responsavel}</TableCell>
                <TableCell
                    align="center"
                >
                    <Chip
                        label={pacote.status}
                        sx={{
                            color: 'white',
                            backgroundColor: colorStatusRsdBradesco[pacote.status],
                        }}
                        size="small"
                    />
                </TableCell>
                <TableCell
                    align="right"
                >
                    {pacote.status === 'A INICIAR' &&
                        <Tooltip title='Assumir Pacote'>
                            <ModalComponent
                                buttonIcon={<AssignmentReturnOutlined />}
                                buttonText={'Assumir'}
                                headerText={'Assumir Pacote'}
                                size='sm'
                                textButton={'Assumir'}
                                onAction={handleAssume}
                            >
                                Deseja assumir o Pacote {pacote.codigo}?
                            </ModalComponent>
                        </Tooltip>
                    }
                    {pacote.pedidos.length === 0 &&
                        <ModalComponent
                            buttonIcon={<Delete />}
                            buttonText="Deletar"
                            buttonColorScheme={red[800]}
                            headerText="Deletar Pacote"
                            size="sm"
                            saveButtonColorScheme={red[800]}
                            textButton={'Deletar'}
                            onAction={handleDelete}
                        >
                            Deseja Deletar o Pacote {pacote.codigo}?
                        </ModalComponent>
                    }
                    <Tooltip title='Detalhes'>
                        <IconButton size='small' href={`/bradesco/protocolos/${pacote._id}`} >
                            <ArrowForward color="primary" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5}>
                    <SubCollapsePedidos openSubRow={openRow} pacote={pacote} segurados={segurados} />
                </TableCell>
            </TableRow>
        </>
    )
}

export default Pacotes