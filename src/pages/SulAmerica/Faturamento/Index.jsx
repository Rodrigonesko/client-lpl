import React, { useContext, useEffect, useState, useCallback } from "react";
import { useForm, useFieldArray, Controller, set } from "react-hook-form";
import Sidebar from "../../../components/Sidebar/Sidebar";
import AuthContext from "../../../context/AuthContext";
import Toast from "../../../components/Toast/Toast";
import {
    deleteFaturamento,
    filterFaturamento,
    getDatasCriacoaPedido,
    updateFaturamento
} from "../../../_services/sulAmerica.service";
import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Pagination,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import Title from "../../../components/Title/Title";
import { blue, green, orange, red } from "@mui/material/colors";
import moment from "moment";
import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { Delete } from "@mui/icons-material";
import { colorStatus, colorSubStatus } from "../Pedidos/utils/types";
import ModalGerarRelatorio from "./Components/ModalGerarRelatorio";

// Utilizando React.memo para memorizar o componente Row
const Row = React.memo(({ pedido, control, index, remove, handleFaturar }) => {
    return (
        <TableRow>
            {/* <TableCell align="center">{pedido.pedido._id}</TableCell> */}
            <TableCell align="center">
                {moment(pedido.pedido.dataCriacao).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell align="center">{pedido.pedido.beneficiario.nome}</TableCell>
            <TableCell align="center">
                <Typography
                    sx={{
                        bgcolor: colorStatus[pedido.pedido.status] || "black",
                        color: "white",
                        borderRadius: 2,
                        p: 1,
                    }}
                    variant="caption"
                >
                    {pedido.pedido.status}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography
                    sx={{
                        bgcolor:
                            colorSubStatus[pedido.pedido.subStatus]?.backgroundColor ||
                            "black",
                        color: colorSubStatus[pedido.pedido.subStatus]?.color || "black",
                        borderRadius: 2,
                        p: 1,
                    }}
                    variant="caption"
                >
                    {pedido.pedido.subStatus}
                </Typography>
            </TableCell>
            <TableCell align="center">{pedido.pedido.responsavel}</TableCell>
            <TableCell align="center">
                <Controller
                    name={`pedidos[${index}].nf`}
                    control={control}
                    defaultValue={pedido.nf || ""}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            variant="outlined"
                            size="small"
                            placeholder="NF"
                            disabled={pedido.status === "FATURADO"}
                        />
                    )}
                />
            </TableCell>
            <TableCell>
                {
                    pedido.status === "FATURADO" ? (
                        <Typography
                            sx={{
                                bgcolor: green[100],
                                color: green[900],
                                borderRadius: 2,
                                fontWeight: "bold",
                                p: 1,
                            }}
                            variant="caption"
                        >
                            {pedido.status}
                        </Typography>
                    ) : <Button
                        size="small"
                        onClick={() => handleFaturar(index)}
                    >
                        Faturar
                    </Button>
                }
                <ModalComponent
                    buttonIcon={<Delete />}
                    buttonText={"Excluir"}
                    buttonColorScheme={red[900]}
                    headerText={"Excluir Pedido"}
                    textButton={"Excluir"}
                    saveButtonColorScheme={red[900]}
                    onAction={async () => {
                        try {
                            await deleteFaturamento(pedido._id);
                            remove(index);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Alert severity="warning">
                            Deseja realmente excluir o pedido?
                        </Alert>
                    </Box>
                </ModalComponent>
            </TableCell>
        </TableRow>
    );
});

const Faturamento = () => {
    const { acessos } = useContext(AuthContext);
    const {
        control,
        getValues,

    } = useForm({
        defaultValues: {
            pedidos: [],
        },
    });

    const { fields, remove, replace } = useFieldArray({
        control,
        name: "pedidos",
    });

    const [lotes, setLotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [nf, setNf] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [lote, setLote] = useState("");
    const [status, setStatus] = useState("A FATURAR");

    useEffect(() => {
        if (acessos) {
            if (!acessos.administrador) {
                window.location.href = "/";
            }
        }
    }, [acessos]);

    useEffect(() => {
        const fetchLotes = async () => {
            try {
                const response = await getDatasCriacoaPedido();
                setLotes(response);
            } catch (error) {
                console.error(error);
                setOpenToast(true);
                setMessage("Erro ao buscar lotes");
                setSeverity("error");
            }
        };
        fetchLotes();
    }, []);

    const fetch = useCallback(async () => {
        try {
            setLoading(true);
            const response = await filterFaturamento(page, limit, lote, status, "");
            setTotal(response.total);
            replace(response.result); // Use replace instead of append to replace all the fields at once
            setLoading(false);
        } catch (error) {
            console.error(error);
            setOpenToast(true);
            setMessage("Erro ao buscar pedidos");
            setSeverity("error");
        }
    }, [page, limit, replace, lote, status]);

    useEffect(() => {
        fetch();
    }, [page, limit, fetch]);

    const handleFaturarIndividual = async (index) => {
        const data = getValues("pedidos")[index]
        if (!data.nf) {
            setOpenToast(true);
            setMessage("Informe o número da NF");
            setSeverity("error");
            return;
        }

        try {
            await updateFaturamento(data._id, {
                nf: data.nf,
                status: "FATURADO",
            });
            setOpenToast(true);
            setMessage('Pedido faturado com sucesso');
            setSeverity("success");
            // Update the specific field in the table
            const updatedFields = [...getValues("pedidos")];
            updatedFields[index].status = "FATURADO";
            updatedFields[index].nf = data.nf;
            replace(updatedFields);
        } catch (error) {
            console.error(error);
            setOpenToast(true);
            setMessage("Erro ao faturar pedido");
            setSeverity("error");
        }
    };

    const handleFaturar = async () => {
        try {
            const currentFields = getValues("pedidos").filter((pedido) => pedido.status === "A FATURAR" && pedido.nf);
            for (let i = 0; i < currentFields.length; i++) {
                await updateFaturamento(currentFields[i]._id, {
                    nf: currentFields[i].nf,
                    status: "FATURADO",
                });
                setProgress((i + 1) * 100 / currentFields.length);
            }
            setOpenToast(true);
            setMessage("Pedidos faturados com sucesso");
            setSeverity("success");
            fetch();
        }
        catch (error) {
            console.error(error);
            setOpenToast(true);
            setMessage("Erro ao faturar pedidos");
            setSeverity("error");
        }
    }


    const handlePreencherNfs = () => {
        let currentFields = getValues("pedidos").map((pedido) => {
            if (pedido.status === "A FATURAR") {
                return { ...pedido, nf: nf };
            }
            return pedido;
        });
        replace(currentFields);
        setOpenToast(true);
        setMessage("NFs preenchidas");
        setSeverity("success");
    };


    return (
        <Sidebar>
            <Box
                sx={{
                    m: 2,
                }}
            >
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Title fontColor={blue[900]} lineColor={orange[900]} size={"small"}>
                        Faturamento Sul America
                    </Title>
                    <ModalGerarRelatorio lotes={lotes} />
                </Box>
                <Box>
                    <Box
                        mt={2}
                        mb={2}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        flexWrap={"wrap"}
                        gap={2}
                    >
                        <Box display={"flex"} gap={1} flexWrap={"wrap"}>
                            <FormControl sx={{ width: "300px" }} size="small">
                                <InputLabel>Lote</InputLabel>
                                <Select label="Lote"
                                    value={lote}
                                    onChange={(e) => setLote(e.target.value)}
                                >
                                    <MenuItem value={""}>Todos</MenuItem>
                                    {lotes.map((lote) => (
                                        <MenuItem key={lote} value={lote}>
                                            {moment(lote).format("DD/MM/YYYY")}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ width: "300px" }} size="small">
                                <InputLabel>Status Faturamento</InputLabel>
                                <Select label="Status Faturamento"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value={""}>Todos</MenuItem>
                                    <MenuItem value={"FATURADO"}>Faturado</MenuItem>
                                    <MenuItem value={"A FATURAR"}>A Faturar</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            display={"flex"}
                            gap={2}
                            alignItems={"center"}
                        >
                            <TextField
                                size="small"
                                label='NF'
                                variant='outlined'
                                value={nf}
                                onChange={(e) => setNf(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePreencherNfs}
                            >
                                Preencher nfs
                            </Button>
                            <ModalComponent
                                isButton={true}
                                buttonIcon={null}
                                buttonText={"Faturar"}
                                buttonColorScheme={blue[900]}
                                headerText={"Faturar Pedidos"}
                                textButton={"Faturar"}
                                saveButtonColorScheme={blue[900]}
                                onAction={handleFaturar}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    <Alert severity="warning">
                                        Deseja realmente faturar os pedidos selecionados? {nf && `NF: ${nf}`} | {getValues("pedidos").filter((pedido) => pedido.status === "A FATURAR" && pedido.nf).length} Pedidos selecionados
                                    </Alert>
                                    <LinearProgress variant="determinate" value={progress} />
                                </Box>
                            </ModalComponent>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: "gray",
                            }}
                        >
                            {total} Pedidos
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <FormControl
                            sx={{
                                width: "100px",
                            }}
                            size="small"
                        >
                            <InputLabel>Limite</InputLabel>
                            <Select
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                label="Limite"
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={500}>500</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination
                            count={Math.ceil(total / limit)}
                            onChange={(e, page) => setPage(page)}
                        />
                    </Box>
                    <form action="">

                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor: blue[900],
                                        }}
                                    >
                                        {/* <TableCell align="center" sx={{ color: "white" }}>
                                        ID
                                    </TableCell> */}
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Lote
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Beneficiário
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Status
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Sub Status
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            Responsável
                                        </TableCell>
                                        <TableCell align="center" sx={{ color: "white" }}>
                                            NF
                                        </TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading && (
                                        <TableRow>
                                            <TableCell colSpan={8} align="center">
                                                <LinearProgress />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {fields.map((pedido, index) => (
                                        <Row key={`${pedido.nf}-${pedido.status}-${pedido._id}`} pedido={pedido} index={index} control={control} remove={remove} handleFaturar={handleFaturarIndividual} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </form>
                </Box>
            </Box>
            <Toast
                open={openToast}
                message={message}
                severity={severity}
                onClose={() => setOpenToast(false)}
            />
        </Sidebar>
    );
};

export default Faturamento;
