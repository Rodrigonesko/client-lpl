import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaAngleDown } from 'react-icons/fa'
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FichaBeneficiario.css'
import moment from "moment/moment";
import TabelaProtocolo from "../../../components/TabelaProtocolo/TabelaProtocolo";
import TabelaPedido from "../../../components/TabelaPedido/TabelaPedido";
import TabelaPacotes from "../../../components/TabelaPacotes/TabelaPacotes";
import $ from 'jquery'
import Modal from 'react-modal'
import { assumirPacote, criarPacoteRsd, devolverPacote, getPedidosPorMo } from "../../../_services/rsd.service";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import { Container, Box, Typography, Button, Alert, Snackbar } from "@mui/material";
import PedidosReembolso from "./PedidosReembolso/PedidosReembolso";
import { indigo } from "@mui/material/colors";


Modal.setAppElement('#root')

const FichaBeneficiario = () => {

    const { mo } = useParams()
    const { name } = useContext(AuthContext)

    const [flushHook, setFlushHook] = useState(false)

    const [pedidos, setPedidos] = useState([])
    const [protocolos, setProtocolos] = useState([])
    const [pacotes, setPacotes] = useState([])
    const [checkPedidos, setCheckPedidos] = useState([])

    const [modalInativarPacote, setModalInativarPacote] = useState(false)
    const [inativarPacote, setInativarPacote] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const mostrarPedidos = e => {
        let trPedidos = e.target.parentElement.nextSibling

        if (!trPedidos.classList.contains('data')) {
            $(trPedidos).toggle('fast')
        } else {
            $(trPedidos.parentElement.nextSibling).toggle('fast')
        }
    }

    const marcarProtocolo = e => {

        let colecaoPedidos = e.target.parentElement.parentElement.nextSibling.firstChild.firstChild.firstChild.children[1].children

        if (e.target.checked) {

            for (const tr of colecaoPedidos) {
                tr.lastChild.firstChild.checked = true
            }

        } else {
            for (const tr of colecaoPedidos) {
                tr.lastChild.firstChild.checked = false
            }
        }
    }

    const criarPacote = async e => {
        try {

            let checkboxs = document.getElementsByClassName('checkbox-pedido')

            let arrPedidos = []

            for (const item of checkboxs) {
                if (item.checked) {
                    arrPedidos.push(item.value)
                }
            }

            await criarPacoteRsd({ arrPedidos })

            window.location.reload();


        } catch (error) {
            console.log(error);
        }
    }

    const handleCriarPacote = async () => {

        if (checkPedidos.length === 0) {
            return
        }

        await criarPacoteRsd({
            arrPedidos: checkPedidos
        })
        setCheckPedidos([])

        setOpen(true)
        setFlushHook(true)
    }

    const handlerAssumirPacote = async e => {
        try {

            //const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pacote/assumir`, { name: name, pacote: e.target.value }, { withCredentials: true })

            await assumirPacote({ name: name, pacote: e.target.value })

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    const handlerDevolverPacote = async e => {
        try {

            const motivoInativo = document.getElementById('motivo-inativo-pacote').value

            await devolverPacote({
                pacote: e,
                motivoInativo
            })

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        setFlushHook(false)

        console.log('chamou flush');

        const buscarMo = async () => {

            const resultPedidos = await getPedidosPorMo(mo)

            setPedidos(resultPedidos.pedidos)

            let auxProtocolos = resultPedidos.pedidos.filter((item, pos, array) => {
                return item.status === 'A iniciar'
            })

            let arrAuxProtocolos = auxProtocolos.filter((item, pos, array) => {
                return array.map(x => x.protocolo).indexOf(item.protocolo) === pos
            })

            setProtocolos(arrAuxProtocolos)

            let arrAuxPacotes = resultPedidos.pedidos.filter((item, pos, array) => {
                return array.map(x => x.pacote).indexOf(item.pacote) === pos
            })

            setPacotes(arrAuxPacotes)
        }

        buscarMo()
    }, [mo, flushHook])

    return (
        <>
            <Sidebar></Sidebar>
            <Box width='100%' height='100vh' overflow='auto' display='flex' justifyContent='center'>
                <Container style={{maxWidth: '1300px'}} >
                    <Box className="cadastro-beneficiario-container">
                        <Typography variant="h5" m={2}>
                            Ficha Beneficiário
                        </Typography>
                        <Typography p={1} bgcolor='lightgray' borderRadius='5px' >
                            Informações Gerais
                        </Typography>
                        <InformacoesGerais mo={mo} />
                        <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px' >
                            Pedidos de Reembolso
                        </Typography>
                        {/* {
                            protocolos.length !== 0 ? (
                                <PedidosReembolso
                                    setCheckPedidos={setCheckPedidos}
                                    checkPedidos={checkPedidos}
                                    flushHook={setFlushHook}
                                    protocolos={protocolos}
                                    pedidos={pedidos}
                                />
                            ) : null
                        }
                        <Box m={2}>
                            <Button sx={{ mr: '10px', bgcolor: indigo[500], ":hover": { bgcolor: indigo[700] } }} href={`/rsd/CriarProtocolo/${mo}`} variant="contained" size="small" >Novo Protocolo</Button>
                            <Button onClick={handleCriarPacote} sx={{ mr: '10px' }} variant="contained" size="small">Criar Pacote</Button>
                        </Box> */}
                        <br /><br />
                        <div className="pedidos-reembolso">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th>Numero Protocolo</th>
                                        <th>Data Solicitação</th>
                                        <th>Data Pagamento</th>
                                        <th>Status</th>
                                        <th>Data Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        protocolos.map(e => {

                                            if (e.status === 'A iniciar') {
                                                return (
                                                    <>
                                                        <tr key={e.protocolo}>
                                                            <td onClick={e => {
                                                                mostrarPedidos(e)
                                                            }} className="td-protocolo"> <FaAngleDown />{e.protocolo}</td>
                                                            <td className="data">{moment(e.dataSolicitacao).format('DD/MM/YYYY')}</td>
                                                            <td>{moment(e.dataPagamento).format('DD/MM/YYYY')}</td>
                                                            <td>{e.status}</td>
                                                            <td>{moment(e.updatedAt).format('DD/MM/YYYY')}</td>
                                                            <td> <input type="checkbox" value={e.protocolo} className='checkbox-protocolo' onClick={marcarProtocolo} /> </td>
                                                        </tr>
                                                        <tr key={e._id} className="none">
                                                            <TabelaPedido className='' protocolo={e.protocolo} pedidos={pedidos}>

                                                            </TabelaPedido>
                                                        </tr>

                                                    </>

                                                )
                                            }

                                            return null
                                        })
                                    }
                                </tbody>
                            </table>
                            <div>
                                <Link className="btn-criar-protocolo" to={`/rsd/CriarProtocolo/${mo}`}>Novo Protocolo</Link>
                                <button className="btn-criar-pacote" onClick={criarPacote} >Criar Pacote</button>
                            </div>
                        </div>

                        {/* <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px' >
                            Pacotes
                        </Typography>

                        {
                            pacotes.length !== 0 ? (
                                <TabelaPacotes
                                    pacotes={pacotes}
                                    pedidos={pedidos}
                                    verificaPacote={true}
                                    finalizados={false}
                                    flushHook={setFlushHook}
                                />
                            ) : null
                        }

                        <br />
                        <br /> */}
                        <div className="titulo-informacoes-gerais">
                            <span>Pacotes</span>
                        </div>
                        <div className="pacotes">
                            <table className="table">
                                <thead className="table-header">
                                    <tr>
                                        <th>ID LPL</th>
                                        <th>ANS</th>
                                        <th>Status</th>
                                        <th>Analista</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pacotes.map(e => {
                                            if (e.statusPacote !== 'Não iniciado' && e.statusPacote !== 'Finalizado' && e.statusPacote !== 'Cancelado' && e.statusPacote !== 'Comprovante Correto') {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="td-pacote" onClick={mostrarPedidos} > <FaAngleDown /> {e.pacote}</td>
                                                            <td className="data">{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                            <td>{e.statusPacote}</td>
                                                            <td>{e.analista}</td>
                                                            <td><button value={e.pacote} onClick={handlerAssumirPacote} className='btn-assumir-pacote' >Assumir</button></td>
                                                            <td><Link to={`/rsd/ProcessamentoPacote/${mo}/${e.pacote}`} className="btn-verificar-processamento">Verificar Processamento</Link> <button onClick={() => {
                                                                setModalInativarPacote(true)
                                                                setInativarPacote(e.pacote)
                                                            }} className="botao-padrao-cinza">Inativar</button></td>
                                                        </tr>
                                                        <tr className="none teste">
                                                            <TabelaProtocolo
                                                                pedidos={pedidos}
                                                                pacote={e.pacote}
                                                                verificaPacote={true}
                                                                finalizados={false}
                                                            />
                                                        </tr>
                                                    </>
                                                )
                                            }

                                            return null
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Box>
                </Container>
                <Modal
                    isOpen={modalInativarPacote}
                    onRequestClose={() => { setModalInativarPacote(false) }}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'
                >
                    <div className="title titulo-modal-agenda">
                        <h2>Motivo de inativação</h2>
                    </div>
                    <div>
                        <select name="motivo-inativo-pacote" id="motivo-inativo-pacote">
                            <option value="devolvido">devolvido</option>
                            <option value="duplicidade">duplicidade</option>
                            <option value="VIP">VIP</option>
                        </select>
                    </div>
                    <div>
                        <button value={inativarPacote} onClick={e => {
                            handlerDevolverPacote(e.target.value)
                        }} >Inativar</button>
                    </div>
                </Modal>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Pacote criado com sucesso!
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}

export default FichaBeneficiario