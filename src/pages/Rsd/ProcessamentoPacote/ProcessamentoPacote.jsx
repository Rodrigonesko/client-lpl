import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import { atualizarPedido, getAgendaRsd, getArquivos, getFormasPagamento, getPedidosPorPacote, getStatusFinalizacao, inserirPrioridadeDossiePacote, voltarFasePacote } from "../../../_services/rsd.service";
import ModalPatologias from "../../../components/ModalPatologias/ModalPatologias";
import { Box, Container, Typography, Button, FormControlLabel, Checkbox, Alert, Snackbar } from "@mui/material";
import TabelaProtocolosProcessamento from "./TabelaProtocolosProcessamento";
import AgendaProcessamentoRsd from "./AgendaProcessamentoRsd";
import TabelaArquivosProcessamento from "./TabelaArquivosProcessamento";
import RoteiroProcessamento from "./RoteiroProcessamento";
import { red } from "@mui/material/colors";

const ProcessamentoPacote = () => {

    const { mo, idPacote } = useParams()

    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])
    const [statusPacote, setStatusPacote] = useState('')
    const [arquivos, setArquivos] = useState([])
    const [formasPagamento, setFormasPagamento] = useState([])
    const [statusFinalizacao, setStatusFinalizacao] = useState([])
    const [agenda, setAgenda] = useState([])
    const [finalizado, setFinalizado] = useState(false)
    const [prioridadePacote, setPrioridadePacote] = useState(false);

    const [flushHook, setFlushHook] = useState(false)
    const [openRoteiro, setOpenRoteiro] = useState(false)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')

    const handleClose = () => {
        setOpen(false)
    }

    const handleShowRoteiro = () => {

        setSeverity('success')
        setMsg('Processamento iniciado!')
        setOpen(true)
        setOpenRoteiro(true)
    }

    const buscarFormasPagamento = async () => {
        try {
            const result = await getFormasPagamento()

            setFormasPagamento(result.formasPagamento)

        } catch (error) {
            console.log(error);
        }
    }
    const buscarStatusFinalizacao = async () => {
        try {

            const result = await getStatusFinalizacao()

            setStatusFinalizacao(result.statusFinalizacoes)

        } catch (error) {
            console.log(error);
        }
    }

    const salvar = async (
        houveSucesso,
        motivosContato,
        servicos,
        finalizacoes,
        justificativa,
        dataSelo,
        dataAgendamento
    ) => {
        try {

            console.log(
                houveSucesso,
                motivosContato,
                servicos,
                finalizacoes,
                justificativa,
                dataSelo
            );

            await atualizarPedido({
                pacote: idPacote,
                sucesso: houveSucesso,
                motivoContato: motivosContato,
                confirmacaoServico: servicos,
                finalizacao: finalizacoes,
                justificativa,
                dataSelo,
                dataAgendamento
            })
            setSeverity('success')
            setMsg('Pacote salvo com sucesso')
            setOpen(true)
            setFlushHook(true)


        } catch (error) {
            console.log(error);
        }
    }


    const voltarFase = async () => {
        try {

            await voltarFasePacote({
                pacote: idPacote
            })
            setSeverity('success')
            setMsg('Fase retrocedida!')
            setOpen(true)
            setFlushHook(true)


        } catch (error) {
            console.log(error);
        }
    }

    const prioridadeDossiePacote = async (prioridade) => {
        try {
            await inserirPrioridadeDossiePacote({
                pacote: idPacote,
                prioridade
            })
            setSeverity('success')
            setMsg('Prioridade atribuída com sucesso!')
            setOpen(true)
            setFlushHook(true)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarAgenda = async () => {
        try {

            const result = await getAgendaRsd(idPacote)

            setAgenda(result.agenda)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarArquivos = async e => {
        try {

            const result = await getArquivos(idPacote)

            setArquivos(result.arquivos)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarPedidos = async () => {
        try {

            const result = await getPedidosPorPacote(idPacote)

            setPedidos(result.pedidos)

            let tamanhoPrioridade = result.pedidos.length

            let countTamanhoPrioridade = 0

            result.pedidos.forEach(e => {
                if (e.prioridadeDossie) {
                    countTamanhoPrioridade++
                }
            })

            if (countTamanhoPrioridade === tamanhoPrioridade) {
                setPrioridadePacote(true)
            }

            let arrAuxProtocolos = result.pedidos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            setProtocolos(arrAuxProtocolos)

            setStatusPacote(result.pedidos[0].statusPacote)
            // if (result.pedidos[0].statusPacote === '3° Tentativa') {
            //     setSeverity('warning')
            //     setMsg('Favor inserir o print da tela de Monitoramento!')
            // }
            console.log(result.pedidos[0].statusPacote);
            if (result.pedidos[0].statusPacote === 'Finalizado') {
                console.log('finalizado');
                setFinalizado(true)
            } else {
                setFinalizado(false)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        setFlushHook(false)

        buscarPedidos()
        buscarArquivos()
        buscarFormasPagamento()
        buscarStatusFinalizacao()
        buscarAgenda()
    }, [idPacote, flushHook])

    return (
        <>
            <Sidebar>
                <Box width='100%' height='100vh' overflow='auto' display='flex' justifyContent='center'>
                    <Container style={{ maxWidth: '1300px' }}>
                        <Typography m={1} variant="h6" >
                            Processamento
                        </Typography>
                        <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                            Infomações Gerais
                        </Typography>
                        <InformacoesGerais
                            mo={mo}
                        />
                        <Typography m={1} variant="h6" >
                            Status Pacote: {statusPacote}
                        </Typography>
                        {
                            statusPacote === '3° Tentativa' ? (
                                <Typography m={1} sx={{ color: red[900] }}>
                                    Mensagem: <strong>Favor inserir o print da tela de Monitoramento!</strong>
                                </Typography>
                            ) : (
                                <>
                                </>
                            )
                        }
                        <Box m={1}>
                            <ModalPatologias idCelula={idPacote} celula={'RSD'} />
                        </Box>
                        <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                            Pedidos de Reembolso
                        </Typography>
                        {

                        }
                        <TabelaProtocolosProcessamento protocolos={protocolos} pedidos={pedidos} flushHook={setFlushHook} />
                        <Box m={2} >
                            {
                                !finalizado ? (
                                    <Button onClick={handleShowRoteiro} variant="contained"  >Iniciar Processamento</Button>
                                ) : (
                                    <Button variant="contained" size="small" color="warning" onClick={voltarFase}>Voltar Fase</Button>
                                )
                            }
                            <FormControlLabel
                                sx={{ margin: '10px' }}
                                control={<Checkbox checked={prioridadePacote} />}
                                label='Prioridade Dossie'
                                id="prioridade-dossie"
                                name="prioridade-dossie"
                                onChange={e => {
                                    setPrioridadePacote(!prioridadePacote)
                                    prioridadeDossiePacote(e.target.checked)
                                }}
                            />
                        </Box>
                        <Box display='flex'>
                            <Box sx={{ maxWidth: '800px', width: '70%', marginRight: '30px' }}>
                                <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                                    Roteiro
                                </Typography>
                                {
                                    pedidos.length !== 0 && openRoteiro && !finalizado && (
                                        <RoteiroProcessamento
                                            pedidos={pedidos}
                                            formasPagamento={formasPagamento}
                                            statusFinalizacao={statusFinalizacao}
                                            salvar={salvar}
                                        />
                                    )

                                }
                            </Box>
                            <Box maxWidth='400px'>
                                <AgendaProcessamentoRsd flushHook={setFlushHook} agenda={agenda} />
                                <TabelaArquivosProcessamento salvar={salvar} arquivos={arquivos} flushHook={setFlushHook} />
                            </Box>
                        </Box>
                    </Container>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                            {msg}
                        </Alert>
                    </Snackbar>
                </Box>
            </Sidebar >
        </>
    )
}

export default ProcessamentoPacote