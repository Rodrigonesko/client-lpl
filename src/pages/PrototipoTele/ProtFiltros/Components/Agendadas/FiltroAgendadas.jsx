import { AppBar, Box, Dialog, Divider, IconButton, ListItemIcon, ListItemText, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography, MenuItem, Menu as MenuComponent, LinearProgress, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { blue, deepPurple, grey } from "@mui/material/colors";
import ProtDetalhesTele from "../../../ProtDetalhesTele/ProtDetalhesTele";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { filterPropostasAgendadas, filterPropostasNaoRealizadas } from "../../../../../_services/teleEntrevistaExterna.service";
import AuthContext from "../../../../../context/AuthContext";
import { filterUsers } from "../../../../../_services/user.service";
import FiltroEnfermeiros from "./FiltroEnfermeiros";
import { ArrowRight, Close, FormatListNumbered, History, ManageAccounts, Menu, PhoneEnabled, Replay, Search } from "@mui/icons-material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { reagendarEntrevista } from "../../../../../_services/teleEntrevista.service";
import Toast from "../../../../../components/Toast/Toast";
import { PropostaService } from "../../../../../_services/teleEntrevistaV2.service";
const propostaService = new PropostaService()

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MenuOptions = ({ data, setSelected, setCpfTitular, setOpenDialog, fetchPropostas }) => {

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

    const handleReagendar = async () => {
        try {
            await reagendarEntrevista({ id: data._id })
            setSeverity('success')
            setMessage('Reagendado com sucesso')
            setOpenToast(true)
            handleClose()
            fetchPropostas()
        } catch (error) {
            setSeverity('error')
            setMessage('Algo deu errado')
            setOpenToast(true)
            console.log(error);
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
                    onClick={handleReagendar}
                >
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText>
                        Reagendar
                    </ListItemText>
                </MenuItem>
                {
                    data.contato1 ? (
                        <MenuItem>
                            <ListItemIcon>
                                <PhoneEnabled />
                            </ListItemIcon>
                            <ListItemText>
                                {data.contato1}
                            </ListItemText>
                        </MenuItem>
                    ) : null
                }
                {
                    data.contato2 ? (
                        <MenuItem>
                            <ListItemIcon>
                                <PhoneEnabled />
                            </ListItemIcon>
                            <ListItemText>
                                {data.contato2}
                            </ListItemText>
                        </MenuItem>
                    ) : null
                }
                {
                    data.contato3 ? (
                        <MenuItem>
                            <ListItemIcon>
                                <PhoneEnabled />
                            </ListItemIcon>
                            <ListItemText>
                                {data.contato3}
                            </ListItemText>
                        </MenuItem>
                    ) : null
                }

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


const FiltroAgendadas = () => {

    const { name } = React.useContext(AuthContext)

    const [propostas, setPropostas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pesquisa, setPesquisa] = useState('');
    const [responsavel, setResponsavel] = useState(name)
    const [analistas, setAnalistas] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [cpfTitular, setCpfTitular] = useState('')
    const [selected, setSelected] = useState('')
    const [openFilter, setOpenFilter] = useState(true)

    const fetchPropostas = async (page) => {
        setLoading(true);
        try {
            const result = await filterPropostasAgendadas({
                page: page,
                limit: 100,
                responsavel: responsavel
            })
            console.log(result);
            setPropostas(result.result);
            setTotalPages(result.total);
            setLoading(false)
            setPesquisa('')

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchPropostas(value);
    }

    const handlePesquisar = async (e) => {

        if (e) {
            e.preventDefault()
        }

        if (pesquisa === '') {
            return;
        }
        setLoading(true);
        setPage(1)
        const result = await filterPropostasAgendadas({
            pesquisa: pesquisa,
            page: 1,
            limit: 100,
            responsavel: responsavel
        })
        console.log(result);
        setPropostas(result.result);
        setTotalPages(result.total);
        setLoading(false)
    }

    const fetchAnalistas = async () => {
        setLoading(true)
        try {
            const resultAnalistas = await filterUsers({
                atividadePrincipal: 'Tele Entrevista',
                inativo: { $ne: true }
            })
            setResponsavel(name)
            const findIndex = resultAnalistas.findIndex(item => item.name === name)
            if (findIndex === -1) {
                setResponsavel('Todos')
                const result = await filterPropostasAgendadas({
                    page: page,
                    limit: 100,
                    responsavel: 'Todos'
                })
                setPropostas(result.result);
                setTotalPages(result.total);
                setLoading(false)
                setPesquisa('')
            } else {
                const result = await filterPropostasAgendadas({
                    page: page,
                    limit: 100,
                    responsavel: name
                })
                setPropostas(result.result);
                setTotalPages(result.total);
                setLoading(false)
                setPesquisa('')
            }
            setAnalistas(resultAnalistas)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectAnalista = async (e) => {
        setLoading(true)
        setResponsavel(e.target.value)
        const result = await filterPropostasAgendadas({
            page: page,
            limit: 100,
            responsavel: e.target.value
        })
        setPropostas(result.result);
        setTotalPages(result.total);
        setLoading(false)
        setPesquisa('')
    }

    const handleClose = async () => {
        setOpenDialog(false)
        await propostaService.saiuDaProposta(cpfTitular)
    }

    useEffect(() => {
        fetchAnalistas()
    }, [name]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Box display={'flex'} mb={2}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '30%',
                            height: '2px',
                            bottom: 0,
                            left: '0%',
                            backgroundColor: blue[900],
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Agendadas
                </Typography>
            </Box>
            <Divider />
            <Box>
                {
                    !openFilter ? (
                        <IconButton
                            size={'small'}
                            onClick={() => setOpenFilter(true)}
                        >
                            <Menu />
                        </IconButton>
                    ) : (
                        <IconButton
                            size={'small'}
                            onClick={() => setOpenFilter(false)}
                        >
                            <Close />
                        </IconButton>
                    )
                }
            </Box>
            <Box display={'flex'} m={2}>
                <FiltroEnfermeiros
                    analistas={analistas}
                    responsavel={responsavel}
                    handleSelectAnalista={handleSelectAnalista}
                    loading={loading}
                    openSlide={openFilter}
                // handlePesquisar={handlePesquisar}
                />
                <Box
                    width={'100%'}
                >
                    <IconButton
                        onClick={() => fetchPropostas(page)}
                    >
                        <Replay />
                    </IconButton>
                    <form
                        action=""
                        style={{ display: 'flex', margin: '10px' }}
                        onSubmit={handlePesquisar}
                    >
                        <TextField
                            placeholder="Pesquisar"
                            variant="outlined"
                            size="small"
                            sx={{ width: '100%' }}
                            InputProps={{
                                startAdornment: (
                                    <Search
                                        sx={{
                                            color: grey[800],
                                            mr: 1
                                        }}
                                    />
                                )
                            }}
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                        />
                        <Button
                            sx={{
                                ml: 2,
                                backgroundColor: 'black',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'black',
                                    opacity: 0.8
                                }
                            }}
                            variant={'contained'}
                            size="small"
                            type="submit"
                        >Pesquisar</Button>
                    </form>
                    <Typography fontWeight={'bold'}>
                        {totalPages} propostas encontradas
                    </Typography>
                    <TableContainer>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Pagination count={Math.ceil(totalPages / 100)} page={page} onChange={handlePageChange} />
                        </Box>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                                    <TableCell>Data Entrevista</TableCell>
                                    <TableCell >Vigência</TableCell>
                                    <TableCell>Proposta</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Associado</TableCell>
                                    <TableCell>Idade</TableCell>
                                    <TableCell>Sexo</TableCell>
                                    <TableCell>Tipo Contrato</TableCell>
                                    <TableCell>Responsavel</TableCell>
                                    <TableCell>Risco</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                !loading ? (

                                    <TableBody>
                                        {propostas.map((proposta) => (
                                            <TableRow
                                                key={proposta._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: selected === proposta.cpfTitular ? deepPurple[100] : 'white' }}
                                            >
                                                <TableCell>{moment(proposta.dataEntrevista).format('DD/MM/YYYY HH:mm')}</TableCell>
                                                <TableCell>{moment(proposta.vigencia).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell>{proposta.proposta}</TableCell>
                                                <TableCell>{proposta.nome}</TableCell>
                                                <TableCell>{proposta.tipoAssociado}</TableCell>
                                                <TableCell>{proposta.idade}</TableCell>
                                                <TableCell>{proposta.sexo}</TableCell>
                                                <TableCell>{proposta.tipoContrato}</TableCell>
                                                <TableCell>{proposta.enfermeiro}</TableCell>
                                                <TableCell>{proposta.riscoBeneficiario}</TableCell>
                                                <TableCell>
                                                    <MenuOptions
                                                        data={proposta}
                                                        setSelected={setSelected}
                                                        setCpfTitular={setCpfTitular}
                                                        setOpenDialog={setOpenDialog}
                                                        fetchPropostas={() => fetchPropostas(page)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        }
                                    </TableBody>

                                ) : (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={11} align={'center'}>
                                                <LinearProgress />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )
                            }
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullScreen
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: grey[500] }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => {
                                setOpenDialog(false)
                                setCpfTitular('')
                            }}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ProtDetalhesTele key={cpfTitular} cpfTitular={cpfTitular} atualizarTabela={() => fetchPropostas(page)} atualizarPesquisa={() => console.log('i') /* handlePesquisar */} pesquisa={pesquisa} />
            </Dialog>
        </Box>
    )

}

export default FiltroAgendadas;