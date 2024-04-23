import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

const Apresentacao = () => {
    return (
        <Box
            mt={2}
            mb={2}
        >
            <Typography
                mt={2}
                mb={2}
            >
                Hoje é dia xx/xx/xxxx e informamos que esta ligação será gravada e arquivada. Suas respostas devem ser exatas e verdadeiras àquelas perguntas formuladas. A omissão ou falta de veracidade pode acarretar à perda de prestação ou rescisão do contrato. As informações fornecidas serão incorporadas ao seu dossiê e tratadas de forma confidencial.
            </Typography>
            <Typography
                mt={2}
                mb={2}
            >
                O/A Sr(a) nos autoriza a tratar seus/de seu filho(a) dados pessoais, inclusive os dados de saúde, e dessa forma realizar o questionário de saúde?
            </Typography>
            <FormControl>
                <FormLabel>
                    Gênero
                </FormLabel>
                <RadioGroup>
                    <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                    <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                    <FormControlLabel value="O" control={<Radio />} label="Outros" />
                </RadioGroup>
            </FormControl>
            <Typography
                mt={2}
                mb={2}
            >
                Em caso de divergência entre o gênero e o sexo, ler o parágrafo abaixo para cientificar o beneficiário:
            </Typography>
            <Typography
                mt={2}
                mb={2}
            >
                "Para fins de esclarecimento, o questionamento do gênero ocorre por questões clínicas relacionadas a sua saúde, para garantir sua segurança, o atendimento adequado e a correspondente autorização de exames."
            </Typography>
            <FormControl>
                <FormLabel>
                    O(A) Sr.(a) fez algum procedimento cirúrgico de transexualização?
                </FormLabel>
                <RadioGroup>
                    <FormControlLabel value="true" control={<Radio />} label="Sim" />
                    <FormControlLabel value="false" control={<Radio />} label="Não" />
                </RadioGroup>
            </FormControl>
            <Typography>
                As perguntas realizadas neste questionário são estritamente técnicas e entendemos que algumas perguntas podem não se adequar a sua situação, fique à vontade de nos corrigir caso a pergunta não se adeque.
            </Typography>
        </Box>
    )
}

export default Apresentacao;