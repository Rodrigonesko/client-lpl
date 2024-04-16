
// Dependencias
import { useState, useEffect } from 'react'
import { Box, Typography, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, FormControlLabel, Tooltip, Button, FormControl, FormLabel, RadioGroup, Radio, CircularProgress } from '@mui/material'
import Toast from '../../../../components/Toast/Toast'
import { ArrowRight } from '@mui/icons-material'
import { filterPropostasNaoEnviadas, sendMessageSaudacao } from '../../../../_services/teleEntrevistaExterna.service'
import ModalEnviarMensagens from './ModalEnviarMensagens'

const Row = ({ proposta, index, filterText, flushFilter, setFlushFilter }) => {

    const [loading, setLoading] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState('success')

    const handleEnviar = async (id) => {
        setLoading(true)
        try {
            const result = await sendMessageSaudacao({ _id: id })
            if (result.msg !== 'ok') {
                throw new Error('Erro ao enviar mensagem!')
            }
            setOpenToast(true)
            setToastMessage('Mensagem enviada com sucesso!')
            setToastSeverity('success')
            if (filterText !== '') {
                setFlushFilter(!flushFilter)
            }
            setLoading(false)
        } catch (error) {
            setOpenToast(true)
            setToastMessage('Erro ao enviar mensagem!')
            setToastSeverity('error')
            setLoading(false)
        }
    }

    return (
        <TableRow
            key={index}
        >
            <TableCell>{proposta.proposta}</TableCell>
            <TableCell>{proposta.nome}</TableCell>
            <TableCell>{proposta.cpf}</TableCell>
            <TableCell>{proposta.cpfTitular}</TableCell>
            <TableCell>{proposta.tipoAssociado}</TableCell>
            <TableCell>{proposta.tipoContrato}</TableCell>
            <TableCell>{proposta.idade}</TableCell>
            <TableCell>{proposta.ddd}</TableCell>
            <TableCell>{proposta.celular}</TableCell>
            <TableCell>
                {
                    !!proposta.ddd && !!proposta.celular ? (
                        <Tooltip
                            title="Enviar proposta"
                            placement="top"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                sx={{
                                    textTransform: 'none'
                                }}
                                onClick={() => {
                                    handleEnviar(proposta._id)
                                }}
                                disabled={loading}
                                endIcon={loading && <CircularProgress color='primary' size={'20px'} />}
                            >
                                <ArrowRight />
                            </Button>
                        </Tooltip>
                    ) : null
                }

            </TableCell>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                severity={toastSeverity}
                message={toastMessage}
            />
        </TableRow>
    )
}

const NaoEnviadas = () => {

    const [propostas, setPropostas] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    const [loading, setLoading] = useState(false)
    const [filterText, setFilterText] = useState('titular unico')
    const [flushFilter, setFlushFilter] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const res = await filterPropostasNaoEnviadas({
                filter: filterText
            })
            setPropostas(res.filtradas)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const res = await filterPropostasNaoEnviadas({
                filter: filterText
            })
            setPropostas(res.filtradas)
            setLoading(false)
        }
        fetch()
    }, [filterText, flushFilter])

    return (
        <>
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
                    Enviar
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
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold'
                    }}
                    mt={2}
                >
                    Total de propostas: {propostas.length}
                </Typography>
                <FormControl>
                    <FormLabel>
                        Filtrar por:
                    </FormLabel>
                    <RadioGroup
                        row
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    >
                        <FormControlLabel
                            value="titular unico"
                            control={<Radio />}
                            label="Titular único"
                        />
                        <FormControlLabel
                            value="titular unico com dependente menor de 8 anos"
                            control={<Radio />}
                            label="Dependentes menor de 8 anos"
                        />
                        <FormControlLabel
                            value="titular com depente maior de 18 anos"
                            control={<Radio />}
                            label="Depentes maiores de 18 anos"
                        />
                        <FormControlLabel
                            value="titular com dependente maior de 18 anos e menor de 9 anos"
                            control={<Radio />}
                            label="Maior de 18 e menor de 8 anos"
                        />
                        {/* <FormControlLabel
                            value="titular com dependente maior de 9 anos e menor de 17 anos"
                            control={<Radio />}
                            label="9 a 17 anos"
                        />
                        <FormControlLabel
                            value="todas"
                            control={<Radio />}
                            label="Todas"
                        /> */}
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box
                mt={2}
                mb={2}
            >
                <ModalEnviarMensagens
                    propostas={propostas}
                    enviarMensagem={sendMessageSaudacao}
                    setFlushHook={setFlushFilter}
                />
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
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? (propostas.filter(proposta => proposta.nome.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase()) || proposta.proposta.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())).map((proposta, index) => (
                            <Row
                                key={index}
                                proposta={proposta}
                                index={index}
                                filterText={filterText}
                                flushFilter={flushFilter}
                                setFlushFilter={setFlushFilter}
                            />
                        ))) : (
                            <TableRow>
                                <TableCell colSpan={8}>
                                    <LinearProgress />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default NaoEnviadas