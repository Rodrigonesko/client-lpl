import { Box, FormControlLabel, TextField, Checkbox, Chip, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { getCids } from "../../../../_services/teleEntrevista.service"
import Toast from "../../../../components/Toast/Toast"
import FormControlTextField from "../../Formulario/components/FormControlTextField"

const InputCids = ({ cidsSelecionados, setCidsSeleciados, cid }) => {

    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

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
                    checked={cidsSelecionados.some(item => item.subCategoria === cid.subCategoria)}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setCidsSeleciados([...cidsSelecionados, { ...cid }])
                        } else {
                            setCidsSeleciados(cidsSelecionados.filter(item => item.subCategoria !== cid.subCategoria))
                        }
                    }}
                />
            </Box>
            <Divider />
            <Toast
                open={openToast}
                severity={severity}
                message={message}
                onClose={() => setOpenToast(false)}
            />
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