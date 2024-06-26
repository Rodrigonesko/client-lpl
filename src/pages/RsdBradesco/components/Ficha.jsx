import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material"
import Title from "../../../components/Title/Title"
import InfosBeneficiario from "./InfosBeneficiario"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { useState } from "react";
import { updateSegurado, updateTitular } from "../../../_services/rsdBradesco.service";
import { grey, indigo, red } from "@mui/material/colors";

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
                    variant={'h6'}
                    sx={{
                        color: indigo[900],
                        fontWeight: 'bold'
                    }}

                >
                    {segurado?.nome} {segurado?.menorIdade && <><span style={{
                        fontWeight: 'normal',
                        backgroundColor: indigo[100],
                        padding: '2px',
                        borderRadius: '4px'
                    }} >MENOR DE IDADE</span></>}
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
            <Divider sx={{ mr: 1, ml: 1 }} />
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
                    segurados.map((segurado, index) => (
                        <Box key={index}>
                            <SeguradoComponent
                                key={segurado._id}
                                segurado={segurado}
                            />
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default Ficha