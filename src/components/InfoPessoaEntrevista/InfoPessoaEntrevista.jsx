import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const InfoPessoaEntrevista = ({ pessoa }) => {
    return (
        <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={2}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: grey[700],
                        fontWeight: 'bold'
                    }}
                >
                    Nome
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: grey[900],
                        fontWeight: 'bold'
                    }}
                >
                    {pessoa?.nome}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: grey[700],
                        fontWeight: 'bold'
                    }}
                >
                    Sexo
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: grey[900],
                        fontWeight: 'bold'
                    }}
                >
                    {pessoa?.sexo}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: grey[700],
                        fontWeight: 'bold'
                    }}
                >
                    CPF
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: grey[900],
                        fontWeight: 'bold'
                    }}
                >
                    {pessoa?.cpf}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: grey[700],
                        fontWeight: 'bold'
                    }}
                >
                    Proposta
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: grey[900],
                        fontWeight: 'bold'
                    }}
                >
                    {pessoa?.proposta}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: grey[700],
                        fontWeight: 'bold'
                    }}
                >
                    Telefone
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: grey[900],
                        fontWeight: 'bold'
                    }}
                >
                    {pessoa?.telefone}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        color: grey[700],
                        fontWeight: 'bold'
                    }}
                >
                    Data Nascimento
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        color: grey[900],
                        fontWeight: 'bold'
                    }}
                >
                    {pessoa?.dataNascimento}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default InfoPessoaEntrevista