import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Box, Typography, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { getByIdTreinamentos } from "../../../../_services/treinamento.service";

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


const ModalDetalhesTreinamento = ({ nome, id }) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0);
    const [realizados, setRealizdos] = useState([])
    const [naoRealizados, setNaoRealizados] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
        fetchData()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchData = async () => {
        const result = await getByIdTreinamentos(id)
        console.log(result);
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} size="small">Detalhes</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Treinamento: X"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab sx={{ ":hover": { bgcolor: '#f5f5f5', color: 'black' } }} label="Quem fez" {...a11yProps(0)} />
                            <Tab sx={{ ":hover": { bgcolor: '#f5f5f5', color: 'black' } }} label="Falta fazer" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        {
                            realizados.map(item => {
                                return (
                                    <>
                                    </>
                                )
                            })
                        }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {
                            naoRealizados.map(item => {
                                return (
                                    <>
                                    </>
                                )
                            })
                        }
                    </CustomTabPanel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default ModalDetalhesTreinamento