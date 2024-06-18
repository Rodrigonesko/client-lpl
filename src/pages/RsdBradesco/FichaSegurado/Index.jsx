import { Box, Divider, Table, TableHead, TableCell, TableBody, TableRow } from "@mui/material";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Title from "../../../components/Title/Title";
import { deepPurple, indigo, red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPacotesByTitular, getSeguradosByTitular, getTitularById } from "../../../_services/rsdBradesco.service";
import Pacotes from "./components/Pacotes";
import Toast from "../../../components/Toast/Toast";
import Ficha from "../components/Ficha";
import ModalCriarSegurado from "./components/ModalCriarSegurado";

const FichaSegurado = () => {

    const { id } = useParams();

    const [pacotes, setPacotes] = useState([]);
    const [titular, setTitular] = useState();
    const [segurados, setSegurados] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            try {
                const data = await getTitularById(id);
                setTitular(data);

                const dataSegurados = await getSeguradosByTitular(id);
                setSegurados(dataSegurados);

                const dataPacotes = await getPacotesByTitular(id);
                setPacotes(dataPacotes);
            } catch (error) {
                console.log(error);
                setMessage('Erro ao buscar dados')
                setSeverity('error')
                setOpenToast(true)
            }
        }
        fetch();
    }, [id])

    return (
        <Sidebar>
            <Box
                m={2}
            >
                <Title
                    size={'medium'}
                    fontColor={indigo[900]}
                    lineColor={red[700]}
                >
                    {titular?.nome}
                </Title>
                <Divider />
                <Ficha
                    titular={titular}
                    segurados={segurados}
                />
                <Box sx={{ mt: 2 }}>
                    <ModalCriarSegurado />
                </Box>
                <Table size="small" sx={{ mb: 5, mt: 3 }}>
                    <TableHead sx={{ background: `linear-gradient(45deg, ${red[800]} 80%, ${deepPurple[700]} 95%)` }}>
                        <TableRow>
                            <TableCell ></TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Código</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Responsável</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            pacotes.map((pacote) => (
                                <Pacotes
                                    key={pacote}
                                    pacote={pacote}
                                    setPacotes={setPacotes}
                                />
                            ))
                        }

                    </TableBody>
                </Table>
            </Box>
            <Toast
                open={openToast}
                onClose={() => setOpenToast(false)}
                message={message}
                severity={severity}
            />
        </Sidebar>
    );
}

export default FichaSegurado;