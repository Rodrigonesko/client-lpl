import { Box, Checkbox, Collapse, Divider, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import { filtros } from "./filtros";

const FiltrosAgendar = () => {

    const [openCollase, setOpenCollase] = useState(true);

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
                        bgcolor: 'lightgray',
                        p: 1,
                        m: 1,
                        borderRadius: 1
                    }}
                >
                    <Typography alignSelf={'center'}>
                        Filtros
                    </Typography>
                    {
                        Object.keys(filtros).map((item, index) => (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    bgcolor: 'lightgray',
                                    p: 1,
                                    m: 1,
                                    borderRadius: 1
                                }}
                            >
                                <Typography >
                                    {item}
                                </Typography>
                                {
                                    filtros[item].map((item, index) => (
                                        <FormControlLabel control={<Checkbox />} label={item.label} />
                                    ))
                                }
                                <Divider />
                            </Box>
                        ))
                    }
                </Box>
            </Collapse>
        </Box>
    )
}

export default FiltrosAgendar;