import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar'
import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import ListaTreinamentos from './ListaTreinamentos';
import ControleTreinamentos from './ControleTreinamentos';

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Treinamentos = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Sidebar />
            <Container>
                <Typography mt={2} variant='h5'>
                    Controle de Treinamentos
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab sx={{ ":hover": { bgcolor: '#f5f5f5', color: 'black' } }} label="Treinamentos" {...a11yProps(0)} />
                        <Tab sx={{ ":hover": { bgcolor: '#f5f5f5', color: 'black' } }} label="Controle" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ListaTreinamentos />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ControleTreinamentos />
                </CustomTabPanel>
            </Container>
        </>
    )
}

export default Treinamentos