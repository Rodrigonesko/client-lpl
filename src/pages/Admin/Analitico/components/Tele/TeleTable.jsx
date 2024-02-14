
// Dependencias
import React, { forwardRef } from 'react';
import { AppBar, Box, Chip, CircularProgress, Dialog, FormControlLabel, LinearProgress, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, Toolbar, Typography, Container } from '@mui/material';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useState } from 'react';
import { useEffect } from 'react';
import { quantidadeAnalistasPorMes } from '../../../../../_services/teleEntrevista.service';
import { blue, green, grey, red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import ProducaoIndividualTele from '../../../../../components/ProducaoIndividual/ProduçãoIndividualTele/ProducaoIndividualTele';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const TeleTable = ({ mes }) => {

    const [tableData, setTableData] = useState([])
    const [loadingTabela, setLoadingTabela] = useState(false)
    const [media, setMedia] = useState(0)
    const [mediaDiasTrabalhados, setMediaDiasTrabalhados] = useState(0)
    const [mediaTotal, setMediaTotal] = useState(0)
    const [dense, setDense] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [analistaSelecionado, setAnalistaSelecionado] = useState('')

    const fetchDataAnalistas = async () => {
        setLoadingTabela(true)
        try {
            const result = await quantidadeAnalistasPorMes(mes)
            console.log(result);
            setTableData(result.result)
            setMedia(result.media)
            setMediaDiasTrabalhados(result.mediaDiasTrabalhados)
            setMediaTotal(result.mediaTotal)

            setLoadingTabela(false)
        } catch (error) {
            console.log(error)
            setLoadingTabela(false)
        }
    }

    useEffect(() => {
        fetchDataAnalistas()
    }, [])

    return (
        <Box>
            {
                loadingTabela ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer
                        sx={{
                            mt: 2,
                        }}
                    >
                        <Box
                            mb={2}
                        >
                            <FormControlLabel control={<Switch
                                checked={dense}
                                onChange={(e) => setDense(e.target.checked)}
                            />} label="Dense" />
                        </Box>
                        <Box
                            sx={{
                                mb: 1,
                            }}
                        >
                            <Typography variant="h6" sx={{
                                mt: 2,
                                mb: 1,
                            }}>
                                Média Analistas
                            </Typography>
                            <Chip
                                label={`Média: ${media?.toFixed(2)}`}
                                sx={{
                                    backgroundColor: blue[100],
                                    color: blue[800],
                                    fontWeight: 'bold'
                                }}
                            />
                            <Chip
                                label={`Média Dias Trabalhados: ${mediaDiasTrabalhados?.toFixed(2)}`}
                                sx={{
                                    backgroundColor: blue[100],
                                    color: blue[800],
                                    fontWeight: 'bold'
                                }}
                            />
                            <Chip
                                label={`Média Total: ${mediaTotal?.toFixed(2)}`}
                                sx={{
                                    backgroundColor: blue[100],
                                    color: blue[800],
                                    fontWeight: 'bold'
                                }}
                            />


                        </Box>
                        <Table
                            sx={{
                                minWidth: 650,
                            }}
                            size={dense ? 'small' : 'medium'}
                        >
                            <TableHead>
                                <TableRow
                                    sx={{
                                        backgroundColor: '#F5F5F5',
                                    }}
                                >
                                    <TableCell
                                        sx={{
                                            width: 50,
                                        }}
                                    >
                                    </TableCell>
                                    <TableCell>
                                        Nome
                                    </TableCell>
                                    <TableCell>
                                        Quantidade
                                    </TableCell>
                                    <TableCell>
                                        Média/Dia util
                                    </TableCell>
                                    <TableCell>
                                        Média/Dia trabalhado
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableData.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                sx={{
                                                    width: 50,
                                                }}
                                            >
                                                <Avatar
                                                    alt={item.analista}
                                                    src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${item.analista.split(' ').join('%20')}.jpg`}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {item.analista}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {item.total >= mediaTotal ? (
                                                        <Chip
                                                            label={item.total}
                                                            sx={{
                                                                backgroundColor: green[100],
                                                                color: green[800],
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label={item.total}
                                                            sx={{
                                                                backgroundColor: red[100],
                                                                color: red[800],
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    )}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {item.media >= media ? (
                                                        <Chip
                                                            label={item.media?.toFixed(2)}
                                                            sx={{
                                                                backgroundColor: green[100],
                                                                color: green[800],
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label={item.media?.toFixed(2)}
                                                            sx={{
                                                                backgroundColor: red[100],
                                                                color: red[800],
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    )}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {item.mediaDiasTrabalhados >= mediaDiasTrabalhados ? (
                                                        <Chip
                                                            label={item.mediaDiasTrabalhados?.toFixed(2)}
                                                            sx={{
                                                                backgroundColor: green[100],
                                                                color: green[800],
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label={item.mediaDiasTrabalhados?.toFixed(2)}
                                                            sx={{
                                                                backgroundColor: red[100],
                                                                color: red[800],
                                                                fontWeight: 'bold'
                                                            }}
                                                        />
                                                    )
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Detalhes">
                                                    <IconButton
                                                        onClick={() => {
                                                            // handleClickOpen(user);
                                                            setAnalistaSelecionado(item.analista)
                                                            setOpenDialog(true)
                                                        }}
                                                    >
                                                        <AnalyticsIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            <Dialog
                fullScreen
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar
                        sx={{
                            bgcolor: grey[500]
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpenDialog(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Produção - {analistaSelecionado}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <ProducaoIndividualTele
                        analista={analistaSelecionado}
                        mes={mes}
                        key={analistaSelecionado}
                    />
                </Container>
            </Dialog>
        </Box>
    )
}

export default TeleTable;