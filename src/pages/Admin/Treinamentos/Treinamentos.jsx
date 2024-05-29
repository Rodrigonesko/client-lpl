import Sidebar from '../../../components/Sidebar/Sidebar'
import { Container } from '@mui/material'
import ListaTreinamentos from './ListaTreinamentos';
import Title from '../../../components/Title/Title';

const Treinamentos = () => {
    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} >Controle de Treinamentos</Title>
                    <ListaTreinamentos />
                </Container>
            </Sidebar>
        </>
    )
}

export default Treinamentos