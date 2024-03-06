import { Box, Checkbox, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ajustarPropostasSemCpf, getPropostasSemCpf } from "../../../../_services/teleEntrevistaExterna.service"
import ModalComponent from "../../../../components/ModalComponent/ModalComponent"
import Toast from "../../../../components/Toast/Toast"

const Row = ({ proposta, setAjustados, ajustados }) => {

    const [cpfTitular, setCpfTitular] = useState('')

    return (
        < TableRow >
            <TableCell>
                {proposta.proposta}
            </TableCell>
            <TableCell>
                {proposta.nome}
            </TableCell>
            <TableCell>
                {proposta.cpf}
            </TableCell>
            <TableCell>
                <TextField
                    size="small"
                    placeholder='CPF titular'
                    value={cpfTitular}
                    onChange={(elem) => {
                        setCpfTitular(elem.target.value)
                        if (elem.target.value !== '') {
                            setAjustados(prevAjustados => {
                                const alreadyExists = prevAjustados.some(item => item.id === proposta._id);
                                if (!alreadyExists) {
                                    return [...prevAjustados, { id: proposta._id, cpfTitular: elem.target.value, nome: proposta.nome }];
                                }
                                return prevAjustados.map(item =>
                                    item.id === proposta._id
                                        ? { id: proposta._id, cpfTitular: elem.target.value, nome: proposta.nome }
                                        : item
                                );
                            });
                        } else {
                            setAjustados(prevAjustados => prevAjustados.filter(item => item.id !== proposta._id));
                        }
                    }}
                />
            </TableCell>
            <TableCell>
                {proposta.tipoAssociado}
            </TableCell>
            <TableCell>
                {proposta.dataNascimento}
            </TableCell>
            <TableCell>
                {proposta.ddd}
            </TableCell>
            <TableCell>
                {proposta.telefone}
            </TableCell>
            <TableCell>
                <Checkbox
                    checked={ajustados.some(item => item.id === proposta._id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setAjustados(ajustados.concat({ id: proposta._id, cpfTitular, nome: proposta.nome }))
                        } else {
                            setAjustados(ajustados.filter(item => item.id !== proposta._id))
                        }
                    }}
                />
            </TableCell>
        </TableRow >
    )
}


const ProtAjustar = () => {

    const [propostas, setPropostas] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [loading, setLoading] = useState(false)
    const [ajustados, setAjustados] = useState([])
    const [openToast, setOpenToast] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success')
    const [flush, setFlush] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getPropostasSemCpf()
            setPropostas(result)
            setLoading(false)
        }
        fetchData()
    }, [flush])

    const handleAjustar = async () => {
        try {
            for (const item of ajustados) {
                if (!item.cpfTitular || item.cpfTitular === '' || item.cpfTitular.length !== 11) {
                    console.log(item);
                    setOpenToast(true)
                    setMessage(`CPF Titular inválido no nome ${item.nome}`)
                    setSeverity('error')
                    return
                }
            }
            const result = await ajustarPropostasSemCpf({
                propostas: ajustados
            })
            if (result === 'ok') {
                setOpenToast(true)
                setMessage('Ajustes realizados com sucesso')
                setSeverity('success')
                setFlush(!flush)
            } else {
                setOpenToast(true)
                setMessage('Erro ao ajustar')
                setSeverity('error')
            }
        } catch (error) {
            console.log(error);
            setOpenToast(true)
            setMessage('Erro ao ajustar')
            setSeverity('error')
        }
    }

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
                    Ajustar
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
                <Typography>
                    Contatos a serem ajustados: {propostas.length}
                </Typography>
                <ModalComponent
                    isButton={true}
                    buttonText={'Ajustar'}
                    buttonIcon={null}
                    buttonColorScheme={'primary'}
                    headerText={'Ajustar'}
                    saveButtonColorScheme={'primary'}
                    onAction={handleAjustar}
                    size={'md'}
                >
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 'bold',
                                mb: '1rem'
                            }}
                        >
                            Ajustar {ajustados.length} contatos?
                        </Typography>
                        {
                            ajustados.map((ajustado, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                >
                                    {ajustado.nome} - {ajustado.cpfTitular}
                                </Typography>
                            ))
                        }
                    </Box>
                </ModalComponent>
            </Box>
            <TableContainer
                sx={{
                    mt: '1rem'
                }}
            >
                <Table
                    size="small"
                >
                    <TableHead
                        sx={{
                            backgroundColor: '#F5F5F5'
                        }}
                    >
                        <TableRow>
                            <TableCell>
                                Proposta
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Cpf
                            </TableCell>
                            <TableCell>
                                CPF Titular
                            </TableCell>
                            <TableCell>
                                Tipo Associado
                            </TableCell>
                            <TableCell>
                                Data de Nascimento
                            </TableCell>
                            <TableCell>
                                DDD
                            </TableCell>
                            <TableCell>
                                Telefone
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !loading ? (propostas.filter((proposta) => {
                                if (pesquisa === '') {
                                    return proposta
                                } else if (proposta.proposta.toLowerCase().includes(pesquisa.toLowerCase())) {
                                    return proposta
                                } else if (proposta.nome.toLowerCase().includes(pesquisa.toLowerCase())) {
                                    return proposta
                                }
                            }).map((proposta, index) => (
                                <Row
                                    key={index}
                                    proposta={proposta}
                                    setAjustados={setAjustados}
                                    ajustados={ajustados}
                                />
                            ))) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                    >
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </Box>
    )
}

export default ProtAjustar