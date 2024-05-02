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
                    Perguntas
                </Typography>
            </Box>
        </>
    )
}

export default PerguntasSulAmerica