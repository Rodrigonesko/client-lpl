import { Autocomplete, Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getInfoEmail, getUsers } from "../../_services/user.service"
import TabelaAdmissional from "./Tabela/TabelaAdmissional"
import TabelaDemissional from "./Tabela/TabelaDemissional"
import ModalGerar from "./Modais/ModalGerar"
import { getInfoName, getName } from "../../_services/admissaoDemissao.service"

const AdmissionalDemissional = () => {

    const acoesAdmissional = [
        'Agendamento Exame Admissional', 'Planilha Contratação', 'Assinar Documentos', 'Foto 3x4', 'Conta Salario', 'VR', 'VC', 'VT/MetroCard',
        'Email', 'Assinatura Email', 'Linux', 'Notebook', 'Ramal', 'Portal LPL', 'Ponto', 'Crachá', 'Digital Sala', 'TransUnion', 'SisAmil',
        'Treinamento Obrigatórios'
    ]
    
    const acoesDemissional = [
        'Entrega Carta Pedido de Demissão ou Assinatura de Rescisão do Contrato', 'Agendamento Exame Demissional', 'Envio docs assinados para baixa',
        'Assinar Documentos/Acerto', 'Conta Salario', 'VR', 'VC', 'VT/MetroCard', 'Cancelar Email', 'Cancelar Linux', 'Notebook', 'Ramal',
        'Cancelar Portal LPL', 'Fechar e cancelar Ponto', 'Cancelar acesso Crachá', 'Cancelar Digital Sala', 'Cancelar TransUnion',
        'Cancelar SisAmil'
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


    const [flushHook, setFlushHook] = useState(false)
    const [email, setEmail] = useState('')
    const [emails, setEmails] = useState([])
    const [tipoExame, setTipoExame] = useState('')
    const [dados, setDados] = useState({
        tipoExame: ''
    })
    const [nome, setNome] = useState('')
    const [nomes, setNomes] = useState([])
    const [numero, setNumero] = useState('')
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

    const buscarEmail = async () => {
        try {
            setBusca(true);
            const result = await getInfoEmail(email);
    
            // Adicione o tratamento do resultado, se necessário
    
        } catch (error) {
            console.log(error);
        } finally {
            setBusca(false);
        }
    }

    useEffect(() => {
        const buscarNomes = async () => {
            try {
                const result = await getUsers()
                setNomes(result)
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        }
        buscarNomes()
    }, [nome])

    const buscarNome = async () => {
        try {
            setBusca(true);
            const result = await getInfoName(nome);
            setNomes(result);
            console.log(result)
        } catch (error) {
            console.log(error);
        } finally {
            setBusca(false);
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
                <ModalGerar setFlushHook={setFlushHook} flushHook={flushHook} setNomeCompleto={setNomeCompleto} setNumero={setNumero} />
                <br />
                <br />
                <Box display='flex'>
                    <Autocomplete
                        size="small"
                        disablePortal
                        id="nome-auto-complete"
                        options={nomes}
                        onChange={(event, item) => {
                            setNome(item.nome);
                        }}
                        getOptionLabel={(nomes) => nomes.nome}
                        sx={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label='Nome' />}
                    />
                    <Button type='button' onClick={buscarNome} variant='contained' sx={{ marginLeft: '3px' }}>Buscar</Button>
                </Box>
                <br />
                <Box display='flex'>
                    <Autocomplete
                        size="small"
                        disablePortal
                        id="email-auto-complete"
                        options={emails}
                        onChange={(event, item) => {
                            setEmail(item.email);
                        }}

                        getOptionLabel={emails => emails.email}
                        sx={{ width: 400 }}
                        renderInput={(params) => <TextField {...params} label='Email' />}
                    />
                    <Button type='submit' onClick={buscarEmail} variant='contained' sx={{ marginLeft: '3px' }}>Buscar</Button>
                </Box>
                <Box>
                    <br />
                    <Typography>Nome do colaborador: {nomeCompleto}</Typography>
                    <Typography>Número do colaborador: {numero}</Typography>
                </Box>
                <br />
                <FormControl>
                    <FormLabel>Qual o tipo de exame:</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                        <FormControlLabel value="admissional" control={<Radio onClick={handleChange} />} label="Admissional" />
                        <FormControlLabel value="demissional" control={<Radio onClick={handleChange} />} label="Demissional" />
                        <Divider />
                        <br />
                        {
                            tipoExame === 'admissional' ? (
                                <TabelaAdmissional acoesAdmissional={acoesAdmissional} responsavel={responsavelAdmissao} fornecedor={fornecedorAdmissao} />
                            ) : tipoExame === 'demissional' ? (
                                <TabelaDemissional acoesDemissional={acoesDemissional} responsavel={responsavelDemissao} fornecedor={fornecedorDemissao} />
                            ) : (
                                <>
                                </>
                            )
                        }
                    </RadioGroup>
                </FormControl>

            </Container >
        </>
    )
}

export default AdmissionalDemissional