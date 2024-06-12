import { Box, Chip, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import { deepPurple, indigo, red } from "@mui/material/colors"
import CollapseProtocolos from "../FichaSegurado/components/CollapseProtocolos"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Toast from "../../../components/Toast/Toast"
import { getPacoteById, getPacotesBySegurado, getSeguradoById } from "../../../_services/rsdBradesco.service"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { colorStatusRsdBradesco } from "../FichaSegurado/utils/types"
import SubCollapsePedidos from "../FichaSegurado/components/SubCollapsePedidos"

const Protocolos = () => {

    const { id } = useParams();

    const [pacotes, setPacotes] = useState([]);
    // const [segurado, setSegurado] = useState();


    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    const [openSubRow, setOpenSubRow] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                // const data = await getSeguradoById(id);
                const dataPacotes = await getPacoteById(id);
                setPacotes(dataPacotes);
                // setSegurado(data);
            } catch (error) {
                console.log(error);
                setMessage('Erro ao buscar dados')
                setSeverity('error')
                setOpenToast(true)
            }
        }
        fetch();
    }, [id])

    console.log(pacotes);

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} fontColor={indigo[800]} lineColor={red[700]}>Protocolos</Title>
                    <Table size="small" >
                        <TableHead sx={{ background: `linear-gradient(45deg, ${red[700]} 80%, ${deepPurple[800]} 95%)` }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center" sx={{ color: 'white' }} >Protocolo</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }} >Status</TableCell>
                                <TableCell align="center" sx={{ color: 'white' }} >Quantidade de Pedidos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                pacotes?.protocolos?.map((protocolo, index) => (
                                    <>
                                        <TableRow key={index._id}>
                                            <TableCell align="left"><IconButton
                                                size="small"
                                                onClick={() => {
                                                    setOpenSubRow(!openSubRow)
                                                }}
                                            >
                                                <Tooltip title='Detalhes'>
                                                    {openSubRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                </Tooltip>
                                            </IconButton>
                                            </TableCell>
                                            <TableCell align="center">{protocolo.codigo}</TableCell>
                                            <TableCell
                                                align="center"
                                            >
                                                <Chip
                                                    label={protocolo.status}
                                                    sx={{
                                                        color: 'white',
                                                        backgroundColor: colorStatusRsdBradesco[protocolo.status],
                                                    }}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell align="center">{protocolo.pedidos.length}</TableCell>
                                        </TableRow>
                                        < SubCollapsePedidos
                                            pedido={protocolo.pedidos}
                                            openSubRow={openSubRow}
                                        />
                                    </>
                                ))
                            }
                        </TableBody >
                    </Table>
                </Container>
                <Toast
                    open={openToast}
                    onClose={() => setOpenToast(false)}
                    message={message}
                    severity={severity}
                />
            </Sidebar>
        </>
    )
}

export default Protocolos