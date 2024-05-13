import { Box, Divider, TextField, Typography } from "@mui/material";
import { tiposPergunta } from "../../ConfiguracaoQuestionario/utils/tiposPergunta";

const questionTypes = tiposPergunta.reduce((obj, tipo) => {
    obj[tipo.toLowerCase()] = tipo.toLowerCase();
    return obj;
}, {});

const Pergunta = ({ pergunta, index, resposta }) => {

    const renderQuestion = (question) => {
        switch (question.tipo.toLowerCase()) {
            case questionTypes.escolha:
                return (
                    <>

                    </>
                )
            default:
                return 'Tipo de pergunta não encontrado'
        }
    }

    return (
        <Box>
            <Typography>
                <strong>{index + 1}.</strong> {pergunta.pergunta}
            </Typography>
            <TextField
                fullWidth
                placeholder="Resposta"
                value={resposta?.resposta}
                size="small"
            />
            <Divider sx={{ m: 2 }} />
        </Box>
    )
}

export default Pergunta