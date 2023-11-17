import { Autocomplete, Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getInfoEmail, getUsers } from "../../_services/user.service"
import TabelaAdmissional from "./Tabela/TabelaAdmissional"
import TabelaDemissional from "./Tabela/TabelaDemissional"

const AdmissionalDemissional = () => {

    const acoesAdmissional = [
        'Agendamento Exame Admissional', 'Planilha Contratação', 'Assinar Documentos', 'Foto 3x4', 'Conta Salario', 'VR', 'VC', 'VT/MetroCard',
        'Email', 'Assinatura Email', 'Linux', 'Notebook', 'Ramal', 'Portal LPL', 'Ponto', 'Crachá', 'Digital Sala', 'TransUnion', 'SisAmil',
        'Treinamento Obrigatórios'
    ]

    const responsavelAdmissao = [
        'Samantha', 'Samantha', 'Samantha', 'Samantha',
        'Fabio', 'Fabio', 'Fabio', 'Fabio',
        'Gerson', 'Gerson', 'Gerson', 'Gerson', 'Gerson',
        'Samantha', 'Samantha', 'Samantha', 'Samantha', 'Samantha', 'Samantha', 'Samantha'
    ]

    const responsavelDemissao = [
        'Samantha', 'Samantha', 'Samantha',
        'Fabio', 'Fabio', 'Fabio', 'Fabio',
        'Gerson', 'Gerson', 'Gerson', 'Gerson',
        'Samantha', 'Samantha', 'Samantha', 'Samantha', 'Samantha', 'Samantha'
    ]

    const fornecedorAdmissao = [
        'Clinimerces', 'Eniltec', 'Eniltec', '', 'CEF', 'Site Caixa', 'Site VR', 'URBS', 'Localweb', '', '', '', '', '', 'Voux', 'Perfect Design',
        'You Do', '', '', 'Clinimerces'
    ]

    const fornecedorDemissao = [
        'Clinimerces', 'Eniltec', 'Eniltec', 'CEF', 'Site Caixa', 'Site VR', 'URBS', 'Localweb', '', '', '', '', 'Voux', 'You Do', 'You Do', '', '']

    const acoesDemissional = [
        'Entrega Carta Pedido de Demissão ou Assinatura de Rescisão do Contrato', 'Agendamento Exame Demissional', 'Envio docs assinados para baixa',
        'Assinar Documentos/Acerto', 'Conta Salario', 'VR', 'VC', 'VT/MetroCard', 'Cancelar Email', 'Cancelar Linux', 'Notebook', 'Ramal',
        'Cancelar Portal LPL', 'Fechar e cancelar Ponto', 'Cancelar acesso Crachá', 'Cancelar Digital Sala', 'Cancelar TransUnion',
        'Cancelar SisAmil'
    ]

    const [flushHook, setFlushHook] = useState(false)
    const [email, setEmail] = useState('')
    const [tipoExame, setTipoExame] = useState('admissional')
    const [dados, setDados] = useState({
        nome: '',
        numero: '',
        email: '',
        tipoExame: '',
        responsavel: '',
        status: ''
    })
    const [emails, setEmails] = useState([])
    const [numero, setNumero] = useState([])
    const [nomeCompleto, setNomeCompleto] = useState([])

    const [busca, setBusca] = useState(false)

    useEffect(() => {
        const buscarEmails = async () => {
            try {
                const result = await getUsers()
                setEmails(result)
            } catch (error) {
                console.log(error);
            }
        }
        buscarEmails()
    }, [])

    const buscarEmail = async (e) => {
        try {

            setBusca(false)

            const result = await getInfoEmail(email)

            if (result.user !== null) {

                console.log(result);

                setNomeCompleto(result.user.name)
                

            } else {
                setBusca(false)

            }

        } catch (error) {
            console.log(error);
            setBusca(false)
        }
    }

    const handleChange = (e) => {
        setTipoExame(e.target.value)
        setDados(prevState => ({ ...prevState, tipoExame: e.target.value }));
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <>
            <Sidebar />
            <Container>
                <div className="title">
                    <h2>Admissional / Demissional</h2>
                </div>
                <br />
                <Box m={2} >
                    <TextField type='text' name='nome' size='small' label='Nome' value={nomeCompleto} onChange={e => setNomeCompleto(e.target.value)} sx={{ width: '400px' }} />
                </Box>
                <Box m={2} >
                    <TextField type='text' name='numero' size='small' label='Número' value={numero} onChange={e => setNumero(e.target.value)} sx={{ marginLeft: '3px', width: '400px' }} />
                </Box>
                <Box display='flex' m={2} >
                    <Autocomplete
                        size="small"
                        disablePortal
                        id="email-auto-complete"
                        options={emails}
                        onChange={(event, item) => {
                            setEmail(item.email);
                        }}

                        getOptionLabel={emails => emails.email}
                        sx={{ width: 400, marginLeft: '3px' }}
                        renderInput={(params) => <TextField {...params} label='Email' />}
                    />
                    <Button type='submit' onClick={buscarEmail} variant='contained' sx={{ marginLeft: '3px' }}>Buscar</Button>
                </Box>

                <FormControl>
                    <FormLabel>Qual o tipo de exame:</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="admissional" name="radio-buttons-group">
                        <FormControlLabel value="admissional" control={<Radio onClick={handleChange} />} label="Admissional" />
                        <FormControlLabel value="demissional" control={<Radio onClick={handleChange} />} label="Demissional" />
                        <Divider />
                        <br />
                        {
                            tipoExame === 'admissional' ? (
                                <TabelaAdmissional acoesAdmissional={acoesAdmissional} responsavel={responsavelAdmissao} fornecedor={fornecedorAdmissao} />
                            ) : (
                                <TabelaDemissional acoesDemissional={acoesDemissional} responsavel={responsavelDemissao} fornecedor={fornecedorDemissao} />
                            )
                        }
                    </RadioGroup>
                </FormControl>

            </Container >
        </>
    )
}

export default AdmissionalDemissional