import { Box, Chip, Container, Divider, FormControlLabel, Grid, Switch, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { deepPurple, grey, indigo, red } from "@mui/material/colors"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { getPacoteById, getSeguradosByTitular, getTitularById, updatePacote } from "../../../_services/rsdBradesco.service"
import { InfoOutlined } from "@mui/icons-material"
import { colorParecer, colorStatusPedido, colorStatusRsdBradesco } from "../utils/types"
import moment from "moment"
import Ficha from "../components/Ficha"
import { valueToBRL } from "../../../functions/functions"
import Roteiro from "./components/Roteiro"
import ModalParecer from "./components/ModalParecer"
import ModalNovoPacote from "./components/ModalNovoPacote"
import { themeBradesco } from "../components/theme"
import ModalComponent from "../../../components/ModalComponent/ModalComponent"
import DrawerMaisInfos from "./components/DrawerMaisInfos"
import SwitchNotorios from "./components/SwitchNotorios"
import ExpandMaisInfos from "./components/ExpandMainInfos"
import EditPrestador from "./components/EditPrestador"

const Info = ({ label, value }) => (
    <Grid item
        xs={12}
        sm={2}
    >
        <Typography
            variant='subtitle2'
            sx={{
                color: grey[700],
                fontWeight: 'bold'
            }}
        >
            {label}
        </Typography>
        <Typography
            variant='body2'
            sx={{
                color: grey[900],
                fontWeight: 'bold'
            }}
        >
            {value}
        </Typography>
    </Grid>
)

const Protocolos = () => {

    const { id } = useParams();

    const [pacote, setPacote] = useState({});
    const [segurados, setSegurados] = useState([]);
    const [titular, setTitular] = useState();

    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')
    const [dossie, setDossie] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

    const handleUpdateDossie = async (e) => {
        try {
            const value = e.target.checked
            await updatePacote(
                id,
                { dossie: value }
            )
            setMessage('Dossiê solicitado com sucesso')
            setSeverity('success')
            setOpenToast(true)
        } catch (error) {
            console.log(error);
            setMessage('Erro ao Atualizar Dossiê')
            setSeverity('error')
            setOpenToast(true)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const dataPacote = await getPacoteById(id);
                setPacote(dataPacote);
                setDossie(dataPacote.dossie)
                const data = await getTitularById(dataPacote.titular);
                setTitular(data);
                const dataSegurados = await getSeguradosByTitular(dataPacote.titular);
                setSegurados(dataSegurados);
            } catch (error) {
                console.log(error);
                setMessage('Erro ao buscar dados')
                setSeverity('error')
                setOpenToast(true)
            }
        }
        fetch();
    }, [id, flushHook])

    return (
        <>
            <Sidebar>
                <ThemeProvider theme={themeBradesco}>
                    <Container maxWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]}>
                                Processamento do pacote - {pacote?.codigo}
                            </Title>
                            <Box>
                                <ModalComponent
                                    buttonIcon={<InfoOutlined fontSize='large' />}
                                    buttonText={'Informações'}
                                    headerText={'Informações'}
                                    size='md'
                                    textButton={'Fechar'}
                                >
                                    <Typography sx={{ mt: 2 }}>
                                        <strong>Descrição</strong>: Crítica que identifica mais de 03 consultas solicitadas no período de 62 dias, no mesmo prestador para o grupo familiar (é gerada a crítica a partir da 4ª consulta).
                                    </Typography>
                                    <Typography fontSize={'14px'}>
                                        <strong>Análise deverá avaliar a prática de partição de recibo ou consultas subsequentes sem justificativa para envio à LPL.</strong>
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}>
                                        <strong>Ação</strong>: O Analista deverá considerar em sua análise se a cobrança faz parte de algum cenário excludente que não configura fracionamento de recibo, ex: Grupo familiar com mais de um dependente menor em idade em consulta pediátrica, que justifique o atendimento subsequente, gestante em consulta obstétrica com alguma condição que justifique mais de um atendimento ao mês, paciente oncológico.
                                    </Typography>
                                    <Typography fontSize={'14px'}>
                                        <strong>Importante que o analista avalie e confirme se realmente há mais de 3 consultas já reembolsadas no período (existem cenários em que o sistema considera eventos cancelados para retornar crítica, neste caso poderemos proceder com a análise técnica).</strong>
                                    </Typography>
                                    <Typography fontSize={'14px'} sx={{ mt: 2, mb: 2 }}>
                                        No processo inicial é solicitado que o segurado inclua o comprovante de desembolso, para os eventos acima de <strong>R$ 500,00</strong>, apenas para o produto <strong>Bradesco Saúde</strong>. Esta regra não se aplica para Bradesco Saúde Operadora de Planos.
                                    </Typography>
                                </ModalComponent>
                                <DrawerMaisInfos pacote={pacote} setPacote={setPacote} id={id} setOpenToast={setOpenToast} setMessage={setMessage} setSeverity={setSeverity} />
                            </Box>
                        </Box>
                        <Typography
                            variant='subtitle2'
                            sx={{
                                color: 'white',
                                bgcolor: colorStatusRsdBradesco[pacote?.status],
                                fontWeight: 'bold',
                                width: '100%',
                                p: 1,
                                borderRadius: '10px'
                            }}
                        >
                            {pacote?.status}
                        </Typography>
                        <Divider sx={{ mt: 2 }} />
                        <Ficha
                            titular={titular}
                            segurados={segurados}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Title
                                size={'small'}
                                fontColor={indigo[800]}
                                lineColor={red[500]}
                            >
                                Sinistros
                            </Title>
                            <FormControlLabel onChange={(e) => {
                                setDossie(!dossie)
                                handleUpdateDossie(e)
                            }} control={<Switch color='primary' checked={dossie} />} label='Dossiê' />
                        </Box>
                        <Table size="small">
                            <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[800]} 95%)` }}>
                                <TableRow>
                                    <TableCell align="left" sx={{ color: 'white' }}>Sinistro</TableCell>
                                    <TableCell align="left" sx={{ color: 'white' }}>Data Solicitação</TableCell>
                                    <TableCell align="left" sx={{ color: 'white' }}>Segurado</TableCell>
                                    <TableCell align="left" sx={{ color: 'white' }}>Cod Carteirinha</TableCell>
                                    <TableCell align="left" sx={{ color: 'white' }}>CPF</TableCell>
                                    <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pacote?.pedidos?.map((pedido, index) => (
                                    <React.Fragment key={index} >
                                        <TableRow >
                                            <TableCell align="left">{pedido.sinistro}</TableCell>
                                            <TableCell align="left">{moment(pedido.dataSolicitacao).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell align="left">{pedido.segurado.nome}</TableCell>
                                            <TableCell align="left">{pedido.segurado.codigo}</TableCell>
                                            <TableCell align="left">{pedido.segurado.cpf}</TableCell>
                                            <TableCell align="left">
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        gap: '2px'
                                                    }}
                                                >
                                                    <Chip
                                                        label={pedido.status}
                                                        sx={{
                                                            color: 'white',
                                                            backgroundColor: colorStatusPedido[pedido.status],
                                                            fontWeight: 'bold'
                                                        }}
                                                        size="small"
                                                    />
                                                    {
                                                        pedido.parecer && <Chip
                                                            label={pedido.parecer}
                                                            sx={{
                                                                color: 'white',
                                                                backgroundColor: colorParecer[pedido.parecer],
                                                                fontWeight: 'bold'
                                                            }}
                                                            size="small"
                                                        />
                                                    }
                                                </Box>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <Grid container spacing={2} mt={1}>
                                                    <Info label={'Comprovante de Pagamento?'} value={pedido?.comprovantePagamento} />
                                                    <Info label={'Tipo de Comprovante'} value={pedido?.tipoComprovante} />
                                                    <Info label={'Tipo Documento'} value={pedido?.tipoDocumento} />
                                                    <Info label={'Especialidade'} value={pedido?.especialidade} />
                                                    <Info label={'Valor Solicitado'} value={valueToBRL(pedido.valorSolicitado)} />
                                                    <Info label={'Maior Data Execução'} value={moment(pedido.dataCriacao).format('DD/MM/YYYY')} />
                                                    <Info label={'Tipo Evento'} value={pedido?.evento?.tipo} />
                                                    <Info label={'Data Evento'} value={moment(pedido?.evento?.data).format('DD/MM/YYYY')} />
                                                    <Info label={'CPF/CNPJ do Prestador'} value={pedido?.prestador.cpfCnpj} />
                                                    <Info label={'Nome do Prestador'} value={<>
                                                        {pedido?.prestador.nome}
                                                        <EditPrestador prestador={pedido?.prestador._id} setFlushHook={setFlushHook} />
                                                    </>} />
                                                    <Info label={'UF Prestador'} value={pedido?.prestador?.uf} />
                                                    <Info label={'N° NF'} value={pedido?.nf?.numero} />
                                                    <Info label={'Codigo NF'} value={pedido?.nf?.cofigo} />
                                                    <Info label={'Cidade NF'} value={pedido?.nf?.cidade} />
                                                    <Info label={'Estado NF'} value={pedido?.nf?.estado} />
                                                    <Info label={'Uf NF'} value={pedido?.nf?.uf} />
                                                    {
                                                        (pedido.status !== 'SUCESSO' && pedido.status !== 'INSUCESSO') && <Grid item xs={12} sm={2}>
                                                            <ModalParecer id={pedido._id} setOpenToast={setOpenToast} setMessage={setMessage} setSeverity={setSeverity} setPacote={setPacote} />
                                                        </Grid>
                                                    }
                                                    {
                                                        (pedido.status !== 'SUCESSO' && pedido.status !== 'INSUCESSO') && pacote.pedidos.length > 1 && <Grid item xs={12} sm={2}>
                                                            <ModalNovoPacote pedido={pedido} />
                                                        </Grid>
                                                    }
                                                    <Grid item xs={12} sm={2}>
                                                        <SwitchNotorios pedido={pedido} />
                                                    </Grid>
                                                </Grid>
                                                <ExpandMaisInfos pedido={pedido} />
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                        <Title
                            size={'small'}
                            fontColor={indigo[800]}
                            lineColor={red[700]}
                            sx={{ mt: 2 }}
                        >
                            Script
                        </Title>
                        <Box
                            mt={2}
                            mb={2}
                            sx={{
                                bgcolor: indigo[100],
                                p: 2,
                                borderRadius: '15px'
                            }}
                        >
                            <Roteiro />
                        </Box>
                    </Container>
                    <Toast
                        open={openToast}
                        onClose={() => setOpenToast(false)}
                        message={message}
                        severity={severity}
                    />
                </ThemeProvider>
            </Sidebar >
        </>
    )
}

export default Protocolos;