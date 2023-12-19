import { Box, Container } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import CardFiltros from "./Cards/CardFiltros"
import CardColaboradores from "./Cards/CardColaboradores"

const ProtAdmissionalDemissional = () => {

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Admissional / Demissional</h2>
                    </div>
                    <br />
                    <Box sx={{ display: 'flex' }}>
                        <Box display={'flex'} mt={2}>
                            <CardFiltros />
                            <Box display={'flex'} ml={2}>
                                <CardColaboradores />
                            </Box>
                        </Box>
                    </Box>
                </Container >
            </Sidebar >
        </>
    )
}

export default ProtAdmissionalDemissional