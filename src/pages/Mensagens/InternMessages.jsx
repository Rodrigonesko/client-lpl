import { Box, Container } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useState } from "react"
import { getInfoUser } from "../../_services/user.service"
import AuthContext from "../../context/AuthContext"
import ModalAceitarPoliticas from "../../components/ModalAceitarPoliticas/ModalAceitarPoliticas"
import { useContext } from "react"
import { useEffect } from "react"
import { getPoliticasAtivas } from "../../_services/politicas.service"
import { getVerificarTreinamento } from "../../_services/treinamento.service"
import CardMessage from "./Cards/CardMessage"
import CardPessoasGrupos from "./Cards/CardPessoasGrupos"
import ModalAdicionarPessoas from "./Modal/ModalAdicionarPessoas"

const InternMessages = () => {

    const [open, setOpen] = useState(false)
    const [flushHook, setFlushHook] = useState(false)
    const [idPolitica, setIdPolitica] = useState('')
    const [treinamentos, setTreinamentos] = useState([])
    const [dataUser, setDataUser] = useState(null)
    const { name } = useContext(AuthContext)

    const [userData, setUserData] = useState({})

    const fetchData = async () => {
        const { user } = await getInfoUser()
        setDataUser(user)
    }

    useEffect(() => {
        fetchData()
    }, [name])

    const fetchInfoUser = async () => {

        try {
            const result = await getInfoUser()
            setDataUser(result.user)
            const resultPoliticas = await getPoliticasAtivas()
            const politicasLidas = result.user.politicasLidas
            const politicasNaoLidas = []
            for (const item of resultPoliticas) {
                const find = politicasLidas.some((idPolitica) => item._id === idPolitica)
                if (!find) {
                    politicasNaoLidas.push(item)
                }
            }
            const resultTreinamentos = await getVerificarTreinamento()
            setTreinamentos(resultTreinamentos);
            setIdPolitica(politicasNaoLidas[0])
            if (politicasNaoLidas.length !== 0) {
                setOpen(true)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFlushHook(false)
        fetchInfoUser()
    }, [flushHook])

    return (
        <>
            <Sidebar />
            <Container maxWidth>
                <div className="title">
                    <h2>Mensagens e Grupos</h2>
                </div>
                <Box display={'flex'} mt={2}>
                    <Box>
                        {
                            dataUser !== null && dataUser.accessLevel !== 'false' && (
                                <ModalAdicionarPessoas setFlushHook={setFlushHook} />
                            )
                        }
                        {
                            dataUser !== null && (
                                <CardPessoasGrupos data={userData} flushHook={flushHook} />
                            )}
                    </Box>
                    <Box width={'100%'} ml={2}>
                        {
                            dataUser !== null && (
                                <CardMessage dataUser={dataUser} flushHook={flushHook} setFlushHook={setFlushHook} />
                            )
                        }
                    </Box>
                </Box>
                {
                    idPolitica ? (
                        <ModalAceitarPoliticas setOpen={setOpen} open={open} idPolitica={idPolitica} setFlushHook={setFlushHook} />
                    ) : null
                }
            </Container>
        </>
    )
}

export default InternMessages