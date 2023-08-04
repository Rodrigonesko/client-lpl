import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FaAngleDown } from 'react-icons/fa'
import AuthContext from "../../../context/AuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";
import moment from "moment/moment";
import TabelaProtocolo from "../../../components/TabelaProtocolo/TabelaProtocolo";
import { Container, Box, Typography } from "@mui/material";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import { assumirPacote, getPedidosPorMo } from "../../../_services/rsd.service";
import TabelaPacotes from "../../../components/TabelaPacotes/TabelaPacotes";

const FichaBeneficiarioConcluidos = () => {

    const { mo } = useParams()
    const { name } = useContext(AuthContext)

    const [pedidos, setPedidos] = useState([])
    const [pacotes, setPacotes] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const mostrarPedidos = e => {
        let trPedidos = e.target.parentElement.nextSibling

        if (!trPedidos.classList.contains('data')) {
            trPedidos.classList.toggle('none')
        } else {
            console.log(trPedidos.parentElement.nextSibling.classList.toggle('none'));
        }
    }

    const handlerAssumirPacote = async e => {
        try {

            //const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pacote/assumir`, { name: name, pacote: e.target.value }, { withCredentials: true })

            await assumirPacote({
                name: name,
                pacote: e.target.value
            })

            window.location.reload();


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        setFlushHook(false)

        const buscarMo = async () => {

            //const resultPedidos = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/mo/${mo}`, { withCredentials: true })

            const resultPedidos = await getPedidosPorMo(mo)

            setPedidos(resultPedidos.pedidos)

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
                <Container style={{ maxWidth: '1400px' }}>
                    <Box className="cadastro-beneficiario-container">
                        <Typography variant="h5" m={2}>
                            Ficha Beneficiário Concluído
                        </Typography>
                        <Typography p={1} bgcolor='lightgray' borderRadius='5px' >
                            Informações Gerais
                        </Typography>
                        <InformacoesGerais mo={mo} />
                        <Typography mt={1} mb={1} p={1} bgcolor='lightgray' borderRadius='5px' >
                            Pacotes Concluídos
                        </Typography>
                        <TabelaPacotes
                            pacotes={pacotes}
                            pedidos={pedidos}
                            verificaPacote={true}
                            finalizados={true}
                            flushHook={setFlushHook}
                        />
                        {/* <div className="pacotes">
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
                                        if (e.statusPacote !== 'Não iniciado' && e.status === 'Finalizado') {
                                            return (
                                                <>
                                                    <tr>
                                                        <td className="td-pacote" onClick={mostrarPedidos} > <FaAngleDown /> {e.pacote}</td>
                                                        <td className="data">{moment(e.createdAt).format('DD/MM/YYYY')}</td>
                                                        <td>{e.statusPacote}</td>
                                                        <td>{e.analista}</td>
                                                        <td><button value={e.pacote} onClick={handlerAssumirPacote} className='btn-assumir-pacote' >Assumir</button></td>
                                                        <td><Link to={`/rsd/ProcessamentoPacote/${mo}/${e.pacote}`} className="btn-verificar-processamento">Verificar Processamento</Link></td>
                                                    </tr>
                                                    <tr className="none teste">
                                                        <TabelaProtocolo
                                                            pedidos={pedidos}
                                                            pacote={e.pacote}
                                                            verificaPacote={true}
                                                            finalizados={true}
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
                    </div> */}
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default FichaBeneficiarioConcluidos
