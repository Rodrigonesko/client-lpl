import { Box, Button, CircularProgress, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { estatisticasAutoAgendamento } from "../../../../_services/teleEntrevistaExterna.service";
import { SimCardDownload } from "@mui/icons-material";
import Toast from "../../../../components/Toast/Toast"

const Estatisticas = () => {

    const [filterText, setFilterText] = useState('titular unico')
    const [de, setDe] = useState('')
    const [ate, setAte] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        total: 0,
        agendados: 0,
        semResposta: 0,
        naoAgendadas: 0,
        propostas: []
    })
    const [toast, setToast] = useState({ open: false, severity: 'success', message: '' })

    const handleFilter = async () => {
        setLoading(true)
        try {
            const result = await estatisticasAutoAgendamento({ de, ate, filterText })
            setData(result)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    const handleExport = () => {

        if (data.propostas.length === 0) {
            setToast({ open: true, severity: 'error', message: 'Nenhum dado para exportar' })
            return
        }

        let xls = '\ufeff'
        xls += "<table border='1'>"
        xls += "<thead><tr>"
        xls += "<th>Data Recebimento</th>"
        xls += "<th>Proposta</th>"
        xls += "<th>Nome</th>"
        xls += "<th>Cpf</th>"
        xls += "<th>Idade</th>"
        xls += "<th>Sexo</th>"
        xls += "<th>Tipo Contrato</th>"
        xls += "<th>Tipo Associado</th>"
        xls += "<th>Agendado</th>"
        xls += "<th>Status Whatsapp</th>"
        xls += "</tr>"
        xls += "</thead>"
        xls += "<tbody>"
        data.propostas.forEach(e => {
            xls += "<tr>"
            xls += `<td>${e.dataRecebimento}</td>`
            xls += `<td>${e.proposta}</td>`
            xls += `<td>${e.nome}</td>`
            xls += `<td>${e.cpf || ''}</td>`
            xls += `<td>${e.idade}</td>`
            xls += `<td>${e.sexo}</td>`
            xls += `<td>${e.tipoContrato}</td>`
            xls += `<td>${e.tipoAssociado}</td>`
            xls += `<td>${e.agendado || ''}</td>`
            xls += `<td>${e.statusWhatsapp}</td>`
            xls += "</tr>"
        })

        xls += "</tbody>"
        xls += "</table>"
        var a = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        a.href = data_type + ', ' + xls.replace(/ /g, '%20');
        a.download = `Relatorio de estatisticas.xls`
        a.click()
    }

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await estatisticasAutoAgendamento({ de, ate, filterText })
                setData(result)
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        }

        fetchData()

    }, [filterText])

    return (
        <>
            <Box display={'flex'} mb={2}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '30%',
                            height: '2px',
                            bottom: 0,
                            left: '0%',
                            backgroundColor: 'currentColor',
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Estatísticas
                </Typography>
            </Box>
            <Box
                mb={2}
            >
                <Typography
                    variant="body2"
                    color="gray"
                    sx={{
                        mb: 1
                    }}
                >
                    Selecione o período
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <TextField
                        type="date"
                        size="small"
                        sx={{
                            mr: 1

                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="De"
                        value={de}
                        onChange={(e) => setDe(e.target.value)}
                    />
                    <TextField
                        type="date"
                        size="small"
                        sx={{
                            mr: 1,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Até"
                        value={ate}
                        onChange={(e) => setAte(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            height: 40,
                            bgcolor: 'black',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'black',
                                opacity: 0.8
                            }
                        }}
                        disabled={loading}
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        onClick={handleFilter}
                    >
                        Filtrar
                    </Button>
                    <Tooltip title="Exportar para Excel">
                        <Button
                            variant="contained"
                            sx={{
                                height: 40,
                                bgcolor: green[500],
                                color: 'white',
                                '&:hover': {
                                    bgcolor: green[700],
                                    opacity: 0.8
                                },
                                ml: 2
                            }}
                            disabled={loading}
                            onClick={handleExport}
                        >
                            <SimCardDownload />
                        </Button>
                    </Tooltip>
                </Box>
                <Divider sx={{
                    m: 2
                }} />
                <FormControl>
                    <FormLabel>
                        Filtrar por:
                    </FormLabel>
                    <RadioGroup
                        row
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    >
                        <FormControlLabel
                            value="titular unico"
                            control={<Radio />}
                            label="Titular único"
                        />
                        <FormControlLabel
                            value="titular unico com dependente menor de 8 anos"
                            control={<Radio />}
                            label="Dependentes menor de 8 anos"
                        />
                        <FormControlLabel
                            value="titular com depente maior de 18 anos"
                            control={<Radio />}
                            label="Depentes maiores de 18 anos"
                        />
                        <FormControlLabel
                            value="titular com dependente maior de 18 anos e menor de 9 anos"
                            control={<Radio />}
                            label="Maior de 18 e menor de 8 anos"
                        />
                        <FormControlLabel
                            value="titular com dependente maior de 9 anos e menor de 17 anos"
                            control={<Radio />}
                            label="9 a 17 anos"
                        />
                        <FormControlLabel
                            value="todas"
                            control={<Radio />}
                            label="Todas"
                        />
                    </RadioGroup>
                </FormControl>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 2
                        }}
                    >
                        Resultados
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Box
                            bgcolor={blue[100]}
                            width="300px"
                            p={2}
                            borderRadius={2}
                        >
                            <Typography
                                variant="body2"
                                color={blue[800]}
                            >
                                Enviadas
                            </Typography>
                            <Typography
                                variant="h4"
                                color={blue[800]}
                            >
                                {data.total} | 100%
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={green[100]}
                            width="300px"
                            p={2}
                            borderRadius={2}
                        >
                            <Typography
                                variant="body2"
                                color={green[800]}
                            >
                                Agendadas
                            </Typography>
                            <Typography
                                variant="h4"
                                color={green[800]}
                            >
                                {data.agendados} | {((data.agendados / data.total) * 100).toFixed(0)}%
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={red[100]}
                            width="300px"
                            p={2}
                            borderRadius={2}
                        >
                            <Typography
                                variant="body2"
                                color={red[800]}
                            >
                                Não respondidas
                            </Typography>
                            <Typography
                                variant="h4"
                                color={red[800]}
                            >
                                {data.semResposta} | {((data.semResposta / data.total) * 100).toFixed(0)}%
                            </Typography>
                        </Box>
                        <Box
                            bgcolor={yellow[100]}
                            width="300px"
                            p={2}
                            borderRadius={2}
                        >
                            <Typography
                                variant="body2"
                                color={yellow[800]}
                            >
                                Respondidas não agendadas
                            </Typography>
                            <Typography
                                variant="h4"
                                color={yellow[800]}
                            >
                                {data.naoAgendadas} | {((data.naoAgendadas / data.total) * 100).toFixed(0)}%
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Toast
                    open={toast.open}
                    severity={toast.severity}
                    message={toast.message}
                    onClose={() => setToast({ ...toast, open: false })}
                />
            </Box>
        </>
    );
}

export default Estatisticas;