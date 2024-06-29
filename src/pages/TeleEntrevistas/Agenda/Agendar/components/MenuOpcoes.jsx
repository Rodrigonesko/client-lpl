import { IconButton, Tooltip, Menu, MenuItem, Box } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from "react";
import { ArrowForward, Block, Delete } from "@mui/icons-material";
import moment from "moment";
import AuthContext from "../../../../../context/AuthContext";
import { updatePropostaEntrevista } from "../../../../../_services/teleEntrevistaV2.service";

const MenuOpcoes = ({ proposta, setProposta, setOpenToast, setSeverity, setMessage }) => {

    const { name } = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const erro = () => {
        setOpenToast(true)
        setMessage('Erro ao salvar')
        setSeverity('error')
    }

    const sucesso = () => {
        setOpenToast(true)
        setMessage('Proposta atualizada com sucesso')
        setSeverity('success')
        handleClose()
    }

    const handleTentativaDeContato = async (tentativa) => {
        try {
            if (tentativa === 1) {
                await updatePropostaEntrevista({
                    _id: proposta._id,
                    contato1: moment().format('DD/MM/YYYY HH:mm'),
                    responsavelContato1: name
                })
                setProposta({
                    ...proposta,
                    contato1: moment().format('DD/MM/YYYY HH:mm'),
                    responsavelContato1: name
                })
            }
            if (tentativa === 2) {
                await updatePropostaEntrevista({
                    _id: proposta._id,
                    contato2: moment().format('DD/MM/YYYY HH:mm'),
                    responsavelContato2: name
                })
                setProposta({
                    ...proposta,
                    contato2: moment().format('DD/MM/YYYY HH:mm'),
                    responsavelContato2: name
                })
            }
            if (tentativa === 3) {
                await updatePropostaEntrevista({
                    _id: proposta._id,
                    contato3: moment().format('DD/MM/YYYY HH:mm'),
                    responsavelContato3: name
                })
                setProposta({
                    ...proposta,
                    contato3: moment().format('DD/MM/YYYY HH:mm'),
                    responsavelContato3: name
                })
            }
            sucesso()
        } catch (error) {
            console.log(error);
            erro()
        }
    }

    return (
        <>
            <Tooltip title="Opções">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ mr: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <MenuIcon fontSize="5px" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: '#1D1D1D',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                        bgcolor: '#1D1D1D',
                        color: 'lightgray',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => handleTentativaDeContato(1)}>
                    {
                        proposta.contato1 ? proposta.contato1 : '1° Tentativa'
                    }
                </MenuItem>
                {
                    proposta.contato1 && (
                        <MenuItem onClick={() => handleTentativaDeContato(2)}>
                            {
                                proposta.contato2 ? proposta.contato2 : '2° Tentativa'
                            }
                        </MenuItem>
                    )
                }
                {
                    proposta.contato2 && (
                        <MenuItem onClick={() => handleTentativaDeContato(3)}>
                            {
                                proposta.contato3 ? proposta.contato3 : '3° Tentativa'
                            }
                        </MenuItem>
                    )
                }
                <MenuItem onClick={() => console.log('Cancelar')}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={1}
                        width={'100%'}
                    >
                        Cancelar <Block />
                    </Box>
                </MenuItem>
                <MenuItem onClick={() => console.log('Excluir')}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={1}
                        width={'100%'}
                    >
                        Excluir <Delete />
                    </Box>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        window.open(`/entrevistas/formulario/${proposta._id}`, '_blank');
                    }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={1}
                        width={'100%'}
                    >
                        Formulário <ArrowForward />
                    </Box>
                </MenuItem>
            </Menu>
        </>
    )
}

export default MenuOpcoes;