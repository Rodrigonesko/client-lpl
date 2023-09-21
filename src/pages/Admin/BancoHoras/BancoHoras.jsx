import { Box, Container, Divider } from "@mui/material"
import Sidebar from "../../../components/Sidebar/Sidebar"
import ModalUploadBancoHoras from "./ModalUpload"

const BancoHoras = () => {
    return (
        <>
            <Sidebar />
            <Container>
                <Box m={2}>
                    <ModalUploadBancoHoras />
                </Box>
                <Divider />
            </Container>
        </>
    )
}

export default BancoHoras