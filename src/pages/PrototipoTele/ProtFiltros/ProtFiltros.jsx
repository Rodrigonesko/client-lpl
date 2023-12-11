import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import FiltroEmAnalise from "./Components/FiltroEmAnalise";
import FiltroAgendadas from "./Components/FiltroAgendadas";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProtFiltros = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Sidebar>
                <Box sx={{ width: '100%', m: 1 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab sx={{
                                ":hover": {
                                    bgcolor: 'lightgray',
                                    color: 'black'
                                },
                            }} label="Pendencias" {...a11yProps(0)} />
                            <Tab sx={{
                                ":hover": {
                                    bgcolor: 'lightgray',
                                    color: 'black'
                                },
                            }} label="Agendadas" {...a11yProps(1)} />
                            <Tab sx={{
                                ":hover": {
                                    bgcolor: 'lightgray',
                                    color: 'black'
                                },
                            }} label="Realizadas" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <FiltroEmAnalise />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <FiltroAgendadas />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={0}>
                        Realizadas
                    </CustomTabPanel>
                </Box>
            </Sidebar>
        </>
    )
}

export default ProtFiltros;