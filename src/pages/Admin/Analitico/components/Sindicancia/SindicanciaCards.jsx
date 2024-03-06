import { TrendingDown, TrendingUp } from "@mui/icons-material"
import { Box, CircularProgress, Paper, Typography } from "@mui/material"
import { green, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import { getQuantidadeSindicancias } from "../../../../../_services/sindicancia.service"

const SindicanciaCards = ({ mes }) => {

    const [loading, setLoading] = useState(false)
    const [totalData, setTotalData] = useState({
        find: 0,
        findMesPassado: 0,
        findConcluidas: 0,
        findConcluidasMesPassado: 0,
        findDistribuicao: 0,
        findAbertas: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getQuantidadeSindicancias(mes)
            setTotalData(result)
            // console.log(result);
            setLoading(false)
        }
        fetch()
    }, [mes])

    return (
        <Box
            display={"flex"}
            width={"100%"}
            m={2}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={2}
        >
            <Box
                component={Paper}
                width={'30%'}
                padding={2}
                minWidth={'300px'}
            >
                <Typography
                    variant="body2"
                    fontWeight={600}

                >
                    Demandas Criadas
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                >
                    <Typography
                        variant="h3"
                        fontWeight={600}
                    >
                        {!loading ? totalData.find : <CircularProgress size={20} />}
                    </Typography>
                    <Box>
                        <Typography
                            variant="body1"
                            color={totalData.findMesPassado > totalData.find ? (red[500]) : (green[500])}
                            display={"flex"}
                            alignItems={"flex-end"}
                        >
                            {
                                totalData.findMesPassado > totalData.find ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUp sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.findMesPassado > totalData.find ? (
                                    `-${((totalData.findMesPassado - totalData.find) / totalData.findMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.find - totalData.findMesPassado) / totalData.findMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Typography>
                        <Typography
                            color={"text.secondary"}
                            variant="caption"
                        >
                            Referente ao mês passado
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                component={Paper}
                width={'30%'}
                padding={2}
                minWidth={'300px'}
            >
                <Typography
                    variant="body2"
                    fontWeight={600}

                >
                    Demandas Concluídas
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                >
                    <Typography
                        variant="h3"
                        fontWeight={600}
                    >
                        {!loading ? totalData.findConcluidas : <CircularProgress size={20} />}
                    </Typography>
                    <Box>
                        <Typography
                            variant="body1"
                            color={totalData.findConcluidasMesPassado > totalData.findConcluidas ? (red[500]) : (green[500])}
                            display={"flex"}
                            alignItems={"flex-end"}
                        >
                            {
                                totalData.findConcluidasMesPassado > totalData.findConcluidas ? (
                                    <TrendingDown sx={{ color: red[800] }} />
                                ) : (
                                    <TrendingUp sx={{ color: green[800] }} />
                                )
                            }
                            {
                                totalData.findConcluidasMesPassado > totalData.findConcluidas ? (
                                    `-${((totalData.findConcluidasMesPassado - totalData.findConcluidas) / totalData.findConcluidasMesPassado * 100).toFixed(2)}%`
                                ) : (
                                    `+${((totalData.findConcluidas - totalData.findConcluidasMesPassado) / totalData.findConcluidasMesPassado * 100).toFixed(2)}%`
                                )
                            }
                        </Typography>
                        <Typography
                            color={"text.secondary"}
                            variant="caption"
                        >
                            Referente ao mês passado
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                component={Paper}
                width={'30%'}
                padding={2}
                minWidth={'300px'}
            >
                <Typography
                    variant="body2"
                    fontWeight={600}

                >
                    Demandas com Fraude
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={1}
                >
                    <Typography
                        variant="h3"
                        fontWeight={600}
                    >
                        0
                    </Typography>
                    <Box>
                        <Typography
                            variant="body1"
                            color={green[500]}
                            display={"flex"}
                            alignItems={"flex-end"}
                        >
                            <TrendingUp />
                            +20%
                        </Typography>
                        <Typography
                            color={"text.secondary"}
                            variant="caption"
                        >
                            Referente ao mês passado
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SindicanciaCards