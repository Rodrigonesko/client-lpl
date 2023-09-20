import React, { useState } from "react";
import SubPergunta from "../SubPergunta/SubPergunta";
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Alert } from "@mui/material";

const prcs = [
    '600', '603', '604', '606', '607', '608', '609', '610'
]

const Pergunta = ({ item, handleChange, handleChangeSub, handleSimOuNao, pessoa, setAutismo }) => {

    const [radioSimouNao, setRadioSimOuNao] = useState(false)
    const [diagnosticoAutismo, setDiagnosticoAutismo] = useState()
    const [copart, setCopart] = useState(false)

    return (
        <div key={item._id} className={`div-pergunta ${item.name}`}>
            <label htmlFor={item.name} className='label-pergunta'>{item.pergunta}</label>
            <input spellCheck={true} type="text" name={`pergunta-${item._id}`} id={item.name} className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
            {
                item.existeSub && (
                    <>
                        <input type="radio" name={`radio-${item.name}`} id={`radio-${item.name}-sim`} onClick={e => {
                            setRadioSimOuNao(true)
                            handleSimOuNao(e.target)
                            if (item.name === 'espectro') {
                                setAutismo(true)
                            }
                        }} value='Sim' />
                        <label htmlFor={`radio-${item.name}-sim`}>Sim</label>
                        <input type="radio" name={`radio-${item.name}`} id={`radio-${item.name}-nao`} onClick={e => {
                            setRadioSimOuNao(false)
                            handleSimOuNao(e.target)
                            if (item.name === 'espectro') {
                                setAutismo(false)
                            }
                        }} value='Não' />
                        <label htmlFor={`radio-${item.name}-nao`}>Não</label>
                    </>
                )
            }
            {
                radioSimouNao && item.name === 'espectro' && item.formulario !== 'adulto' ? (
                    <Box mt={1} display='flex' flexDirection='column'>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Já tem o diagnóstico?</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name={`${item.name}-Diagnostico:`}
                                onChange={(e) => {
                                    setDiagnosticoAutismo(e.target.value)
                                    handleChangeSub(e.target)
                                }}
                            >
                                <FormControlLabel value="JÁ TEM O DIAGNOSTICO FECHADO" control={<Radio />} label="JÁ TEM O DIAGNOSTICO FECHADO" />
                                <FormControlLabel value="EM INVESTIGAÇÃO" control={<Radio />} label="EM INVESTIGAÇÃO" />
                            </RadioGroup>
                        </FormControl>
                        {
                            (prcs.findIndex(prc => prc === pessoa.grupoCarencia) !== -1) && diagnosticoAutismo ? (
                                <>
                                    <Alert severity="error">Informar sobre a carência de 180 dias para Terapias. {`\n`} <strong>Material de apoio</strong> : Carência é o tempo que você terá que esperar para ser atendido pelo plano de saúde em um determinado procedimento. Essa informação esta claramente disposta no seu contrato e segue o disposto na Lei nº 9.656/98,.</Alert>
                                </>
                            ) : null
                        }
                        <FormControl sx={{ mt: 1 }}>
                            <FormLabel id="demo-radio-buttons-group-label">Copart</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name={`${item.name}-Copart:`}
                                id={`${item.name}-Copart`}
                                onChange={(e) => {
                                    setCopart(e.target.value)
                                    handleChangeSub(e.target)
                                }}
                            >
                                <FormControlLabel value={'Sim'} control={<Radio />} label="Sim" />
                                <FormControlLabel value={'Não'} control={<Radio />} label="Não" />
                            </RadioGroup>
                        </FormControl>
                        {
                            copart === 'Sim' ? (
                                <Alert severity="error">informar que o produto contratado prevê COPART para realização de Terapias. {'\n'}  <strong>Material de apoio</strong> COPART: É o plano de saúde em que o beneficiário paga um valor à parte pela realização de um procedimento ou evento, essa informação está claramente disposta no seu contrato e é prevista na Resolução nr 433 da ANS.</Alert>
                            ) : null
                        }
                    </Box>
                ) : null
            }
            {
                radioSimouNao ? (
                    <>
                        {
                            item.subPerguntasSim.map(e => {
                                return (
                                    <SubPergunta handleChangeSub={handleChangeSub} name={item.name} pergunta={e}></SubPergunta>
                                )

                            })
                        }
                    </>
                ) : (
                    <>
                        {
                            item.subPerguntasNao.map(e => {
                                return (
                                    <SubPergunta handleChangeSub={handleChangeSub} name={item.name} pergunta={e}></SubPergunta>
                                )
                            })
                        }
                    </>
                )
            }
        </div >
    )
}

export default Pergunta