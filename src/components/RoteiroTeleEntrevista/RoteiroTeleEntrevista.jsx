import { Box, FormControl, FormControlLabel, InputLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React from "react";

const RoteiroTeleEntrevista = () => {
    return (
        <Box>
            <Typography>
                Hoje é dia xx/xx/xxxx e informamos que esta ligação será gravada e arquivada. Suas respostas devem ser exatas e verdadeiras àquelas perguntas formuladas. A omissão ou falta de veracidade pode acarretar à perda de prestação ou rescisão do contrato. As informações fornecidas serão incorporadas ao seu dossiê e tratadas de forma confidencial.
            </Typography>
            <Typography>
                O/A Sr(a) nos autoriza a tratar seus/de seu filho(a) dados pessoais, inclusive os dados de saúde, e dessa forma realizar o questionário de saúde?
            </Typography>
            <Typography>
                Qual seu gênero?
            </Typography>
            <RadioGroup>
                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                <FormControlLabel value="Outro" control={<Radio />} label="Outro" />
            </RadioGroup>
            <Typography>
                Em caso de divergência entre o gênero e o sexo, ler o parágrafo abaixo para cientificar o beneficiário:
            </Typography>
            <Typography>
                "Para fins de esclarecimento, o questionamento do gênero ocorre por questões clínicas relacionadas a sua saúde, para garantir sua segurança, o atendimento adequado e a correspondente autorização de exames."
            </Typography>
            <Typography>
                O(A) Sr.(a) fez algum procedimento cirúrgico de transexualização?
            </Typography>
            <RadioGroup
                row
            >
                <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="Não" control={<Radio />} label="Não" />
            </RadioGroup>
            <Typography>
                As perguntas realizadas neste questionário são estritamente técnicas e entendemos que algumas perguntas podem não se adequar a sua situação, fique à vontade de nos corrigir caso a pergunta não se adeque.
            </Typography>
        </Box>
    )
}

export default RoteiroTeleEntrevista