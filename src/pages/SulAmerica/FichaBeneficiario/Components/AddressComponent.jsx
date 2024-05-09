import { Box, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AddressComponent = ({ handleChange, id }) => {

    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        numero: ''
    })

    // const handleChangeEndereco = () => {
    //     try {
    //         if (cep.length !== 8) return
    //         const updateEndereco = await 
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        const fetch = async () => {
            try {
                if (cep.length !== 8) return
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                setEndereco({ ...data, numero: '' })
                handleChange(JSON.stringify({ ...data, numero: '' }))
            } catch (error) {
                console.log(error)
            }
        }
        fetch()
    }, [cep])

    return (
        <Box>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="CEP"
                onChange={(e) => {
                    setCep(e.target.value)
                }}
                type="number"
                InputProps={{
                    style: {
                        borderRadius: '10px'
                    }
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Box
                mt={2}
                display={'flex'}
                justifyContent={'space-between'}

            >
                <TextField
                    variant="outlined"
                    size="small"
                    label="Endereço"
                    value={endereco.logradouro}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            logradouro: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, logradouro: e.target.value }))
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '10px'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Bairro"
                    value={endereco.bairro}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            bairro: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, bairro: e.target.value }))
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '10px'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Cidade"
                    value={endereco.localidade}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            localidade: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, localidade: e.target.value }))
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '10px'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="UF"
                    value={endereco.uf}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            uf: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, uf: e.target.value }))
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '10px'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Número"
                    value={endereco.numero}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            numero: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, numero: e.target.value }))
                    }}
                    InputProps={{
                        style: {
                            borderRadius: '10px'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>
        </Box>
    )
}

export default AddressComponent