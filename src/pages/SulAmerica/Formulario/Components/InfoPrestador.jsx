import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Box, CircularProgress, Collapse, IconButton, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";

const InfoPrestador = ({ prestador, loading }) => {

    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h6"
                >
                    Infomações Prestador
                </Typography>
                <IconButton
                    onClick={handleClick}
                >
                    {
                        !open ? <ArrowDropDown /> : <ArrowDropUp />
                    }
                </IconButton>
            </Box>
            <Collapse in={open}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mt: 1
                    }}
                >

                    {!loading ? <>
                        <Typography>
                            Nome: {prestador?.nome}
                        </Typography>
                        <Typography>
                            CNPJ: {prestador?.cnpj}
                        </Typography>
                        <Typography>
                            Estado: {prestador?.uf}
                        </Typography>
                        <Typography>
                            Cidade: {prestador?.municipio}
                        </Typography>
                    </> : <CircularProgress sx={{
                            color: deepOrange[500],
                            alignSelf: 'center'
                        }} />}

                </Box>
            </Collapse>
        </Box>
    )
}

export default InfoPrestador;