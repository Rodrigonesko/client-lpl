import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import FiltroEmAnalise from "./Components/EmAnalise/FiltroEmAnalise";
import FiltroAgendadas from "./Components/Agendadas/FiltroAgendadas";
import Realizadas from "./Components/Realizadas/Realizadas";
import Anexos from "./Components/Anexos/Anexos";
import Implantacao from "./Components/Implantacao/Implantacao";

const tabStyle = {
    ":hover": {
        bgcolor: 'lightgray',
        color: 'black'
    },
    '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    Indicator: {
        backgroundColor: 'black',
    },
}

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

    const initialValue = localStorage.getItem('tabValue') ? parseInt(localStorage.getItem('tabValue')) : 0
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('tabValue', newValue)
    }

    return (
        <>
            <Sidebar>
                <Box sx={{ width: '100%', m: 1 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs sx={{ m: 2 }} value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab sx={tabStyle} label="Pendencias" {...a11yProps(0)} />
                            <Tab sx={tabStyle} label="Agendadas" {...a11yProps(1)} />
                            <Tab sx={tabStyle} label="Realizadas" {...a11yProps(1)} />
                            {/* <Tab sx={tabStyle} label="Anexos" {...a11yProps(1)} />
                            <Tab sx={tabStyle} label="Implantação" {...a11yProps(1)} /> */}
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <FiltroEmAnalise />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <FiltroAgendadas />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Realizadas />
                    </CustomTabPanel>
                    {/* <CustomTabPanel value={value} index={3}>
                        <Anexos />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <Implantacao />
                    </CustomTabPanel> */}
                </Box>
            </Sidebar>
        </>
    )
}

export default ProtFiltros;