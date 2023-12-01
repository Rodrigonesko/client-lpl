import { AppBar, Box, Button, CircularProgress, Dialog, Divider, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterPropostasNaoRealizadas } from "../../../../_services/teleEntrevistaExterna.service";
import moment from "moment";
import { blue, deepPurple, grey } from "@mui/material/colors";
import ProtDetalhesTele from "../../ProtDetalhesTele/ProtDetalhesTele";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { filterPropostasAgendadas } from "../../../../_services/teleEntrevistaExterna.service";
import AuthContext from "../../../../context/AuthContext";
import { buscaAnalistasTele } from "../../../../_services/user.service";
import FiltroEnfermeiros from "./FiltroEnfermeiros";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    const fetchPropostas = async (page) => {
        setLoading(true);
        try {
            const result = await filterPropostasAgendadas({
                page: page,
                limit: 100,
                responsavel: responsavel
            })
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

    // const handlePesquisar = async (e) => {

    //     if (e) {
    //         e.preventDefault()
    //     }

    //     if (pesquisa === '') {
    //         return;
    //     }
    //     setLoading(true);
    //     setPage(1)
    //     const result = await filterPropostasNaoRealizadas({
    //         pesquisa: pesquisa,
    //         page: 1,
    //         limit: 100
    //     })
    //     setPropostas(result.result);
    //     setTotalPages(result.total);
    //     setLoading(false)
    // }

    const fetchAnalistas = async () => {
        setLoading(true)
        try {
            const resultAnalistas = await buscaAnalistasTele()
            setResponsavel(name)
            const findIndex = resultAnalistas.enfermeiros.findIndex(item => item.name === name)
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
            setAnalistas(resultAnalistas.enfermeiros)

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

    useEffect(() => {
        fetchAnalistas()
    }, [name]);

    return (
        <Box>
            <Typography
                variant='h6'
                m={2}
            >
                Agendadas
            </Typography>
            <Divider />
            <Box display={'flex'} m={2}>
                <FiltroEnfermeiros
                    analistas={analistas}
                    responsavel={responsavel}
                    handleSelectAnalista={handleSelectAnalista}
                    loading={loading}
                // handlePesquisar={handlePesquisar}
                />
                <Box>
                    {/* <form action="" style={{ display: 'flex', margin: '10px' }} onSubmit={handlePesquisar} >
                        <TextField label="Pesquisar" variant="outlined" size="small" value={pesquisa} onChange={e => setPesquisa(e.target.value)} />
                        <Button sx={{ ml: 2 }} variant={'contained'} color={'primary'} size="small" type="submit">Pesquisar</Button>
                    </form> */}
                    <Typography fontWeight={'bold'}>
                        {totalPages} propostas encontradas
                    </Typography>
                    <TableContainer>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            <Pagination count={Math.ceil(totalPages / 100)} page={page} onChange={handlePageChange} />
                        </Box>
                        {
                            !loading ? (
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: blue[600] }}>
                                            <TableCell sx={{ color: "white" }}>Data Entrevista</TableCell>
                                            <TableCell sx={{ color: "white" }} >Vigência</TableCell>
                                            <TableCell sx={{ color: "white" }}>Proposta</TableCell>
                                            <TableCell sx={{ color: "white" }}>Nome</TableCell>
                                            <TableCell sx={{ color: "white" }}>Associado</TableCell>
                                            <TableCell sx={{ color: "white" }}>Idade</TableCell>
                                            <TableCell sx={{ color: "white" }}>Sexo</TableCell>
                                            <TableCell sx={{ color: "white" }}>Tipo Contrato</TableCell>
                                            <TableCell sx={{ color: "white" }}>Responsavel</TableCell>
                                            <TableCell sx={{ color: "white" }}>Risco</TableCell>
                                            <TableCell sx={{ color: "white" }}></TableCell>
                                        </TableRow>
                                    </TableHead>
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
                                                    <Button
                                                        variant={'contained'}
                                                        color={'primary'}
                                                        size={'small'}
                                                        onClick={() => {
                                                            setCpfTitular(proposta.cpfTitular)
                                                            setOpenDialog(true)
                                                            setSelected(proposta.cpfTitular)
                                                        }}
                                                    >
                                                        Detalhes
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                            ) : (
                                <Box width={'100%'} display={'flex'} justifyContent={"center"}>
                                    <CircularProgress />
                                </Box>
                            )
                        }
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