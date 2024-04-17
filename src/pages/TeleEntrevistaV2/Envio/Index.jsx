import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { blue, deepPurple } from '@mui/material/colors'
import NaoEnviados from './NaoEnviados'
import Ajustar from './Ajustar'
import Enviados from './Enviados'
import { getPropostaByStatus } from '../../../_services/teleEntrevistaV2.service'

const tabStyle = {
    '&:hover': {
        color: 'gray',
        opacity: 1,
        backgroundColor: '#fff',
    },
    '&.Mui-selected': {
        color: 'black',
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    Indicator: {
        backgroundColor: 'black',
    },
    color: 'gray',
    mr: 2,
}

const Envio = () => {

    const [tab, setTab] = useState(0)
    const [total, setTotal] = useState({
        naoEnviados: 0,
        ajustar: 0,
        enviados: 0,
    })

    useEffect(() => {
        const fetch = async () => {
            const result1 = await getPropostaByStatus('Não enviado', 1, 1);
            const result2 = await getPropostaByStatus('Ajustar', 1, 1);
            const result3 = await getPropostaByStatus('Enviado', 1, 1);

            setTotal({
                naoEnviados: result1.total,
                ajustar: result2.total,
                enviados: result3.total
            });
        }
        fetch();
    }, []);

    return (
        <Sidebar>
            <Box
                sx={{
                    width: '100%',
                    m: 1,
                }}
            >
                <Tabs
                    sx={{
                        mt: 2,
                        '& .MuiTabs-indicator': {
                            width: '100%',
                            backgroundColor: 'black',
                        },
                    }}
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                >
                    <Tab
                        label="Não enviados"
                        sx={tabStyle}
                        value={0}
                        icon={
                            <Typography
                                sx={{
                                    color: 'white',
                                    backgroundColor: tab === 0 ? 'black' : 'gray',
                                    borderRadius: '10%',
                                    padding: '3px',
                                    transition: 'all 0.5s ease',
                                }}
                            >
                                {total.naoEnviados}
                            </Typography>
                        }
                        iconPosition="end"
                    />
                    <Tab
                        label="Ajustar"
                        sx={tabStyle}
                        value={1}
                        icon={
                            <Typography
                                sx={{
                                    color: 'white',
                                    backgroundColor: tab === 1 ? deepPurple[500] : deepPurple[300],
                                    borderRadius: '10%',
                                    padding: '3px',
                                    transition: 'all 0.5s ease',
                                }}
                            >
                                {total.ajustar}
                            </Typography>
                        }
                        iconPosition='end'
                    />
                    <Tab
                        label="Enviados"
                        sx={tabStyle}
                        value={2}
                        icon={
                            <Typography
                                sx={{
                                    color: 'white',
                                    backgroundColor: tab === 2 ? blue[500] : blue[300],
                                    borderRadius: '10%',
                                    padding: '3px',
                                    transition: 'all 0.5s ease',
                                }}
                            >
                                {total.enviados}
                            </Typography>
                        }
                        iconPosition='end'
                    />
                </Tabs>
                {tab === 0 && <NaoEnviados />}
                {tab === 1 && <Ajustar />}
                {tab === 2 && <Enviados />}
            </Box>
        </Sidebar>
    )
}

export default Envio