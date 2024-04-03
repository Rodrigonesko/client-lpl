import { Box } from "@mui/material"
import ModalCriarQuestionarios from "./ModalCriarQuestionarios"
import ModalAlterarQuestionario from "./ModalAlterarQuestionario"

const Questionarios = () => {
    return (
        <Box>
            <Box
                sx={{
                    m: 2
                }}
            >
                <ModalCriarQuestionarios />
            </Box>
            Questionarios
        </Box>
    )
}

export default Questionarios