import { Box } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { grey } from "@mui/material/colors"
import CardInfoTitular from "./Cards/CardInfoTitular";
import CardComentariosTele from "./Cards/CardComentariosTele";
import CardInfoTele from "./Cards/CardInfoTele";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataByCpfTitular, getHorariosDisponiveis } from "../../../_services/teleEntrevista.service";
import CardAcoesTele from "./Cards/CardAcoesTele";
import HorariosDisponiveis from "../../TeleEntrevistas/Agenda/Agendar/HorariosDisponiveis";
import CardConversaTele from "./Cards/CardConversaTele";

const ProtDetalhesTele = () => {

    const { cpfTitular } = useParams()

    const [data, setData] = useState([])
    const [titular, setTitular] = useState({})
    const [horarios, setHorarios] = useState({})
    const [analistasDisponiveis, setAnalistasDisponiveis] = useState({})
    const [showConversas, setShowConversas] = useState(false)
    const [nomeWhatsapp, setNomeWhatsapp] = useState('')
    const [responsavelWhatsapp, setResponsavelWhatsapp] = useState('')
    const [whatsappSelected, setWhatsappSelected] = useState('')

    const fetchData = async () => {
        const result = await getDataByCpfTitular(cpfTitular)
        result.forEach(item => {
            if (item.cpf === item.cpfTitular) {
                setTitular(item)
            }
        })
        setData(result)
    }

    const buscarHorariosDisp = async () => {
        try {
            const result = await getHorariosDisponiveis()
            setHorarios(result.obj)
            setAnalistasDisponiveis(result.analistasDisponiveis)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
        buscarHorariosDisp()
    }, [cpfTitular])

    return (
        <>
            <Sidebar />
            <Box height={'100%'} width={'100%'} bgcolor={grey[200]} borderRadius={'5px'} mt={1} mr={1} display={'flex'}>
                <Box width={showConversas ? '60%' : '100%'}>
                    <Box display={'flex'} width={'100%'}>
                        {
                            data.length !== 0 && (
                                <>
                                    <CardInfoTitular data={titular} />
                                    <CardComentariosTele />
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
                                    data={data} />
                                <CardAcoesTele />
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
                <CardConversaTele
                    open={showConversas}
                    setOpen={setShowConversas}
                    nome={nomeWhatsapp}
                    setNome={setNomeWhatsapp}
                    responsavelAtendimento={responsavelWhatsapp}
                    setResponsavelAtendimento={setResponsavelWhatsapp}
                    selectedWhatsapp={whatsappSelected}
                    setSelectedWhatsapp={setWhatsappSelected}
                />
            </Box>
        </>
    )
}

export default ProtDetalhesTele 