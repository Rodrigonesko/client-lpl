import React, { useState, useEffect } from 'react'
import { Box, Paper, TextField, Typography, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, MenuItem, Select, InputLabel, Button } from '@mui/material'
import Axios from 'axios'

const ProcessamentoElegibilidade = ({
    proposta
}) => {

    const [prcs, setPrcs] = useState([])
    const [dadosAnalise, setDadosAnalise] = useState({
        sisAmilDeacordo: proposta.sisAmilDeacordo,
        contrato: proposta.contrato,
        prc: proposta.prc,
        planoAnterior: proposta.planoAnterior,
        ligacao: proposta.ligacao,
        site: proposta.site,
        documentoIdentificacao: proposta.documentoIdentificacao,
        declaracaoAssociado: proposta.declaracaoAssociado,
        vinculadosSimNao: proposta.vinculadosSimNao,
        vinculados: proposta.vinculados,
        planoAmil: proposta.planoAmil,
        dataInicioPlanoAmil: proposta.dataInicioPlanoAmil,
        dataFimPlanoAmil: proposta.dataFimPlanoAmil,
        custoPlanoAmil: proposta.custoPlanoAmil
    })

    const buscaPrcs = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/prc`, {
                withCredentials: true
            })

            setPrcs(result.data.prc)

        } catch (error) {
            console.log(error);
        }
    }

    const salvar = async () => {
        try {

            console.log(dadosAnalise);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscaPrcs()
    }, [])

    return (
        <Box component={Paper} elevation={3} p={2} mt={1}>
            <Typography variant='h6'>
                Análise
            </Typography>
            <Box display='flex' justifyContent='space-between'>
                <Box display='flex' flexDirection='column' width='48%'>
                    <FormControlLabel onChange={(e) => {
                        if (e.target.checked) {
                            setDadosAnalise({ ...dadosAnalise, sisAmilDeacordo: true })
                        } else {
                            setDadosAnalise({ ...dadosAnalise, sisAmilDeacordo: false })
                        }
                    }} control={<Checkbox checked={dadosAnalise.sisAmilDeacordo} value={true} />} label="Sisamil de Acordo com a Proposta?" />
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Contrato</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={dadosAnalise.contrato}
                            onChange={e => {
                                setDadosAnalise({ ...dadosAnalise, contrato: e.target.value })
                            }}
                        >
                            <FormControlLabel value="600" control={<Radio />} label="600" />
                            <FormControlLabel value="118" control={<Radio />} label="118" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl style={{ minWidth: '100px' }} size='small'>
                        <InputLabel id="demo-simple-select-label">PRC</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="PRC"
                            value={dadosAnalise.prc}
                            onChange={e => {
                                setDadosAnalise({ ...dadosAnalise, prc: e.target.value })
                            }}
                        >
                            <MenuItem>
                                <em>PRC</em>
                            </MenuItem>
                            {
                                prcs.map(prc => {
                                    return (
                                        <MenuItem value={prc.descricao} >{prc.descricao}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControlLabel onChange={e => {
                        setDadosAnalise({ ...dadosAnalise, planoAnterior: e.target.checked ? true : false })
                    }} control={<Checkbox defaultChecked={dadosAnalise.planoAnterior} />} label="Plano Anterior?" />
                    <FormControl>
                        <FormLabel>Comprovação Documento</FormLabel>
                        <FormControlLabel onChange={e => {
                            setDadosAnalise({ ...dadosAnalise, ligacao: e.target.checked ? true : false })
                        }} control={<Checkbox defaultChecked={dadosAnalise.ligacao} />} label="Ligação" />
                        <FormControlLabel onChange={e => {
                            setDadosAnalise({ ...dadosAnalise, site: e.target.checked ? true : false })
                        }} control={<Checkbox defaultChecked={dadosAnalise.site} />} label="Site" />
                    </FormControl>
                </Box>
                <Box width='48%'>
                    <FormGroup>
                        <FormControlLabel onChange={e => {
                            setDadosAnalise({ ...dadosAnalise, documentoIdentificacao: e.target.checked ? true : false })
                        }} control={<Checkbox defaultChecked={dadosAnalise.documentoIdentificacao} />} label="Documento de Identificação" labelPlacement="start" />
                        <FormControlLabel onChange={e => {
                            setDadosAnalise({ ...dadosAnalise, declaracaoAssociado: e.target.checked ? true : false })
                        }} control={<Checkbox defaultChecked={dadosAnalise.declaracaoAssociado} />} label="Declaração Associado ou Carteirinha" labelPlacement="start" />
                        <FormControlLabel onChange={e => {
                            setDadosAnalise({ ...dadosAnalise, vinculadosSimNao: e.target.checked ? true : false })
                        }} control={<Checkbox defaultChecked={dadosAnalise.vinculadosSimNao} />} label="Tipo de Vinculo" labelPlacement="start" />
                        <FormControl style={{ minWidth: '150px' }} size='small'>
                            <InputLabel id="demo-simple-select-label">Tipo de Vinculo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Tipo de Vinculo"
                                value={dadosAnalise.vinculados}
                                onChange={e => {
                                    setDadosAnalise({ ...dadosAnalise, vinculados: e.target.value })
                                }}
                            >
                                <MenuItem>
                                    <em>Tipo de Vinculo</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox defaultChecked={dadosAnalise.planoAmil === 'Sim'} />} label="Plano Amil" labelPlacement="start" />
                        <Box display='flex' justifyContent='space-between'>
                            <TextField type='date' focused label='Data inicio' size='small' value={dadosAnalise.dataInicioPlanoAmil} />
                            <TextField type='date' focused label='Data Fim' size='small' value={dadosAnalise.dataFimPlanoAmil} />
                            <TextField focused label='Custo' size='small' value={dadosAnalise.custoPlanoAmil} />
                        </Box>
                    </FormGroup>
                </Box>
            </Box>
            <Box mt={2}>
                <Button variant='contained' onClick={salvar}>Salvar</Button>
            </Box>
        </Box>
    )
}

export default ProcessamentoElegibilidade