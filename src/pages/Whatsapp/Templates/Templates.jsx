import { Box } from "@mui/system"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { deleteTemplate, getTemplates } from "../../../_services/whatsapp.service"
import ModalCreateTemplates from "./ModalCreateTemplate"
import ModalComponent from "../../../components/ModalComponent/ModalComponent"
import { Delete } from "@mui/icons-material"
import { red } from "@mui/material/colors"
import ModalNumeros from "./ModalNumeros"

const Templates = () => {

    const [templates, setTemplates] = useState([])
    const [flushHook, setFlushHook] = useState(false)

    const handleDelteTemplate = async (id) => {
        await deleteTemplate(id)
        setFlushHook(prev => !prev)
    }

    useEffect(() => {
        const fetch = async () => {
            const result = await getTemplates()
            setTemplates(result)
        }

        fetch()
    }, [flushHook])

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
                <ModalCreateTemplates
                    setFlushHook={setFlushHook}
                />
                <ModalNumeros />
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
                                <TableRow
                                    key={template._id}
                                >
                                    <TableCell>
                                        {template.name}
                                    </TableCell>
                                    <TableCell>
                                        {template.message}
                                    </TableCell>
                                    <TableCell>
                                        <ModalComponent
                                            isButton
                                            buttonIcon={<Delete />}
                                            buttonText="Excluir"
                                            buttonColorScheme="error"
                                            headerText="Excluir"
                                            saveButtonColorScheme={red[500]}
                                            onAction={() => handleDelteTemplate(template._id)}
                                        >
                                            Deseja excluir o template {template.name}?
                                        </ModalComponent>
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