import { Box, Checkbox, Chip, CircularProgress, Collapse, Divider, FormControlLabel, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { filtros } from "./filtros";
import { CleaningServices, Refresh } from "@mui/icons-material";
import { PropostaService } from "../../../../../_services/teleEntrevistaV2.service";
const propostaService = new PropostaService();
const FiltrosAgendar = ({ filters, setFilters }) => {

    const [openCollase, setOpenCollase] = useState(true);
    const [quantidade, setQuantidade] = useState({});
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleFilter = (filtro, itemFilter) => {
        console.log(filtro);
        
        setFilters({
            ...filters,
            [itemFilter]: filters[itemFilter].map((item) => {
                if (item.name === filtro.name) {
                    return {
                        ...item,
                        checked: !filtro.checked // Alterna o estado se for 'Sub Status', caso contrário, marca como true
                    }
                }
                if (itemFilter !== 'Sub Status') {
                    return {
                        ...item,
                        checked: false // Desmarca todos os outros itens
                    };
                }
                return item;
            })
        });
    };

    const handleCleanFilter = () => {
        setFilters(filtros);
    };

    useEffect(() => {
        const fech = async () => {
            setLoading(true);
            const res = await propostaService.quantidadePropostasPendentes();
            setQuantidade(res);
            setLoading(false);
        }
        fech();
    }, [filters, refresh]);

    return (
        <Box>
            <Collapse
                in={openCollase}
                orientation="horizontal"
                unmountOnExit
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 1,
                        m: 1,
                        borderRadius: 1
                    }}
                >
                    <Box>
                        <Tooltip title='Limpar filtros' >
                            <IconButton
                                onClick={handleCleanFilter}
                            >
                                <CleaningServices />
                            </IconButton>
                        </Tooltip>
                        {
                            loading ? (
                                <CircularProgress size={18} />
                            ) : (
                                <Tooltip title='Atualizar' >
                                    <IconButton
                                        onClick={() => setRefresh(!refresh)}
                                    >
                                        <Refresh />
                                    </IconButton>
                                </Tooltip>
                            )
                        }

                    </Box>
                    {
                        Object.keys(filters).map((itemFilter, index) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mb: 1
                                }}
                            >
                                <Divider>
                                    <Chip label={itemFilter} size="small" />
                                </Divider>
                                {
                                    filters[itemFilter].map((item, index) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox size="small" />
                                            }
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '14px' // Altere o tamanho da fonte conforme necessário
                                                }
                                            }}
                                            checked={item.checked}
                                            onChange={() => handleFilter(item, itemFilter)}
                                            label={`${item.label} (${quantidade[item.name] || 0})`}
                                        />
                                    ))
                                }

                            </Box>
                        ))
                    }
                </Box >
            </Collapse >
        </Box >
    )
}

export default FiltrosAgendar;