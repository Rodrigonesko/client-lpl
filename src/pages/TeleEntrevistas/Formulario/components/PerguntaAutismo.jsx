import { Alert, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react"

const prcs = [
    '600', '603', '604', '606', '607', '608', '609', '610'
]

const PerguntaAutismo = ({ pessoa, tea, setTea }) => {

    const [autismoAdulto, setAutismoAdulto] = useState('Não')
    const [copart, setCopart] = useState(false)

    return (
        <Box>
            {pessoa.formulario === 'adulto' && <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Autismo?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    onChange={(e) => {
                        setAutismoAdulto(e.target.value)
                    }}
                >
                    <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                    <FormControlLabel value="Não" control={<Radio />} label="Não" />
                </RadioGroup>
            </FormControl>}
            {
                (autismoAdulto === 'Sim' || pessoa.formulario !== 'adulto') && < Box mt={1} display='flex' flexDirection='column'>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Já tem o diagnóstico?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={(e) => {
                                setTea(e.target.value)
                            }}
                            value={tea}
                        >
                            <FormControlLabel value="JÁ TEM O DIAGNOSTICO FECHADO" control={<Radio />} label="JÁ TEM O DIAGNOSTICO FECHADO" />
                            <FormControlLabel value="EM INVESTIGAÇÃO" control={<Radio />} label="EM INVESTIGAÇÃO" />
                        </RadioGroup>
                    </FormControl>
                    {
                        (prcs.findIndex(prc => prc === pessoa.grupoCarencia) !== -1) && tea && pessoa.tipoContrato !== 'ADESÃO' ? (
                            <>
                                <Alert severity="error">Informar sobre a carência de 180 dias para Terapias. {`\n`} <strong>Material de apoio</strong> : Carência é o tempo que você terá que esperar para ser atendido pelo plano de saúde em um determinado procedimento. Essa informação esta claramente disposta no seu contrato e segue o disposto na Lei nº 9.656/98,.</Alert>
                            </>
                        ) : null
                    }
                    <FormControl sx={{ mt: 1 }}>
                        <FormLabel id="demo-radio-buttons-group-label">Copart</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={(e) => {
                                setCopart(e.target.value)
                            }}
                        >
                            <FormControlLabel value={'Sim'} control={<Radio />} label="Sim" />
                            <FormControlLabel value={'Não'} control={<Radio />} label="Não" />
                        </RadioGroup>
                    </FormControl>
                    {
                        copart === 'Sim' && pessoa.tipoContrato !== 'ADESÃO' ? (
                            <Alert severity="error">informar que o produto contratado prevê COPART para realização de Terapias. {'\n'}  <strong>Material de apoio</strong> COPART: É o plano de saúde em que o beneficiário paga um valor à parte pela realização de um procedimento ou evento, essa informação está claramente disposta no seu contrato e é prevista na Resolução nr 433 da ANS.</Alert>
                        ) : null
                    }
                </Box>
            }
        </Box >
    )
}

export default PerguntaAutismo