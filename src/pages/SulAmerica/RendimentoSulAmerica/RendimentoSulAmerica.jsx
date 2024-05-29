import { Container } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import Title from "../../../components/Title/Title"
import AnaliticoSulAmerica from "../../Admin/Analitico/components/SulAmerica/AnaliticoSulAmerica"

const RendimentoSulAmerica = () => {
    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <Title size={'medium'} >Rendimento Sul América</Title>
                    <AnaliticoSulAmerica />
                </Container>
            </Sidebar>
        </>
    )
}

export default RendimentoSulAmerica