import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from "@mui/material"
import { useContext } from "react";
import { PropostasContext } from "../context";

const status = [
    'Ajustar',
    'Não enviado',
    'Enviado',
    'Agendado',
    'Cancelado',
    'Sem Whatsapp',
    'Erro Whatsapp'
]

const tiposContrato = [
    { label: 'PME', value: 'PME Porte I' },
    { label: 'PF', value: 'PF' },
    { label: 'Adesão', value: 'Adesão' }
]

const vigencias = [
    'No prazo',
    'Fora do prazo'
]

const riscos = [
    'Baixo',
    'Médio',
    'Alto'
]

const idade = [
    'Maior que 60',
    'Menor que 60'
]

const FiltrosTeleEntrevista = () => {

    const { filtros, setFiltros } = useContext(PropostasContext);

    return (
        <>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Status
            </Typography>
            <FormGroup>
                {
                    status.map((s, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={filtros.status.includes(s)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFiltros({
                                                ...filtros,
                                                status: [...filtros.status, s]
                                            })
                                        } else {
                                            setFiltros({
                                                ...filtros,
                                                status: filtros.status.filter(f => f !== s)
                                            })
                                        }
                                    }}
                                />
                            }
                            label={s}
                        />
                    ))
                }
            </FormGroup>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Tipo de contrato
            </Typography>
            <FormControl>
                {
                    tiposContrato.map((t, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    size="small"
                                    checked={filtros.tipoContrato.includes(t.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFiltros({
                                                ...filtros,
                                                tipoContrato: t.value
                                            })
                                        } else {
                                            setFiltros({
                                                ...filtros,
                                                tipoContrato: ''
                                            })
                                        }
                                    }}
                                />
                            }
                            label={t.label}
                        />
                    ))
                }
            </FormControl>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Vigência
            </Typography>
            {
                vigencias.map((v, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                size="small"
                                checked={filtros.vigencia === v}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFiltros({
                                            ...filtros,
                                            vigencia: v
                                        })
                                    } else {
                                        setFiltros({
                                            ...filtros,
                                            vigencia: ''
                                        })
                                    }
                                }}
                            />
                        }
                        label={v}
                    />
                ))
            }
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Risco
            </Typography>
            {
                riscos.map((r, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                size="small"
                                checked={filtros.risco === r}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFiltros({
                                            ...filtros,
                                            risco: r
                                        })
                                    } else {
                                        setFiltros({
                                            ...filtros,
                                            risco: ''
                                        })
                                    }
                                }}
                            />
                        }
                        label={r}
                    />
                ))
            }
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Idade
            </Typography>
            {
                idade.map((i, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                size="small"
                                checked={filtros.idade === i}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFiltros({
                                            ...filtros,
                                            idade: i
                                        })
                                    } else {
                                        setFiltros({
                                            ...filtros,
                                            idade: ''
                                        })
                                    }
                                }}
                            />
                        }
                        label={i}
                    />
                ))
            }
        </>
    )
}

export default FiltrosTeleEntrevista