import { Box, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getBeneficiarioByName } from "../../../_services/teleEntrevistaV2.service"
import Toast from "../../../components/Toast/Toast"

// export interface Beneficiario extends Document {
//     nome: string;
//     cpf: number;
//     cpfTitular: string;
//     idade: number;
//     dataNascimento: string;
//     sexo: string;
//     telefone: string;
//     ddd: string;
//     celular: string;
// }

const Beneficiario = () => {

    const [beneficiario, setBeneficiario] = useState({
        nome: '',
        cpf: '',
        cpfTitular: '',
        idade: 0,
        dataNascimento: '',
        sexo: '',
        telefone: '',
        ddd: '',
        celular: '',
    })
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'success'
    })

    useEffect(() => {
        const calcularIdade = () => {
            const dataNascimento = new Date(beneficiario.dataNascimento)
            const hoje = new Date()
            const idade = Math.floor(Math.abs(hoje.getTime() - dataNascimento.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
            console.log(idade);
            setBeneficiario({ ...beneficiario, idade: idade })
        }

        if (new Date(beneficiario.dataNascimento) !== 'Invalid Date' && !isNaN(new Date(beneficiario.dataNascimento))) {
            calcularIdade()
        }
    }, [beneficiario.dataNascimento])

    useEffect(() => {
        const buscarBeneficiario = async () => {
            const result = await getBeneficiarioByName(beneficiario.nome.trim())
            console.log(result);
            if (result) {
                setBeneficiario(result)
                setToast({ ...toast, open: true, message: 'Beneficiário já existente', severity: 'success' })
            }
        }

        if (beneficiario.nome) {
            buscarBeneficiario()
        }
    }, [beneficiario.nome])

    return (
        <Box
            sx={{
                mt: 3,
            }}
        >
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <TextField
                        label="Nome"
                        fullWidth
                        value={beneficiario.nome}
                        onChange={(e) => setBeneficiario({ ...beneficiario, nome: e.target.value.toUpperCase() })}
                        size="small"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <TextField
                        label="CPF"
                        fullWidth
                        value={beneficiario.cpf}
                        onChange={(e) => setBeneficiario({ ...beneficiario, cpf: e.target.value })}
                        size="small"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <TextField
                        label="CPF Titular"
                        fullWidth
                        value={beneficiario.cpfTitular}
                        onChange={(e) => setBeneficiario({ ...beneficiario, cpfTitular: e.target.value })}
                        size="small"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    spacing={3}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px'
                        }}
                    >
                        <TextField
                            label="Data de Nascimento"
                            type="date"
                            value={beneficiario.dataNascimento}
                            onChange={(e) => setBeneficiario({ ...beneficiario, dataNascimento: e.target.value })}
                            size="small"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            label="Idade"
                            value={beneficiario.idade}
                            disabled
                            size="small"
                            sx={{
                                width: '100px'
                            }}
                        />
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <TextField
                        label="Telefone"
                        fullWidth
                        value={beneficiario.telefone}
                        onChange={(e) => setBeneficiario({ ...beneficiario, telefone: e.target.value })}
                        size="small"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <TextField
                        label="DDD"
                        fullWidth
                        value={beneficiario.ddd}
                        onChange={(e) => setBeneficiario({ ...beneficiario, ddd: e.target.value })}
                        size="small"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <TextField
                        label="Celular"
                        fullWidth
                        value={beneficiario.celular}
                        onChange={(e) => setBeneficiario({ ...beneficiario, celular: e.target.value })}
                        size="small"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <FormControl>
                        <FormLabel>Sexo</FormLabel>
                        <RadioGroup
                            value={beneficiario.sexo}
                            onChange={(e) => setBeneficiario({ ...beneficiario, sexo: e.target.value })}
                            row
                        >
                            <FormControlLabel control={<Radio />} label='Masculino' value={'M'} />
                            <FormControlLabel control={<Radio />} label='Feminino' value={'F'} />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast({ ...toast, open: false })}
            />
        </Box>
    )
}

export default Beneficiario  