import React, { useState, useEffect } from 'react'
import { Box, Paper, TextField, Typography, FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel, RadioGroup, Radio, MenuItem, Select, InputLabel, Button, Alert, Snackbar } from '@mui/material'
import { getPrcs, salvarDadosFase2 } from '../../../_services/elegibilidade.service'

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
        custoPlanoAmil: proposta.custoPlanoAmil,
        prcProposta: proposta.prcProposta
    })

    const [openSnack, setOpenSnack] = useState(false)

    const buscaPrcs = async () => {
        try {

            const result = await getPrcs()

            setPrcs(result.prc)

        } catch (error) {
            console.log(error);
        }
    }

    const salvar = async () => {
        try {

            await salvarDadosFase2({
                id: proposta._id,
                dataUpdate: dadosAnalise
            })

            setOpenSnack(true)

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
                                        <MenuItem key={prc.descricao} value={prc.descricao} >{prc.descricao}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField size='small' style={{ width: '50%', marginTop: '18px' }} label='PRC proposta' value={dadosAnalise.prcProposta} onChange={e => setDadosAnalise({ ...dadosAnalise, prcProposta: e.target.value })} />
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
                                <MenuItem value={'Declaração Matricula'}>Declaração Matricula</MenuItem>
                                <MenuItem value={'Diploma (frente/verso)'}>Diploma (frente/verso)</MenuItem>
                                <MenuItem value={'Classista'}>Classista</MenuItem>
                                <MenuItem value={'Conclusão Curso'}>Conclusão Curso</MenuItem>
                                <MenuItem value={'Holerite'}>Holerite</MenuItem>
                                <MenuItem value={'Contrato Social/CNPJ'}>Contrato Social/CNPJ</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox defaultChecked={dadosAnalise.planoAmil === 'Sim'} />} label="Plano Amil" labelPlacement="start" />
                        {
                            dadosAnalise.planoAmil === 'Sim' ? (
                                <Box display='flex' justifyContent='space-between'>
                                    <TextField type='date' focused label='Data inicio' size='small' value={dadosAnalise.dataInicioPlanoAmil} />
                                    <TextField type='date' focused label='Data Fim' size='small' value={dadosAnalise.dataFimPlanoAmil} />
                                    <TextField focused label='Custo' size='small' value={dadosAnalise.custoPlanoAmil} />
                                </Box>
                            ) : null
                        }
                    </FormGroup>
                </Box>
            </Box>
            <Box mt={2}>
                <Button variant='contained' onClick={salvar}>Salvar</Button>
            </Box>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={() => setOpenSnack(false)}>
                <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                    Salvo com sucesso
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default ProcessamentoElegibilidade