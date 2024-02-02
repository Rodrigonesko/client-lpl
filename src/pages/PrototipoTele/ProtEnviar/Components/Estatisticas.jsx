import { Box, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Estatisticas = () => {

    const [filterText, setFilterText] = useState('titular unico')
    const [de, setDe] = useState('')
    const [ate, setAte] = useState('')

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
                <Box>
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
                    <Box>
                        <Typography
                            variant="body2"
                            color="gray"
                        >
                            Enviadas
                        </Typography>
                        <Typography>
                            0
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="gray"
                        >
                            Não Respondidas
                        </Typography>
                        <Typography>
                            0
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body2"
                            color="gray"
                        >
                            Ajustar
                        </Typography>
                        <Typography>
                            0
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Estatisticas;