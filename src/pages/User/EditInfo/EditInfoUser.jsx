import Sidebar from "../../../components/Sidebar/Sidebar"
import { Container, Typography, Divider, Box, Paper, TextField, Button } from "@mui/material"

const EditInfoUser = () => {
    return (
        <>
            <Sidebar />
            <Container>
                <Box component={Paper} p={1} mt={2} bgcolor='#f5f5f5'>
                    <Typography mb={1} variant="h5">
                        Editar Informações
                    </Typography>
                    <Divider />
                    <Box m={1} display='flex' justifyContent='space-around' height='300px'>
                        <Box display='flex' flexDirection='column' justifyContent='space-around'>
                            <TextField />
                            <TextField />
                            <TextField />
                            <TextField />
                        </Box>
                        <Box display='flex' flexDirection='column' justifyContent='space-around'>
                            <TextField />
                            <TextField />
                            <TextField />
                            <TextField />
                        </Box>
                    </Box>
                    <Divider />
                    <Box m={1}>
                        <Button variant="contained">Salvar</Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default EditInfoUser