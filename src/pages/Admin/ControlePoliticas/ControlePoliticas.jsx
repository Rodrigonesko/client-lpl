import Sidebar from '../../../components/Sidebar/Sidebar'
import { Box, Container, Typography, Divider } from '@mui/material'
import ModalAdicionarPolitica from './Modals/ModalAdicionarPolitica'

const ControlePoliticas = () => {
    return (
        <>
            <Sidebar />
            <Box width='100%' height='100vh' overflow='auto'>
                <Container>
                    <Typography m={2} variant='h6'>
                        Controle e Gestão de Políticas
                    </Typography>
                    <Divider />
                    <Box mt={1}>
                        <ModalAdicionarPolitica />
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ControlePoliticas