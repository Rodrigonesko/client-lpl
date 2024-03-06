import { AppBar, Box, Chip, Dialog, IconButton, LinearProgress, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState, useEffect, forwardRef } from "react"
import { getPropostasSemResposta } from "../../../../_services/teleEntrevistaExterna.service"
import moment from "moment"
import OptionsMenu from "./OptionsMenu"
import CloseIcon from "@mui/icons-material/Close"
import { grey } from "@mui/material/colors"
import ProtDetalhesTele from "../../ProtDetalhesTele/ProtDetalhesTele"


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const NaoRespondias = () => {

    const [pesquisa, setPesquisa] = useState('')
    const [propostas, setPropostas] = useState([])
    const [loading, setLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [cpfTitular, setCpfTitular] = useState('')
    const [page, setPage] = useState(1)
    const [flush, setFlush] = useState(false)

    function gerarCorRGB(numero) {
        // Garantir que o número seja um inteiro positivo
        numero = Math.abs(parseInt(numero));

        // Limitar o número a 11 dígitos
        numero = Math.min(numero, 99999999999);

        // Calcular os componentes RGB com base no número
        const red = numero % 256;
        const green = Math.floor((numero / 256) % 256);
        const blue = Math.floor((numero / (256 * 256)) % 256);

        // Verificar se a cor é escura
        const luminancia = 0.299 * red + 0.587 * green + 0.114 * blue;
        const textoBranco = luminancia < 128; // Se a luminância for menor que 128, a cor é considerada escura

        return {
            cor: `rgb(${red}, ${green}, ${blue})`,
            textoBranco: textoBranco
        };
    }

    useEffect(() => {
        const fetch = async () => {
            const result = await getPropostasSemResposta()
            setPropostas(result)
        }
        fetch()
    }, [flush])

    return (
        <Box>
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
                            backgroundColor: 'currentColor',
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Não Respondidas
                </Typography>
            </Box>
            <Box>
                <form
                    style={{
                        display: 'flex',
                        gap: '1rem'
                    }}
                >
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />
                </form>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={2}
                mb={2}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    {propostas.length} Resultados
                </Typography>
                <Box>
                    <Chip label="Não agendados" color="default" sx={{ mr: 1 }} />
                    <Chip label="Não Concluídos" color="primary" sx={{ mr: 1 }} />
                    <Chip label="Não Cancelados" color="error" sx={{ mr: 1 }} />
                    <Chip label="Enviado a mais de 6 horas" color="warning" sx={{ mr: 1 }} />
                </Box>
            </Box>
            <TableContainer>
                <Table
                    size="small"
                >
                    <TableHead
                        sx={{
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        <TableRow>
                            <TableCell>Proposta</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF</TableCell>
                            <TableCell>CPF Titular</TableCell>
                            <TableCell>Tipo Associado</TableCell>
                            <TableCell>Contrato</TableCell>
                            <TableCell>Idade</TableCell>
                            <TableCell>DDD</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell>Horario Enviado</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ? (propostas.filter((proposta) => {
                                if (pesquisa === '') {
                                    return proposta
                                } else if (proposta.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
                                    return proposta
                                } else if (proposta.proposta.toLowerCase().includes(pesquisa.toLowerCase())) {
                                    return proposta
                                }
                            }).map((proposta) => (
                                <TableRow
                                    key={proposta._id}
                                >
                                    <TableCell>
                                        <Tooltip
                                            title={proposta.atendimentoHumanizado ? 'Atendimento Humanizado' : ''}
                                            placement="top"
                                            arrow
                                        >
                                            <Chip label={proposta.proposta} color={proposta.atendimentoHumanizado ? 'secondary' : 'default'} />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{proposta.nome}</TableCell>
                                    <TableCell>{proposta.cpf}</TableCell>
                                    <TableCell
                                        sx={{
                                            bgcolor: gerarCorRGB(proposta.cpfTitular).cor,
                                            color: gerarCorRGB(proposta.cpfTitular).textoBranco ? 'white' : 'black'
                                        }}
                                    >{proposta.cpfTitular}</TableCell>
                                    <TableCell>{proposta.tipoAssociado}</TableCell>
                                    <TableCell>{proposta.tipoContrato}</TableCell>
                                    <TableCell>{proposta.idade}</TableCell>
                                    <TableCell>{proposta.ddd}</TableCell>
                                    <TableCell>{proposta.celular}</TableCell>
                                    <TableCell>{moment(proposta.horarioEnviado).format('DD/MM/YYYY HH:mm')}</TableCell>
                                    <TableCell>
                                        <OptionsMenu
                                            data={proposta}
                                            setOpenDialog={setOpenDialog}
                                            setCpfTitular={setCpfTitular}
                                            setSelected={setCpfTitular}
                                            fetchPropostas={() => setFlush(!flush)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))) : (
                                <TableRow>
                                    <TableCell colSpan={11} align={'center'}>
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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
                <ProtDetalhesTele key={cpfTitular} cpfTitular={cpfTitular} atualizarTabela={() => setFlush(!flush)} atualizarPesquisa={() => console.log('i') /* handlePesquisar */} pesquisa={pesquisa} />
            </Dialog>
        </Box>
    )
}

export default NaoRespondias