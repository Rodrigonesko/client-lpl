import { Box, FormControlLabel, TextField, Checkbox, Chip, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { getCids } from "../../../../_services/teleEntrevista.service"
import Toast from "../../../../components/Toast/Toast"

const InputCids = ({ cidsSelecionados, setCidsSeleciados, cid }) => {

    const [ano, setAno] = useState(cidsSelecionados.find(item => item.subCategoria === cid.subCategoria)?.ano || '')
    const [anosAtras, setAnosAtras] = useState('')
    const [openToast, setOpenToast] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (anosAtras !== '') {
            setAno((new Date().getFullYear() - anosAtras).toString())
        } else {
            setAno('')
        }
    }, [anosAtras])

    useEffect(() => {
        if (ano.length === 4) {
            setAnosAtras((new Date().getFullYear() - parseInt(ano)).toString())
        }
    }, [ano])

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
                            if (ano.length !== 4) {
                                setOpenToast(true)
                                setSeverity('error')
                                setMessage('Preencha o campo ano corretamente')
                                return
                            }
                            setCidsSeleciados([...cidsSelecionados, { ...cid, ano }])
                        } else {
                            setCidsSeleciados(cidsSelecionados.filter(item => item.subCategoria !== cid.subCategoria))
                        }
                    }}
                />
                <Box>
                    <TextField
                        InputProps={{
                            sx: {
                                padding: '0px',
                                fontSize: '12px'
                            }
                        }}
                        placeholder={'Ano'}
                        size="small"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                    />
                    <TextField
                        InputProps={{
                            sx: {
                                padding: '0px',
                                fontSize: '12px',
                                width: '60px'
                            }
                        }}
                        placeholder={'Anos'}
                        size="small"
                        value={anosAtras}
                        onChange={(e) => setAnosAtras(e.target.value)}
                    />
                </Box>
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

const CidsDs = ({ cidsSelecionados, setCidsSeleciados }) => {

    const [cids, setCids] = useState([])
    const [pesquisa, setPesquisa] = useState('')

    const buscarCids = async () => {
        try {
            const result = await getCids(pesquisa)
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
        <Box
            m={2}
        >
            <Box
                display={'flex'}
                gap={2}
                flexWrap={'wrap'}
            >
                {
                    cidsSelecionados.map((cid, index) => (
                        <Chip
                            key={index}
                            label={`${cid.subCategoria} - ${cid.descricao} - ${cid.ano}`}
                            onDelete={() => setCidsSeleciados(cidsSelecionados.filter(item => item.subCategoria !== cid.subCategoria))}
                        />
                    ))
                }
            </Box>
            <FormControlLabel
                labelPlacement="top"
                label="Cids"
                control={
                    <TextField
                        placeholder="Pesquisa"
                        fullWidth
                        onChange={(e) => setPesquisa(e.target.value)}
                        size="small"
                    />
                }
                style={{ alignItems: 'flex-start' }}
                sx={{
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                        color: 'black',
                        fontWeight: 'bold',
                        pl: 1
                    }
                }}
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

export default CidsDs