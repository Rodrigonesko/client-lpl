import { Box, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import ModalImportarAusencias from "../Modais/ModalImportarAusencias"
import { getFaltas, getUsers } from "../../../../_services/user.service"
import { data } from "jquery"

const Ausencias = () => {

    const [colaboradores, setColaboradores] = useState([])
    // const [ausencias, setAusencias] = useState([])
    const [dataBancoHoras, setDataBancoHoras] = useState('')
    const [flushHook, setFlushHook] = useState(false)

    const fetchData = async () => {
        const result = await getUsers()
        result.sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        result.forEach(colaborador => {
            if (colaborador.dataAusencia) {
                setDataBancoHoras(colaborador.dataAusencia)
                return
            }
        })
        const find = await getFaltas()
        setColaboradores(find)
        // setAusencias(find)
    }

    useEffect(() => {
        setFlushHook(false)
        fetchData()
    }, [flushHook])

    return (
        <>
            <Box sx={{ mt: 2, mb: 2 }}>
                <ModalImportarAusencias setFlushHook={setFlushHook} />
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
                    Ausências
                </Typography>
                <Typography variant="body2" color='gray' m={2} >
                    Atualizado dia - {dataBancoHoras ? moment(dataBancoHoras).format('DD/MM/YYYY') : ''}
                </Typography>
            </Box>
            <Box>
                <Table className='ausencias'>
                    <TableHead className="table-header">
                        <TableRow>
                            <TableCell>Colaborador</TableCell>
                            <TableCell>Data Ausência</TableCell>
                            <TableCell>Tipo de Ausência</TableCell> 
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            colaboradores.map((colaborador) => {
                                if ((colaborador.nome) && (colaborador.inativo !== true)) {
                                    return (
                                        <TableRow key={colaborador.nome}>
                                            <TableCell>
                                                {colaborador.nome}
                                            </TableCell>
                                            <TableCell>
                                                {colaborador.data}
                                            </TableCell>
                                            <TableCell>
                                                {colaborador.tipoAusencia}
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
            </Box>
        </>
    )
}
export default Ausencias