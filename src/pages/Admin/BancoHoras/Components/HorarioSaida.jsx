import { Box, Divider, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import moment from "moment"
import { getUsers } from "../../../../_services/user.service"
import ModalUploadBancoHoras from "../Modais/ModalUpload"
import ModalHorarioPonto from "../Modais/ModalHorarioPonto"
import Title from "../../../../components/Title/Title"

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
                    mb: 2
                }}
            >
                <Title size={'medium'} >Controle Saída</Title>
                <Typography variant="body2" color='gray' >
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