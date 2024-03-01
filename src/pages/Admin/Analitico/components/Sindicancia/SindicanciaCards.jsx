import { TrendingDown, TrendingUp } from "@mui/icons-material"
import { Box, Paper, Typography } from "@mui/material"
import { green, red } from "@mui/material/colors"

const SindicanciaCards = ({ mes }) => {
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
                        0
                    </Typography>
                    <Box>
                        <Typography
                            variant="body1"
                            color={red[500]}
                            display={"flex"}
                            alignItems={"flex-end"}
                        >
                            <TrendingDown />
                            -20%
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