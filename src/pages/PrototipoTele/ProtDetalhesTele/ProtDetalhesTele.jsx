import { Box, LinearProgress } from "@mui/material"
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

const ProtDetalhesTele = ({ cpfTitular, atualizarTabela, atualizarPesquisa, pesquisa }) => {

    // const { cpfTitular } = useParams()

    const [data, setData] = useState([])
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
            const result = await getDataByCpfTitular(cpfTitular)
            result.forEach(item => {
                if (item.cpf === item.cpfTitular) {
                    setTitular(item)
                }
            })
            setData(result)
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
    }, [cpfTitular, conversaSelecionada, flushHook, pesquisa, atualizarPesquisaCallback, atualizarTabelaCallback])

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
                <Box display={'flex'} width={'100%'}>
                    {
                        data.length !== 0 && (
                            <>
                                <CardInfoTitular data={titular} setFlushHook={setFlushHook} />
                                <CardComentariosTele cpf={cpfTitular} />
                            </>

                        )
                    }
                </Box>
                {
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
                }
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