import { Box, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AddressComponent = ({ handleChange, pergunta, subPergunta }) => {

    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
        numero: ''
    })

    useEffect(() => {
        const fetch = async () => {
            try {
                if (cep.length !== 8) return
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                setEndereco({ ...data, numero: '' })
                handleChange(JSON.stringify({ ...data, numero: '' }), subPergunta, pergunta)
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
                placeholder="CEP"
                onChange={(e) => {
                    setCep(e.target.value)
                }}
                name={pergunta}
                type="number"
            />
            <Box
                mt={1}
                display={'flex'}
                gap={1}
                flexWrap={'wrap'}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Endereço"
                    name={pergunta}
                    value={endereco.logradouro}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            logradouro: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, logradouro: e.target.value }), subPergunta, pergunta)
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Bairro"
                    name={pergunta}
                    value={endereco.bairro}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            bairro: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, bairro: e.target.value }), subPergunta, pergunta)
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Cidade"
                    name={pergunta}
                    value={endereco.localidade}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            localidade: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, localidade: e.target.value }), subPergunta, pergunta)
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="UF"
                    name={pergunta}
                    value={endereco.uf}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            uf: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, uf: e.target.value }), subPergunta, pergunta)
                    }}
                />
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Número"
                    name={pergunta}
                    value={endereco.numero}
                    onChange={(e) => {
                        setEndereco({
                            ...endereco,
                            numero: e.target.value
                        })
                        handleChange(JSON.stringify({ ...endereco, numero: e.target.value }), subPergunta, pergunta)
                    }}
                />
            </Box>
        </Box>
    )
}

export default AddressComponent