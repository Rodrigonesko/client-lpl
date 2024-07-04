import { Box, FormControlLabel, Checkbox, Chip, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { getCids } from "../../../../_services/teleEntrevista.service"
import FormControlTextField from "../../Formulario/components/FormControlTextField"

const InputCids = ({ cidsSelecionados, setCidsSeleciados, cid }) => {

    return (
        <>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
                p={1}
            >
                <FormControlLabel
                    control={<Checkbox />}
                    label={`${cid.subCategoria} - ${cid.descricao}`}
                    checked={cidsSelecionados.some(item => item.codigo === cid.subCategoria)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setCidsSeleciados([...cidsSelecionados, { ...cid, codigo: cid.subCategoria }])
                        } else {
                            setCidsSeleciados(cidsSelecionados.filter(item => item.codigo !== cid.subCategoria))
                        }
                    }}
                />
            </Box>
            <Divider />
        </>

    )
}

const CidsDeclaracaoSaude = ({ cidsSelecionados, setCidsSeleciados }) => {

    const [cids, setCids] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const buscarCids = async () => {
        try {
            const result = await getCids(pesquisa)
            console.log(result);
            setCids(result)
        } catch (error) {
            console.log(error);
            setCids([])
        }
    }

    useEffect(() => {
        if (pesquisa.length > 2) {
            buscarCids()
        } else {
            setCids([])
        }
    }, [pesquisa])

    return (
        <Box>
            <Box
                display={'flex'}
                gap={2}
                flexWrap={'wrap'}
            >
                {
                    cidsSelecionados.map((cid, index) => (
                        <Chip
                            key={index}
                            label={`${cid.subCategoria} - ${cid.descricao}`}
                            onDelete={() => setCidsSeleciados(cidsSelecionados.filter(item => item.subCategoria !== cid.subCategoria))}
                        />
                    ))
                }
            </Box>
            <FormControlTextField
                label={'Cids'}
                placeholder={'Pesquisa'}
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
            <Box>
                {
                    cids.map((cid, index) => (
                        <InputCids
                            key={index}
                            cid={cid}
                            cidsSelecionados={cidsSelecionados}
                            setCidsSeleciados={setCidsSeleciados}
                        />
                    ))
                }
            </Box>
        </Box>
    )
}

export default CidsDeclaracaoSaude