import { Box, Divider, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import moment from "moment"
import { getUsers } from "../../../../_services/user.service"
import ModalUploadBancoHoras from "../Modais/ModalUpload"
import ModalHorarioPonto from "../Modais/ModalHorarioPonto"

const HorarioSaida = () => {

    const [colaboradores, setColaboradores] = useState([])
    const [ausencia, setAusencias] = useState([])
    const [flushHook, setFlushHook] = useState(false)
    const [dataBancoHoras, setDataBancoHoras] = useState('')

    const fetchData = async () => {
        const result = await getUsers()
        result.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        result.forEach(colaborador => {
            if (colaborador.dataBancoHoras) {
                setDataBancoHoras(colaborador.dataBancoHoras)
                return
            }
        })
        setColaboradores(result)
        setAusencias()
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    return (
        <>
            <Box mt={2} mb={2}>
                <ModalUploadBancoHoras setFlushHook={setFlushHook} />
                <ModalHorarioPonto setFlushHook={setFlushHook} />
            </Box>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 2
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '30%',
                            height: '2px',
                            bottom: 0,
                            left: '0%',
                            backgroundColor: 'currentColor',
                            transition: 'width 0.3s ease-in-out, left 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                            width: '100%',
                            left: '0%',
                        },
                    }}
                >
                    Controle Saída
                </Typography>
                <Typography variant="body2" color='gray' m={2} >
                    Atualizado dia - {dataBancoHoras ? moment(dataBancoHoras).format('DD/MM/YYYY') : ''}
                </Typography>
            </Box>
            <Box>
                <TableContainer>
                    <Table className="name">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell>
                                    Colaborador
                                </TableCell>
                                <TableCell>
                                    Banco De Horas
                                </TableCell>
                                <TableCell>
                                    Horario Saida
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                colaboradores.map(colaborador => {
                                    if ((colaborador.nomeCompleto) && (colaborador.inativo !== true)) {
                                        return (
                                            <TableRow key={colaborador.nomeCompleto}>
                                                <TableCell>
                                                    {colaborador.nomeCompleto}
                                                </TableCell>
                                                <TableCell>
                                                    {colaborador.bancoHoras}
                                                </TableCell>
                                                <TableCell>
                                                    {colaborador.horarioSaida && moment(colaborador.horarioSaida).format('DD/MM/YYYY HH:mm')}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box >
        </>
    )
}

export default HorarioSaida