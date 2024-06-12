import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material"
import Title from "../../../components/Title/Title"
import InfosBeneficiario from "./InfosBeneficiario"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useState } from "react";
import { updateSegurado, updateTitular } from "../../../_services/rsdBradesco.service";
import { indigo, red } from "@mui/material/colors";

const SeguradoComponent = ({ segurado }) => {

    const [open, setOpen] = useState(false);

    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
        >
            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Typography
                    variant={'body1'}
                    sx={{
                        color: indigo[900],
                        fontWeight: 'bold',
                        bgcolor: indigo[100],
                        p: 1,
                        borderRadius: '5px'
                    }}
                >
                    {segurado?.nome}
                </Typography>
                <Box>
                    <IconButton
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <ArrowDropUp /> : <ArrowDropDown />}
                    </IconButton>
                </Box>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <InfosBeneficiario
                    info={segurado}
                    updateInfo={updateSegurado}
                    key={segurado?._id}
                />
            </Collapse>
        </Box>
    )
}

const Ficha = ({
    titular,
    segurados
}) => {
    return (
        <Box>
            <Title
                size={'small'}
                fontColor={indigo[900]}
                lineColor={red[700]}
            >
                Titular
            </Title>
            <InfosBeneficiario
                info={titular}
                updateInfo={updateTitular}
                key={titular?._id}
            />
            <Divider sx={{ mt: 2 }} />
            <Title
                size={'small'}
                fontColor={indigo[900]}
                lineColor={red[700]}
            >
                Segurados
            </Title>
            <Box>
                {
                    segurados.map((segurado) => (
                        <Box>
                            <SeguradoComponent
                                key={segurado._id}
                                segurado={segurado}
                            />
                            <Divider sx={{ m: 1 }} />
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Ficha