import { Box } from "@mui/system"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { getTemplates } from "../../../_services/whatsapp.service"
import ModalCreateTemplates from "./ModalCreateTemplate"

const Templates = () => {

    const [templates, setTemplates] = useState([])

    useEffect(() => {
        const fetch = async () => {
            const result = await getTemplates()
            console.log(result);
            setTemplates(result)
        }

        fetch()
    }, [])

    return (
        <Sidebar>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    m: 2,
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
                    Templates & Números
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    m: 2,
                }}
            >
                <ModalCreateTemplates />
                <Button>
                    Adicionar Número
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Mensagem
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            templates.map(template => (
                                <TableRow>
                                    <TableCell>
                                        {template.name}
                                    </TableCell>
                                    <TableCell>
                                        {template.message}
                                    </TableCell>
                                    <TableCell>
                                        <Button>
                                            Editar
                                        </Button>
                                        <Button>
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Sidebar>
    )
}

export default Templates