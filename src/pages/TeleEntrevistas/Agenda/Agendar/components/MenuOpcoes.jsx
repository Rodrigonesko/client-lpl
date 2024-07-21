import { IconButton, Tooltip, Menu, MenuItem, Box } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { ArrowForward, Phone, Undo } from "@mui/icons-material";
import { PropostaService } from "../../../../../_services/teleEntrevistaV2.service";
import ModalExcluir from "./ModalExcluir";
import ModalCancelar from "./ModalCancelar";
import ModalReagendar from "./ModalReagendar";

const propostaService = new PropostaService()

const MenuOpcoes = ({ proposta, setProposta, setRefresh, setOpenToast, setSeverity, setMessage, rn }) => {

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

    const handleTentativaDeContato = async () => {
        try {
            const response = await propostaService.adicionarTentativaDeContato(proposta._id, {
                canal: 'TELEFONE',
            })
            setProposta(response)
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
                {
                    !rn && proposta.tentativasDeContato.map((tentativa, index) => (
                        <MenuItem
                            key={index}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent={"space-between"}
                                gap={1}
                                width={'100%'}
                            >
                                {tentativa.data}
                            </Box>
                        </MenuItem>
                    ))
                }
                {!rn && <MenuItem
                    onClick={handleTentativaDeContato}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent={"space-between"}
                        gap={1}
                        width={'100%'}
                    >
                        Tentativa de Contato <Phone />
                    </Box>
                </MenuItem>}
                {!rn && <ModalCancelar
                    proposta={proposta}
                    setRefresh={setRefresh}
                    setOpenToast={setOpenToast}
                    setSeverity={setSeverity}
                    setMessage={setMessage}
                />}
                {!rn && <ModalExcluir
                    proposta={proposta}
                    setRefresh={setRefresh}
                    setOpenToast={setOpenToast}
                    setSeverity={setSeverity}
                    setMessage={setMessage}
                />}
                {
                    (proposta.agendado.toLowerCase() === 'agendado') && <ModalReagendar proposta={proposta} setRefresh={setRefresh} />
                }

                <MenuItem
                    onClick={() => {
                        if(!rn){
                            window.open(`/entrevistas/formulario/${proposta._id}`, '_blank');
                        } else {
                            window.open(`/rn/rns/${proposta._id}`, '_blank');
                        }
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