import { Box, Divider } from "@mui/material"
import ModalCriarQuestionarios from "../Modais/ModalCriarQuestionario"

const Questionario = () => {
    return (
        <>
            <ModalCriarQuestionarios />
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    mb: 2
                }}
            >

            </Box>
        </>
    )
}

export default Questionario