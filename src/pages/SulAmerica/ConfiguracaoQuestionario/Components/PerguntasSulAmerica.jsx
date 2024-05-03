import { Box, Divider, Typography } from "@mui/material"
import ModalCriarPergunta from "../Modais/ModalCriarPergunta"

const PerguntasSulAmerica = () => {
    return (
        <>
            <ModalCriarPergunta />
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

export default PerguntasSulAmerica