import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import Modal from 'react-modal'
import './ProcessamentoPacote.css'
import { atualizarPedido, getAgendaRsd, getArquivos, getFormasPagamento, getPedidosPorPacote, getStatusFinalizacao, inserirPrioridadeDossiePacote, voltarFasePacote } from "../../../_services/rsd.service";
import ModalPatologias from "../../../components/ModalPatologias/ModalPatologias";
import { Box, Container, Typography, Button, FormControlLabel, Checkbox } from "@mui/material";
import TabelaProtocolosProcessamento from "./TabelaProtocolosProcessamento";
import AgendaProcessamentoRsd from "./AgendaProcessamentoRsd";
import TabelaArquivosProcessamento from "./TabelaArquivosProcessamento";
import RoteiroProcessamento from "./RoteiroProcessamento";

Modal.setAppElement('#root')

let motivoContato = new Map()
let confirmacaoServico = new Map()
let finalizacao = new Map()

const ProcessamentoPacote = () => {

    const { mo, idPacote } = useParams()

    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])
    const [statusPacote, setStatusPacote] = useState('')
    const [numeroTentativa, setNumeroTentativa] = useState('')
    const [retornoContato, setRetornoContato] = useState(false)
    const [arquivos, setArquivos] = useState([])
    const [formasPagamento, setFormasPagamento] = useState([])
    const [statusFinalizacao, setStatusFinalizacao] = useState([])
    const [houveSucesso, setHouveSucesso] = useState('')
    const [agenda, setAgenda] = useState([])
    const [finalizado, setFinalizado] = useState(true)
    const [naoContato, setNaoContato] = useState(false)
    const [justificativa, setJustificativa] = useState('')
    const [dataSelo, setDataSelo] = useState('')
    const [prioridadePacote, setPrioridadePacote] = useState(false);

    /* Status de contato */

    const [contatoSim, setContatoSim] = useState(false)
    const [contatoNao, setContatoNao] = useState(false)
    const [contatoAgendar, setContatoAgendar] = useState(false)
    const [contatoNaoEntrado, setContatoNaoEntrado] = useState(false)

    const [flushHook, setFlushHook] = useState(false)

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

    const mostrarProcessamento = () => {

        document.getElementById('tr-processamento-1').classList.remove('none')

    }
    const salvar = async () => {
        try {

            let motivosContato = []
            let servicos = []
            let finalizacoes = []

            motivoContato.forEach((item, chave) => {
                motivosContato.push([chave, item])
            })

            confirmacaoServico.forEach((item, chave) => {
                servicos.push([chave, item])
            })

            finalizacao.forEach((item, chave) => {
                finalizacoes.push([chave, item])
            })

            await atualizarPedido({
                pacote: idPacote,
                sucesso: houveSucesso,
                motivoContato: motivosContato,
                confirmacaoServico: servicos,
                finalizacao: finalizacoes,
                justificativa,
                dataSelo
            })

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }
    const verificarMotivoContato = e => {

        let valor = e.target.value
        let nome = e.target.name
        let split = nome.split('-')
        let id = split[1]

        motivoContato.set(id, valor)

    }
    const verificarServico = e => {

        let valor = e.target.value
        let split = e.target.name.split('-')
        let id = split[2]

        confirmacaoServico.set(id, valor)

    }
    const verificarFinalizacao = e => {

        let valor = e.target.value
        let split = e.target.name.split('-')
        let id = split[1]

        finalizacao.set(id, valor)

    }

    const voltarFase = async () => {
        try {

            await voltarFasePacote({
                pacote: idPacote
            })

            setFlushHook(true)


        } catch (error) {
            console.log(error);
        }
    }
    const verificarProcessamento = (pedidos) => {
        let checkbox1 = document.getElementById('checkbox-processamento-1')
        let checkbox2 = document.getElementById('checkbox-processamento-2')
        let checkbox3 = document.getElementById('checkbox-processamento-3')
        // let checkbox4 = document.getElementById('checkbox-processamento-4')
        // let checkbox5 = document.getElementById('checkbox-processamento-5')
        // let tr1 = document.getElementById('tr-processamento-1')
        let tr2 = document.getElementById('tr-processamento-2')
        let tr3 = document.getElementById('tr-processamento-3')
        let tr4 = document.getElementById('tr-processamento-4')
        // let tr5 = document.getElementById('tr-processamento-5')

        for (const e of pedidos) {
            if (e.dataSelo !== undefined) {
                tr2.classList.toggle('none')
                checkbox1.checked = true
                console.log(e.dataSelo);
                break;
            }
        }

        for (const e of pedidos) {
            if (e.reconhece) {
                tr3.classList.toggle('none')
                checkbox2.checked = true
                break
            }
        }

        for (const e of pedidos) {
            if (e.formaPagamento !== undefined) {
                tr4.classList.toggle('none')
                checkbox3.checked = true
                break
            }
        }
    }

    const prioridadeDossiePacote = async (prioridade) => {
        try {
            await inserirPrioridadeDossiePacote({
                pacote: idPacote,
                prioridade
            })

            setFlushHook(true)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        setFlushHook(false)

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

                if (result.pedidos[0].statusPacote === 'Finalizado') {
                    setFinalizado(false)
                }

                if (result.pedidos[0].statusPacote === '2° Tentativa') {
                    setNumeroTentativa('2° Tentativa')
                }

                if (result.pedidos[0].statusPacote === '3° Tentativa') {
                    setNumeroTentativa('3° Tentativa')
                }

                if (result.pedidos[0].statusPacote === 'Aguardando Retorno Contato') {
                    setRetornoContato(true)
                }

                if (result.pedidos[0].contato === 'Não foi entrado em contato') {
                    setNaoContato(true)
                    setContatoNaoEntrado(true)
                }
                if (result.pedidos[0].contato === 'Sim') {
                    setContatoSim(true)
                }
                if (result.pedidos[0].contato === 'Não') {
                    setContatoNao(true)
                }
                if (result.pedidos[0].contato === 'Necessário Agendar Horario') {
                    setContatoAgendar(true)
                }

                setJustificativa(result.pedidos[0].justificativa)

            } catch (error) {
                console.log(error);
            }
        }

        buscarPedidos()
        buscarArquivos()
        buscarFormasPagamento()
        buscarStatusFinalizacao()
        buscarAgenda()
    }, [idPacote, flushHook])

    return (
        <>
            <Sidebar />
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
                    <Box m={1}>
                        <ModalPatologias idCelula={idPacote} celula={'RSD'} />
                    </Box>
                    <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                        Pedidos de Reembolso
                    </Typography>
                    <TabelaProtocolosProcessamento protocolos={protocolos} pedidos={pedidos} flushHook={setFlushHook} />
                    <Box m={2} >
                        {
                            finalizado ? (
                                <Button onClick={() => {
                                    mostrarProcessamento()
                                    verificarProcessamento(pedidos)
                                }} variant="contained"  >Iniciar Processamento</Button>
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
                        <div className="roteiro" style={{ maxWidth: '800px' }}>
                            <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px'>
                                Roteiro
                            </Typography>
                            {
                                pedidos.length !== 0 && (
                                    <RoteiroProcessamento pedidos={pedidos} />
                                )

                            }
                            <div className="table-roteiro">
                                <table className="table tabela-roteiro">
                                    <tbody>
                                        <tr className="none" id="tr-processamento-1">
                                            <td>1°</td>
                                            <td>
                                                <p>Houve sucesso no Contato com o beneficiário? {numeroTentativa}</p>
                                                {
                                                    contatoSim ? (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sim" defaultChecked={true} value={`Sim`} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(false)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-sim">Sim</label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sim" value={`Sim`} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(false)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-sim">Sim</label>
                                                        </>
                                                    )
                                                }

                                                {
                                                    contatoNao ? (
                                                        numeroTentativa === '2° Tentativa' ? (

                                                            <>
                                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao" value={`Não`} onClick={e => {
                                                                    setHouveSucesso(e.target.value)
                                                                    setNaoContato(false)
                                                                }} />
                                                                <label htmlFor="contato-beneficiario-nao">Não</label>
                                                            </>

                                                        ) : (
                                                            numeroTentativa === '3° Tentativa' ? (
                                                                <>
                                                                    <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao" value={`Não`} onClick={e => {
                                                                        setHouveSucesso(e.target.value)
                                                                        setNaoContato(false)
                                                                    }} />
                                                                    <label htmlFor="contato-beneficiario-nao">Não</label>
                                                                </>

                                                            ) : (
                                                                retornoContato ? (
                                                                    <>
                                                                        <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao" value={`Não`} defaultChecked={true} onClick={e => {
                                                                            setHouveSucesso(e.target.value)
                                                                            setNaoContato(false)
                                                                        }} />
                                                                        <label htmlFor="contato-beneficiario-nao">Não</label>
                                                                    </>

                                                                ) : null
                                                            )
                                                        )

                                                    ) : (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao" value={`Não`} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(false)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-nao">Não</label>
                                                        </>
                                                    )
                                                }

                                                {
                                                    contatoAgendar ? (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-agendar" value={`Necessário Agendar Horario`} defaultChecked={true} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(false)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-agendar">Necessário Agendar Horario</label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-agendar" value={`Necessário Agendar Horario`} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(false)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-agendar">Necessário Agendar Horario</label>
                                                        </>
                                                    )
                                                }



                                                <input type="radio" name="contato-beneficiario" id="contato-beneficiario-sem-retorno" value={`Sem Retorno de Contato`} onClick={e => {
                                                    setHouveSucesso(e.target.value)
                                                    setNaoContato(false)
                                                }} />
                                                <label htmlFor="contato-beneficiario-sem-retorno">Sem Retorno de Contato</label>

                                                {
                                                    contatoNaoEntrado ? (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao-foi-entrado-contato" value={`Não foi entrado em contato`} defaultChecked={true} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(true)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-nao-foi-entrado-contato">Não foi entrado em contato</label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <input type="radio" name="contato-beneficiario" id="contato-beneficiario-nao-foi-entrado-contato" value={`Não foi entrado em contato`} onClick={e => {
                                                                setHouveSucesso(e.target.value)
                                                                setNaoContato(true)
                                                            }} />
                                                            <label htmlFor="contato-beneficiario-nao-foi-entrado-contato">Não foi entrado em contato</label>
                                                        </>
                                                    )
                                                }


                                                {
                                                    naoContato ? (
                                                        <div>
                                                            <label htmlFor="justificativa-contato">Justificativa por não entrar em contato: </label>
                                                            <input type="text" id="justificativa-contato" name='justificativa-contato' defaultValue={justificativa} onChange={e => {
                                                                setJustificativa(e.target.value)
                                                            }} />
                                                        </div>
                                                    ) : null
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="checkbox-processamento-1" onClick={() => {
                                                    document.getElementById('tr-processamento-2').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-2">
                                            <td>2°</td>
                                            <td>
                                                <p><strong>SELO CONTATO</strong></p>
                                                <p>Informar nome completo do beneficiário no início do contato. Se identifique como funcionário da Operadora Informar que a ligação é gravada e pedir para confirmar algumas informações, como 3 últimos números do CPF, ano de nascimento e idade.</p>
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="checkbox-processamento-2" onClick={() => {
                                                    document.getElementById('tr-processamento-3').classList.toggle('none')
                                                    setDataSelo(new Date())
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-3">
                                            <td>3°</td>
                                            <td>
                                                <p><strong>MOTIVO CONTATO</strong></p>
                                                <p>Reembolso referente ao atendimento da clínica TAL, realizado no dia XX, no valor de R$ XX. Confirmar se o beneficiário reconhece esse atendimento e cobrança?</p>
                                                {
                                                    pedidos.map(e => {

                                                        if (e.fase !== 'Finalizado') {
                                                            return (
                                                                <>
                                                                    <p>Pedido <strong>{e.numero}</strong>, NF <strong>{e.nf}</strong>, Clínica <strong>{e.clinica}</strong>, Valor Apresentado <strong>R$ {e.valorApresentado}</strong></p>
                                                                    <input type="radio" name={`confirma-${e._id}`} id={`confirma-sim-${e.numero}`} onClick={verificarMotivoContato} value='Sim' defaultChecked={e.reconhece} />
                                                                    <label htmlFor={`confirma-sim-${e.numero}`}>Sim</label>
                                                                    <input type="radio" name={`confirma-${e._id}`} id={`confirma-nao-${e.numero}`} onClick={verificarMotivoContato} value='Não' />
                                                                    <label htmlFor={`confirma-nao-${e.numero}`}>Não</label>
                                                                </>
                                                            )
                                                        }

                                                        return null
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="checkbox-processamento-3" onClick={() => {
                                                    document.getElementById('tr-processamento-4').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-4">
                                            <td>4°</td>
                                            <td>
                                                <p><strong>CONFIRMAÇÃO SERVIÇO</strong></p>
                                                <p>Questionar como foi realizado e solicitar envio do comprovante/declaração em até 5 dias úteis e deixa-lo ciente que o pedido poderá ser cancelado caso a documentação não seja enviada. Questionar ao beneficiário como ficou acordado o pagamento destes serviços junto a clínica:</p>
                                                {
                                                    pedidos.map(e => {

                                                        let checkFormaPagamento = false

                                                        if (e.formaPagamento === 'Fracionamento de Nota Fiscal') {
                                                            checkFormaPagamento = true
                                                        }

                                                        if (e.fase !== 'Finalizado') {
                                                            return (
                                                                <>
                                                                    <p>Pedido: <strong>{e.numero}</strong></p>


                                                                    {
                                                                        formasPagamento.map(formaPagamento => {

                                                                            let checkFormaPagameto = false

                                                                            if (e.formaPagamento === formaPagamento.nome) {
                                                                                checkFormaPagameto = true
                                                                            }

                                                                            return (
                                                                                <>
                                                                                    <input type="radio" name={`forma-pagamento-${e._id}`} id={`forma-pagamento-${e.numero}-${formaPagamento.nome}`} value={formaPagamento.nome} onClick={verificarServico} defaultChecked={checkFormaPagameto} />
                                                                                    <label htmlFor={`forma-pagamento-${e.numero}-${formaPagamento.nome}`}>{formaPagamento.nome}</label>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                    <input type="radio" name={`forma-pagamento-${e._id}`} id={`forma-pagamento-${e.numero}-Fracionamento de Nota Fiscal`} value='Fracionamento de Nota Fiscal' onClick={verificarServico} defaultChecked={checkFormaPagamento} />
                                                                    <label htmlFor={`forma-pagamento-${e.numero}-Fracionamento de Nota Fiscal`}>Fracionamento de Nota Fiscal</label>
                                                                </>
                                                            )
                                                        }

                                                        return null
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="checkbox-processamento-4" onClick={() => {
                                                    document.getElementById('tr-processamento-5').classList.toggle('none')
                                                }} />
                                            </td>
                                        </tr>
                                        <tr className="none" id="tr-processamento-5">
                                            <td>5°</td>
                                            <td>
                                                <p><strong>FINALIZAÇÃO</strong></p>
                                                {
                                                    pedidos.map(e => {
                                                        if (e.fase !== 'Finalizado') {
                                                            return (
                                                                <>
                                                                    <p>Pedido: <strong>{e.numero}</strong></p>
                                                                    {
                                                                        statusFinalizacao.map(statusFinalizacao => {
                                                                            return (
                                                                                <>
                                                                                    <input type="radio" name={`finalizacao-${e._id}`} id={`finalizacao-${e.numero}-${statusFinalizacao.descricao}`} value={statusFinalizacao.descricao} onClick={verificarFinalizacao} />
                                                                                    <label htmlFor={`finalizacao-${e.numero}-${statusFinalizacao.descricao}`}>{statusFinalizacao.descricao}</label>
                                                                                </>
                                                                            )

                                                                        })
                                                                    }
                                                                    <input type="radio" name={`finalizacao-${e._id}`} id={`finalizacao-${e.numero}-Fracionamento de Nota Fiscal`} value='Fracionamento de Nota Fiscal' onClick={verificarFinalizacao} />
                                                                    <label htmlFor={`finalizacao-${e.numero}-Fracionamento de Nota Fiscal`}>Fracionamento de Nota Fiscal</label>
                                                                </>
                                                            )
                                                        }

                                                        return null
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <input type="checkbox" name="" id="checkbox-processamento-5" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button onClick={salvar} >Salvar</button>
                            </div>
                        </div>
                        <Box maxWidth='400px'>
                            <AgendaProcessamentoRsd flushHook={setFlushHook} agenda={agenda} />
                            <TabelaArquivosProcessamento salvar={salvar} arquivos={arquivos} flushHook={setFlushHook} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ProcessamentoPacote