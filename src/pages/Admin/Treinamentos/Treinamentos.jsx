import Sidebar from '../../../components/Sidebar/Sidebar'
import { Container, Typography } from '@mui/material'
import ListaTreinamentos from './ListaTreinamentos';

const Treinamentos = () => {
    return (
        <>
            <Sidebar />
            <Container>
                <Typography mt={2} variant='h5' mb={2}>
                    Controle de Treinamentos
                </Typography>
                <ListaTreinamentos />
            </Container>
        </>
    )
}

export default Treinamentos