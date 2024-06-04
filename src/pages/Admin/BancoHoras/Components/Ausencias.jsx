import { Box, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import ModalImportarAusencias from "../Modais/ModalImportarAusencias"
import { getFaltas, getUsers } from "../../../../_services/user.service"
import { data } from "jquery"
import Title from "../../../../components/Title/Title"

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
                    mb: 2
                }}
            >
                <Title size={'medium'} >Ausências</Title>
                <Typography variant="body2" color='gray'  >
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
                            <TableCell>Setor</TableCell>
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
                                                {moment(colaborador.data).format('DD/MM/YYYY')}
                                            </TableCell>
                                            <TableCell>
                                                {colaborador.tipoAusencia}
                                            </TableCell>
                                            <TableCell>
                                                {colaborador.setor}
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