import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Box, Typography } from "@mui/material";
import InformacoesGerais from "../../../components/InformacoesGerais/InformacoesGerais";
import { getPedidosPorMo } from "../../../_services/rsd.service";
import TabelaPacotes from "../../../components/TabelaPacotes/TabelaPacotes";

const FichaBeneficiarioConcluidos = () => {

    const { mo } = useParams()

    const [pedidos, setPedidos] = useState([])
    const [pacotes, setPacotes] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    useEffect(() => {

        setFlushHook(false)

        const buscarMo = async () => {

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
            <Sidebar>
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
                        </Box>
                    </Container>
                </Box>
            </Sidebar>
        </>
    )
}

export default FichaBeneficiarioConcluidos