import { IconButton, ListItemIcon, MenuItem, Tooltip, Typography, Menu as MenuComponent, ListItemText } from "@mui/material"
import { useState } from "react"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Toast from "../../../../components/Toast/Toast"
import { ArrowRight, Chat, FormatListNumbered, ManageAccounts, People } from "@mui/icons-material"
import { mandarParaAtendimentoHumanizado } from "../../../../_services/teleEntrevista.service"

const OptionsMenu = ({
    data,
    setSelected,
    setCpfTitular,
    setOpenDialog,
    fetchPropostas
}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleMandaHumanizado = async () => {
        try {
            console.log(data._id);
            const result = await mandarParaAtendimentoHumanizado({ id: data._id })
            console.log(result);
            setOpenToast(true)
            setSeverity('success')
            setMessage('Manda Humanizado enviado com sucesso')
            fetchPropostas()
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setSeverity('error')
            setMessage('Erro ao enviar Manda Humanizado')
        }
    }

    return (
        <>
            <Tooltip
                title={'Mais opções'}
            >
                <IconButton
                    size={'small'}
                    onClick={handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Tooltip>
            <MenuComponent
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() => {
                        setOpenDialog(true)
                        setCpfTitular(data.cpfTitular)
                        setSelected(data.cpfTitular)
                    }}
                >
                    <ListItemIcon>
                        <ManageAccounts />
                    </ListItemIcon>
                    <ListItemText>
                        Detalhes
                    </ListItemText>
                </MenuItem>
                <MenuItem
                    href={`/entrevistas/formulario/${data._id}`}
                >
                    <ListItemIcon>
                        <FormatListNumbered />
                    </ListItemIcon>
                    <ListItemText>
                        Formulario
                    </ListItemText>
                    <Typography>
                        <IconButton
                            href={`/entrevistas/formulario/${data._id}`}
                            target="_blank"
                        >
                            <ArrowRight />
                        </IconButton>
                    </Typography>
                </MenuItem>
                <MenuItem
                    href={`/entrevistas/chat/${data.whatsapp}`}
                >
                    <ListItemIcon>
                        <Chat />
                    </ListItemIcon>
                    <ListItemText>
                        Chat
                    </ListItemText>
                    <Typography>
                        <IconButton
                            href={`/entrevistas/chat/${data.whatsapp}`}
                            target="_blank"
                        >
                            <ArrowRight />
                        </IconButton>
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleMandaHumanizado}
                >
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText>
                        Manda Humanizado
                    </ListItemText>
                </MenuItem>
            </MenuComponent>

            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={severity}
                message={message}
            />
        </>
    )
}

export default OptionsMenu