import React, { useState, useContext } from "react";
import { FaUserCircle, FaExchangeAlt, FaArchive, FaHome, FaClipboard, FaCalendar, FaShieldAlt, FaDonate, FaClipboardCheck, FaWhatsapp, FaUserSecret, FaTools } from "react-icons/fa";
import { RiAlarmWarningLine } from 'react-icons/ri'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import { Alert, Avatar, Badge, Box, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css'
import { useEffect } from "react";
import { io } from "socket.io-client";
import { getChats, sendMessageInterno } from "../../_services/chat.service";
import ChatIcon from '@mui/icons-material/Chat';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { deepPurple, green } from "@mui/material/colors";
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';

const notificationSound = '/sounds/notification-sound.mp3'; // Caminho para o arquivo de som

let socket
let socketTele

const Sidebar = ({ children }) => {

    const location = useLocation();

    const [isOpen, setIsOpen] = useState(localStorage.getItem('isOpen') === 'true')
    const [quantidadeMensagens, setQuantidadeMensagens] = useState(0)
    const { name, acessos } = useContext(AuthContext)
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [chatId, setChatId] = useState('')
    const [remetente, setRemetente] = useState('')
    const [openToastTele, setOpenToastTele] = useState(false)
    const [messageTele, setMessageTele] = useState('')
    const [whatsappTele, setWhatsappTele] = useState('')

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        localStorage.setItem('isOpen', isOpen)
    }, [isOpen])


    const fetchData = async () => {
        const result = await getChats()
        setQuantidadeMensagens(result.naoLidas)
    }

    useEffect(() => {


        if (!socket || socket._opts.query !== `name=${name}`) {
            socket = io(`${process.env.REACT_APP_CHAT_SERVICE}`, {
                query: `name=${name}`
            })
        }

        if (!socketTele) {
            socketTele = io(`${process.env.REACT_APP_API_TELE_KEY}`, {
                query: `name=${name}`
            })
        }


        socketTele.on('receivedMessage', async (data) => {
            if (location.pathname === `/entrevistas/chat/${data.whatsapp}`) {
                return
            }

            if (!data.responsavel || data.enfermeiro === '') {
                return
            }

            if (data.responsavel === name || data.enfermeiro === name) {
                console.log(data.responsavel, data.enfermeiro);
                console.log(name);
                setMessageTele(`${data.proposta} - ${data.nome}: ${data.mensagem}`)
                setWhatsappTele(data.whatsapp)

                if (location.pathname !== `/entrevistas/chat/${data.whatsapp}`) {
                    setOpenToastTele(true);
                }
            }
        })

        socket.on('receivedMessage', async (data) => {
            if (location.pathname === '/internMessages') {
                return
            }
            if (data.participantes.includes(name) && data.remetente !== name) {
                setMessage(`${data.remetente}: ${data.mensagem}`)
                setRemetente(data.remetente)
                setChatId(data.chatId)
                if (location.pathname !== '/internMessages') {
                    setOpenToast(true);

                    // Adicionando som de notificação
                    const audio = new Audio(notificationSound);
                    audio.play();
                }
            }
            fetchData()

        })
        socket.on('seeMessage', async () => {
            fetchData()
        })
    }, [name])

    const sendMessage = async (e) => {
        e.preventDefault()

        if (newMessage === '') {
            return
        }

        await sendMessageInterno({
            mensagem: newMessage,
            chatId: chatId,
            receptor: remetente
        })
        fetchData()
        setNewMessage('')
        setOpenToast(false)
    }

    return (
        <Box display={'flex'} width={'100%'}>
            <ProSidebar collapsed={isOpen}>
                <Box display={'flex'} justifyContent={isOpen ? 'center' : 'end'} alignItems={'center'} height={'50px'} bgcolor={'#1D1D1D'}>
                    <IconButton color="inherit" onClick={toggleMenu}>
                        {isOpen ? <MenuIcon /> : <KeyboardArrowLeftIcon />}
                    </IconButton>
                </Box>
                <Menu iconShape="round">
                    <MenuItem icon={<FaHome />}><Link to='/'>Home</Link></MenuItem>
                    <MenuItem icon={<Badge badgeContent={quantidadeMensagens} color="secondary">
                        <ChatIcon />
                    </Badge>}><Link to='/internMessages'>Chat</Link></MenuItem>
                    <MenuItem icon={< FaExchangeAlt />}><Link to='/controleAtividades'>Controle de Atividades</Link></MenuItem>
                    {
                        acessos?.administrador ? (
                            <SubMenu title="Admin" icon={<FaShieldAlt />} >
                                <SubMenu title='Produção' icon={<FaUserSecret />}>
                                    <MenuItem><Link to='/admin/producao/solicitarChamados'>Abrir Chamados</Link></MenuItem>
                                    <MenuItem><Link to='/admin/producao/analitico'>Analítico</Link></MenuItem>
                                    <MenuItem><Link to='/admin/producao/users'>Usuários</Link></MenuItem>
                                    <MenuItem><Link to='/admin/producao/relatorioProdutividade'>Relatorios de Produtividade</Link></MenuItem>
                                </SubMenu>
                                <SubMenu icon={<FaArchive />} title='RH'>
                                    <MenuItem><Link to='/admin/rh/bancoHoras'>Banco De Horas</Link></MenuItem>
                                    <MenuItem><Link to='/admin/rh/controlePoliticas'>Controle de Políticas</Link></MenuItem>
                                    <MenuItem><Link to='/admin/rh/prototipoAdmissionalDemissional'>Checklist Admissão Demissão</Link></MenuItem>
                                    <MenuItem><Link to='/admin/rh/ferias'>Controle Férias</Link></MenuItem>
                                    <MenuItem><Link to='/admin/rh/treinamentos'>Treinamentos</Link></MenuItem>
                                    <MenuItem><Link to='/admin/rh/agenda'>Agenda</Link></MenuItem>
                                </SubMenu>
                                <SubMenu title='Infra' icon={<FaTools />}>
                                    <MenuItem><Link to='/admin/infra/atendimentoChamados'>Chamados TI</Link></MenuItem>
                                    <MenuItem><Link to='/admin/infra/contingencias'>Controle de Contingências</Link></MenuItem>
                                    <MenuItem><Link to='/admin/infra/inventario'>Inventário</Link></MenuItem>
                                </SubMenu>
                            </SubMenu>
                        ) : null
                    }
                    <SubMenu title="Tele Entrevistas" icon={<FaClipboard />}>
                        <SubMenu title='Agenda' icon={<FaCalendar />}>
                            <MenuItem><Link to='/entrevistas/agenda/agendar'>Agendar</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/agenda/agendados'>Agendados</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/agenda/mensagens'>Mensagens</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/agenda/anexos'>Anexar SisAmil</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/implantacao'>Implatação</Link></MenuItem>
                            {
                                acessos?.agendamento || acessos?.administrador ? (
                                    <MenuItem><Link to='/entrevistas/agenda/horarios'>Ajustar Horarios</Link></MenuItem>
                                ) : null
                            }
                        </SubMenu>
                        <SubMenu title='Whatsapp' icon={<FaWhatsapp />}>
                            <MenuItem><Link to='/entrevistas/naoEnviados'>Não Enviados</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/Ajustar'>Ajustar</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/Enviados'>Enviados</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/ErroAoEnviar'>Erro ao enviar</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/AtendimentoHumanizado'>Atendimento Humanizado</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/RespostasJanelas'>Janelas Escolhidas</Link></MenuItem>
                            <MenuItem><Link to='/entrevistas/conversas'>Conversas</Link></MenuItem>
                        </SubMenu>
                        <MenuItem><Link to='/entrevistas/propostas'>Propostas</Link></MenuItem>
                        <MenuItem><Link to='/rn/todas'>Rns</Link></MenuItem>
                        {
                            acessos?.agendamento || acessos?.administrador ? (<>

                                <MenuItem><Link to='/entrevistas/reportAgendadas'>Report Agendadas</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/producaoDiaria'>Produção Diaria</Link></MenuItem>
                                <MenuItem><Link to='/entrevistas/producao'>Produção</Link></MenuItem>
                            </>
                            ) : null
                        }
                        {
                            name === 'Administrador' ? (
                                <MenuItem><Link to='/entrevistas/faturamento'>Faturamento</Link></MenuItem>
                            ) : null
                        }
                        <MenuItem><Link to='/entrevistas/report'>Report</Link></MenuItem>
                        <MenuItem><Link to='/entrevistas/upload'>Upload</Link></MenuItem>
                        <MenuItem><Link to='/rn/upload'>Upload Rn</Link></MenuItem>
                        <MenuItem><Link to='/entrevistas/cid/adicionar'>Adicionar Cid</Link></MenuItem>
                        <MenuItem><Link to='/dicionario'>Dicionário</Link></MenuItem>
                    </SubMenu>
                    <SubMenu title="Urgência & Emergência" icon={<RiAlarmWarningLine />} >
                        <MenuItem><Link to='/urgenciaEmergencia/andamento'>Em andamento</Link></MenuItem>
                        <MenuItem><Link to='/urgenciaEmergencia/anexar'>Anexar</Link></MenuItem>
                        <MenuItem><Link to='/urgenciaEmergencia/todos'>Concluídos</Link></MenuItem>
                        <MenuItem><Link to='/urgenciaEmergencia/producao'>Produção</Link></MenuItem>
                        <MenuItem><Link to='/urgenciaEmergencia/upload'>Upload</Link></MenuItem>

                    </SubMenu>
                    <SubMenu title='RSD' icon={<FaDonate></FaDonate>}>
                        <MenuItem><Link to='/Rsd/PainelProcesso'>Painel de Processos</Link></MenuItem>
                        <MenuItem><Link to='/rsd/CriarPedidoIndividual/'>Criar Pedido/Protocolo</Link></MenuItem>
                        <MenuItem><Link to='/rsd/OperadoraBeneficiario/'>Operadora Beneficiário</Link></MenuItem>
                        <MenuItem><Link to='/rsd/Concluidos/'>Concluidos</Link></MenuItem>
                        <MenuItem><Link to='/Rsd/UploadArquivo'>Upload</Link></MenuItem>
                        <MenuItem><Link to='/Rsd/UploadQuarentena'>Upload Alta Frequência</Link></MenuItem>
                        <MenuItem><Link to='/rsd/Relatorio'>Relatório</Link></MenuItem>
                        {/* {
                                accessLevel !== 'false' ? (
                                    <MenuItem><Link to='/rsd/producaoDiaria'>Produção Diaria</Link></MenuItem>
                                ) : null
                            } */}
                        <MenuItem><Link to='/rsd/BaixaAgd'>Baixa AGD</Link></MenuItem>
                    </SubMenu>
                    <SubMenu title='Elegiblidade' icon={<FaClipboardCheck />}>
                        <MenuItem><Link to='/elegibilidade/analiseDocumentos'>Atribuição analista</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/semDocumentos'>Sem Documentos</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/analise'>Análise</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/devolvidas'>Devolvidas</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/cancelar'>Cancelar</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/todos'>Todos</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/propostasAmil'>Propostas Amil</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/producao'>Produção</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/upload'>Upload</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/divergencias'>Divergências</Link></MenuItem>
                        <MenuItem><Link to='/elegibilidade/planosBlacklist'>Planos Blacklist</Link></MenuItem>
                        <SubMenu title='PME'>
                            <MenuItem><Link to='/elegibilidadePme/andamento'>Em andamento</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidadePme/todos'>Todos</Link></MenuItem>
                            <MenuItem><Link to='/elegibilidadePme/upload'>Upload</Link></MenuItem>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu title='Prototipo Tele' icon={<FaClipboard />}>
                        <MenuItem><Link to='/prototipoTele/filtros'>Pendencias</Link></MenuItem>
                        <MenuItem><Link to='/prototipoTele/enviar'>Envio</Link></MenuItem>
                    </SubMenu>
                    <SubMenu title='Sindicância' icon={<GavelOutlinedIcon />}>
                        <MenuItem><Link to='/demandas'>Demandas</Link></MenuItem>
                    </SubMenu>
                    <SubMenu title={"Whastapp"} icon={<FaWhatsapp />}>
                        <MenuItem><Link to='/whatsapp/chat'>Chat</Link></MenuItem>
                        <MenuItem><Link to='/whatsapp/templates'>Templates</Link></MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
            <Box width={'100%'} >
                <Box width={'100%'} height={'50px'} bgcolor={'#1D1D1D'} display={'flex'} justifyContent={'flex-end'}>
                    <ProfileMenu />
                </Box>
                <Box overflow={'auto'} style={{ height: 'calc(100vh - 50px)' }}>
                    {children}
                </Box>
            </Box>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }} open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
                <Alert variant="filled" onClose={() => setOpenToast(false)} severity="info" sx={{ width: '100%', background: deepPurple[500] }}>

                    <Typography>
                        <Avatar
                            sx={{
                                backgroundColor: 'info.main',
                                mr: 2
                            }}
                            alt={remetente}
                            src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${remetente.split(' ').join('%20')}.jpg`}
                        >
                        </Avatar>
                        {message}
                    </Typography>
                    <form action="" onSubmit={sendMessage} style={{ width: '100%' }} >
                        <TextField inputProps={{
                            style: {
                                color: 'white',
                                background: deepPurple[300],
                            }
                        }}
                            fullWidth value={newMessage} onChange={e => setNewMessage(e.target.value)} size="small" />
                    </form>
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }} open={openToastTele} autoHideDuration={6000} onClose={() => setOpenToastTele(false)}>
                <Alert variant="filled" onClose={() => setOpenToastTele(false)} severity="info" sx={{ width: '100%', background: green[700] }}>
                    <Typography>
                        {messageTele}
                    </Typography>
                    <Typography
                        component='a'
                        href={`/entrevistas/chat/${whatsappTele}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'white' }}
                        sx={{
                            '&:hover': {
                                textDecoration: 'underline',
                                color: 'white'
                            }

                        }}

                    >
                        Ver Mensagens
                    </Typography>
                </Alert>
            </Snackbar>
        </Box >
    )
}

export default Sidebar