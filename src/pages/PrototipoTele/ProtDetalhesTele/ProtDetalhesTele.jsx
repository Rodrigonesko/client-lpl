import { Box, LinearProgress, Typography } from "@mui/material"
//import Sidebar from "../../../components/Sidebar/Sidebar"
import { grey } from "@mui/material/colors"
import CardInfoTitular from "./Cards/CardInfoTitular";
import CardComentariosTele from "./Cards/CardComentariosTele";
import CardInfoTele from "./Cards/CardInfoTele";
//import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getDataByCpfTitular, getHorariosDisponiveis } from "../../../_services/teleEntrevista.service";
import CardAcoesTele from "./Cards/CardAcoesTele";
import HorariosDisponiveis from "../../TeleEntrevistas/Agenda/Agendar/HorariosDisponiveis";
import CardConversaTele from "./Cards/CardConversaTele";
import { PropostaService } from "../../../_services/teleEntrevistaV2.service";
import moment from "moment";

const propostaService = new PropostaService()

const ProtDetalhesTele = ({ cpfTitular, atualizarTabela, atualizarPesquisa, pesquisa }) => {

    // const { cpfTitular } = useParams()

    const [data, setData] = useState([])
    const [data2, setData2] = useState()
    const [titular, setTitular] = useState({})
    const [horarios, setHorarios] = useState({})
    const [analistasDisponiveis, setAnalistasDisponiveis] = useState({})
    const [conversaSelecionada, setConversaSelecionada] = useState({})
    const [showConversas, setShowConversas] = useState(false)
    const [nomeWhatsapp, setNomeWhatsapp] = useState('')
    const [responsavelWhatsapp, setResponsavelWhatsapp] = useState('')
    const [whatsappSelected, setWhatsappSelected] = useState('')
    const [selectedObjects, setSelectedObjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [flushHook, setFlushHook] = useState(false)

    const buscarHorariosDisp = async () => {
        try {
            const result = await getHorariosDisponiveis()
            setHorarios(result.obj)
            setAnalistasDisponiveis(result.analistasDisponiveis)
        } catch (error) {
            console.log(error);
        }
    }

    const atualizarPesquisaCallback = useCallback(atualizarPesquisa, []);
    const atualizarTabelaCallback = useCallback(atualizarTabela, []);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            await propostaService.entrouNaProposta(cpfTitular)
            const result = await getDataByCpfTitular(cpfTitular)
            const agrupamentoPropostas = {};

            result.forEach(item => {
                if (item.tipoAssociado.toLowerCase().trim() === 'titular' || result.length === 1) {
                    setTitular(item);
                }

                // Agrupando propostas por valor
                const valorProposta = item.proposta;
                if (!agrupamentoPropostas[valorProposta]) {
                    agrupamentoPropostas[valorProposta] = [];
                }
                agrupamentoPropostas[valorProposta].push(item);
            });
            console.log(agrupamentoPropostas);
            setData(result)
            setData2(agrupamentoPropostas)
            setLoading(false)
        }
        setFlushHook(false)
        fetchData()
        buscarHorariosDisp()
        if (pesquisa !== '') {
            atualizarPesquisaCallback()
        } else {
            atualizarTabelaCallback()
        }
    }, [cpfTitular, flushHook])

    useEffect(() => {
        //Quanto o flushHook for chamado ira atualizar os dados dos selectedObjects com o status do newStatus
        setSelectedObjects([])

    }, [flushHook])

    return (

        // <Sidebar>
        <Box height={'100%'} width={'100%'} bgcolor={grey[200]} borderRadius={'5px'} mt={1} mr={1} display={'flex'}>
            <Box width={showConversas ? '60%' : '100%'}>
                {
                    loading && (
                        <LinearProgress sx={{ width: '100%' }} />
                    )
                }
                {/* <Box display={'flex'}>
                    {
                        data2[Object.keys(data2)[0]][0].tipoAssociado.toLowerCase().trim() === 'titular' ? 'Titular' : 'Dependente'
                    }
                </Box> */}
                <Box display={'flex'} width={'100%'}>
                    {
                        data2 && (
                            <>
                                <CardInfoTitular data={titular} setFlushHook={setFlushHook} />
                                <CardComentariosTele cpf={cpfTitular} />
                            </>

                        )
                    }
                </Box>
                {
                    data2 && (
                        Object.keys(data2).map((key, index) => {
                            return (
                                <Box
                                    key={index}

                                >
                                    <Typography
                                        variant={'h6'}
                                        m={2}
                                    >
                                        {key} - {moment(data2[key][0].dataRecebimento).format('DD/MM/YYYY')}
                                    </Typography>
                                    <CardInfoTele
                                        setShowConversas={setShowConversas}
                                        setNomeWhatsapp={setNomeWhatsapp}
                                        setResponsavelAtendimentoWhatsapp={setResponsavelWhatsapp}
                                        setWhatsappSelected={setWhatsappSelected}
                                        setConversaSelecionada={setConversaSelecionada}
                                        data={data2[key]}
                                        selectedObjects={selectedObjects}
                                        setSelectedObjects={setSelectedObjects}
                                        setFlushHook={setFlushHook}
                                    />
                                    <CardAcoesTele
                                        objects={selectedObjects}
                                        setFlushHook={setFlushHook}
                                    />
                                </Box>
                            )
                        }
                        )
                    )
                }
                {/* {
                    data.length !== 0 && (
                        <>
                            <CardInfoTele
                                setShowConversas={setShowConversas}
                                setNomeWhatsapp={setNomeWhatsapp}
                                setResponsavelAtendimentoWhatsapp={setResponsavelWhatsapp}
                                setWhatsappSelected={setWhatsappSelected}
                                setConversaSelecionada={setConversaSelecionada}
                                data={data}
                                selectedObjects={selectedObjects}
                                setSelectedObjects={setSelectedObjects}
                                setFlushHook={setFlushHook}
                            />
                            <CardAcoesTele
                                objects={selectedObjects}
                                setFlushHook={setFlushHook}

                            />
                        </>
                    )
                } */}
                {
                    (Object.keys(horarios).length !== 0 && Object.keys(analistasDisponiveis) !== 0) && (
                        <Box m={2}>
                            <HorariosDisponiveis horarios={horarios} analistasDisponiveis={analistasDisponiveis} />
                        </Box>

                    )
                }
            </Box>
            {
                showConversas && (
                    <CardConversaTele
                        open={showConversas}
                        setOpen={setShowConversas}
                        nome={nomeWhatsapp}
                        setNome={setNomeWhatsapp}
                        responsavelAtendimento={responsavelWhatsapp}
                        setResponsavelAtendimento={setResponsavelWhatsapp}
                        selectedWhatsapp={whatsappSelected}
                        setSelectedWhatsapp={setWhatsappSelected}
                        data={conversaSelecionada}
                        setData={setConversaSelecionada}
                    />
                )
            }
        </Box>
        // </Sidebar>
    )
}

export default ProtDetalhesTele 