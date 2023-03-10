import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import Painel from "../../../components/Painel/Painel";
import './PainelProcessos.css'

const PainelProcessos = () => {

    const [statusVencidoIniciar, setStatusVencidoInciar] = useState(false)
    const [statusVenceHojeIniciar, setStatusVenceHojeInciar] = useState(false)
    const [statusVenceAmanhaIniciar, setStatusVenceAmanhaInciar] = useState(false)
    const [statusVence2Iniciar, setStatusVence2Inciar] = useState(false)
    const [statusVence3Iniciar, setStatusVence3Inciar] = useState(false)
    const [statusVence4Iniciar, setStatusVence4Iniciar] = useState(false)

    const [statusVencidoAgendado, setStatusVencidoAgendado] = useState(false)
    const [statusVenceHojeAgendado, setStatusVenceHojeAgendado] = useState(false)
    const [statusVenceAmanhaAgendado, setStatusVenceAmanhaAgendado] = useState(false)
    const [statusVence2Agendado, setStatusVence2Agendado] = useState(false)
    const [statusVence3Agendado, setStatusVence3Agendado] = useState(false)
    const [statusVence4Agendado, setStatusVence4Agendado] = useState(false)

    const [statusVencidoAgc, setStatusVencidoAgc] = useState(false)
    const [statusVenceHojeAgc, setStatusVenceHojeAgc] = useState(false)
    const [statusVenceAmanhaAgc, setStatusVenceAmanhaAgc] = useState(false)
    const [statusVence2Agc, setStatusVence2Agc] = useState(false)
    const [statusVence3Agc, setStatusVence3Agc] = useState(false)
    const [statusVence4Agc, setStatusVence4Agc] = useState(false)

    const [statusVencidoAgd, setStatusVencidoAgd] = useState(false)
    const [statusVenceHojeAgd, setStatusVenceHojeAgd] = useState(false)
    const [statusVenceAmanhaAgd, setStatusVenceAmanhaAgd] = useState(false)
    const [statusVence2Agd, setStatusVence2Agd] = useState(false)
    const [statusVence3Agd, setStatusVence3Agd] = useState(false)
    const [statusVence4Agd, setStatusVence4Agd] = useState(false)

    const [pedidos, setPedidos] = useState([])

    const [aIniciar, setAiniciar] = useState([])
    const [agendados, setAgendados] = useState([])
    const [aguardandoContatos, setAguardandoContatos] = useState([])
    const [aguardandoDocs, setAguardandoDocs] = useState([])

    const [teste, setTeste] = useState('')

    const [pesquisa, setPesquisa] = useState('')





    const pesquisaFiltro = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/naoFinalizados/filtro/${pesquisa}`, { withCredentials: true })

            setPedidos(result.data.pedidos)

            setAiniciar([])
            setAgendados([])
            setAguardandoContatos([])
            setAguardandoDocs([])

            result.data.pedidos.forEach(e => {

                console.log(e);

                if (e.status === 'A iniciar') {
                    setAiniciar(aIniciar => [...aIniciar, e])
                }
                if (e.status === 'Em andamento') {
                    setAgendados(agendados => [...agendados, e])
                }
                if (e.status === 'Aguardando Retorno Contato') {
                    setAguardandoContatos(aguardandoContatos => [...aguardandoContatos, e])
                }
                if (e.status === 'Aguardando Docs') {
                    setAguardandoDocs(aguardandoDocs => [...aguardandoDocs, e])
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const buscarPedidos = async () => {
            try {

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/naoFinalizados/naoFinalizados`, { withCredentials: true })

                setPedidos(result.data.pedidos)

                setTeste('teste')

            } catch (error) {
                console.log(error);
            }
        }

        const setStatusPedido = async () => {
            pedidos.forEach(e => {

                if (e.status === 'A iniciar') {
                    setAiniciar(aIniciar => [...aIniciar, e])
                }
                if (e.status === 'Em andamento') {
                    setAgendados(agendados => [...agendados, e])
                }
                if (e.status === 'Aguardando Retorno Contato') {
                    setAguardandoContatos(aguardandoContatos => [...aguardandoContatos, e])
                }
                if (e.status === 'Aguardando Docs') {
                    setAguardandoDocs(aguardandoDocs => [...aguardandoDocs, e])
                }
            })

        }

        buscarPedidos()
        setStatusPedido()
    }, [teste])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-painel-container">
                <div className="painel-container">
                    <div className="title">
                        <h3>Painel Processos</h3>
                    </div>
                    <div className="filtros-painel">
                        <input type="text" placeholder="Marca ótica, nome, CPF, Protocolo" onChange={e => setPesquisa(e.target.value)} />
                        <select name="analista" id="analista">
                            <option value="">Analista</option>
                        </select>
                        <button onClick={pesquisaFiltro} >Pesquisar</button>
                    </div>
                    <div className="painel-processos">
                        <Painel
                            statusVencido={statusVencidoIniciar}
                            statusVenceHoje={statusVenceHojeIniciar}
                            statusVenceAmanha={statusVenceAmanhaIniciar}
                            statusVence2={statusVence2Iniciar}
                            statusVence3={statusVence3Iniciar}
                            statusVence4={statusVence4Iniciar}
                            setStatusVencido={setStatusVencidoInciar}
                            setStatusVenceHoje={setStatusVenceHojeInciar}
                            setStatusVenceAmanha={setStatusVenceAmanhaInciar}
                            setStatusVence2={setStatusVence2Inciar}
                            setStatusVence3={setStatusVence3Inciar}
                            setStatusVence4={setStatusVence4Iniciar}
                            title={'A iniciar'}
                            protocolos={aIniciar}

                        />
                        <div className="painel">
                            <Painel
                                statusVencido={statusVencidoAgendado}
                                statusVenceHoje={statusVenceHojeAgendado}
                                statusVenceAmanha={statusVenceAmanhaAgendado}
                                statusVence2={statusVence2Agendado}
                                statusVence3={statusVence3Agendado}
                                statusVence4={statusVence4Agendado}
                                setStatusVencido={setStatusVencidoAgendado}
                                setStatusVenceHoje={setStatusVenceHojeAgendado}
                                setStatusVenceAmanha={setStatusVenceAmanhaAgendado}
                                setStatusVence2={setStatusVence2Agendado}
                                setStatusVence3={setStatusVence3Agendado}
                                setStatusVence4={setStatusVence4Agendado}
                                title={'Agendado'}
                                protocolos={agendados}
                            />
                        </div>
                        <div className="painel">
                            <Painel
                                statusVencido={statusVencidoAgc}
                                statusVenceHoje={statusVenceHojeAgc}
                                statusVenceAmanha={statusVenceAmanhaAgc}
                                statusVence2={statusVence2Agc}
                                statusVence3={statusVence3Agc}
                                statusVence4={statusVence4Agc}
                                setStatusVencido={setStatusVencidoAgc}
                                setStatusVenceHoje={setStatusVenceHojeAgc}
                                setStatusVenceAmanha={setStatusVenceAmanhaAgc}
                                setStatusVence2={setStatusVence2Agc}
                                setStatusVence3={setStatusVence3Agc}
                                setStatusVence4={setStatusVence4Agc}
                                title={'Aguardando Contato'}
                                protocolos={aguardandoContatos}
                            />
                        </div>
                        <div className="painel">
                            <Painel
                                statusVencido={statusVencidoAgd}
                                statusVenceHoje={statusVenceHojeAgd}
                                statusVenceAmanha={statusVenceAmanhaAgd}
                                statusVence2={statusVence2Agd}
                                statusVence3={statusVence3Agd}
                                statusVence4={statusVence4Agd}
                                setStatusVencido={setStatusVencidoAgd}
                                setStatusVenceHoje={setStatusVenceHojeAgd}
                                setStatusVenceAmanha={setStatusVenceAmanhaAgd}
                                setStatusVence2={setStatusVence2Agd}
                                setStatusVence3={setStatusVence3Agd}
                                setStatusVence4={setStatusVence4Agd}
                                title={'Aguardando Doc'}
                                protocolos={aguardandoDocs}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PainelProcessos