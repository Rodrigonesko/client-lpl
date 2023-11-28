import { Autocomplete, Box, Button, Container, Divider, Tab, Tabs, TextField, Typography } from "@mui/material"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import TabelaAdmissional from "./Tabela/TabelaAdmissional"
import TabelaDemissional from "./Tabela/TabelaDemissional"
import { getUsers } from "../../_services/user.service"

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
        'Clinimerces', 'Eniltec', 'Eniltec', 'CEF', 'Site Caixa', 'Site VR', 'URBS', 'Localweb', '', '', '', '', 'Voux', 'You Do', 'You Do',
        '', ''
    ]

    const [user, setUser] = useState({})

    const [flushHook, setFlushHook] = useState(false)
    const [email, setEmail] = useState('')
    const [tipoExame, setTipoExame] = useState('')

    const [nome, setNome] = useState('')
    const [nomes, setNomes] = useState([])
    const [numero, setNumero] = useState('')

    const [busca, setBusca] = useState(false)

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
    }, [])

    const buscarNome = async () => {
        try {
            setBusca(true);
            const result = await getUsers()



        } catch (error) {
            console.log(error);
        } finally {
            setBusca(false);
        }
    }

    const handleChange = (e, newValue) => {
        setTipoExame(newValue)
        console.log(e);
    }

    useEffect(() => {
        setFlushHook(false)
    }, [flushHook, setFlushHook])

    return (
        <>
            <Sidebar>
                <Container maxWidth>
                    <div className="title">
                        <h2>Admissional / Demissional</h2>
                    </div>
                    <br />
                    <Box display='flex'>
                        <Autocomplete
                            size="small"
                            disablePortal
                            id="nome-auto-complete"
                            options={nomes}
                            onChange={(event, item) => {
                                setUser(item);
                            }}
                            getOptionLabel={nomes => nomes.name}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label='Nome' />}
                        />
                        <Button type='button' onClick={buscarNome} variant='contained' sx={{ marginLeft: '3px' }}>Buscar</Button>
                    </Box>
                    <br />
                    <Box>
                        <br />
                        <Typography>Nome do colaborador: {user.name} | Número do colaborador: {user.numero} | E-mail do colaborador: {user.email}</Typography>
                    </Box>
                    <br />
                    <Divider />
                    <br />
                    <Box sx={{ width: '100%' }}>
                        <Tabs value={tipoExame} onChange={handleChange} aria-label="wrapped label tabs example" >
                            <Tab value="admissional" label="Admissional" />
                            <Tab value="demissional" label="Demissional" />
                        </Tabs>
                        {
                            tipoExame === 'admissional' ? (
                                <TabelaAdmissional acoesAdmissional={acoesAdmissional} responsavel={responsavelAdmissao} fornecedor={fornecedorAdmissao} user={user} />
                            ) : tipoExame === 'demissional' ? (
                                <TabelaDemissional acoesDemissional={acoesDemissional} responsavel={responsavelDemissao} fornecedor={fornecedorDemissao} user={user} />
                            ) : (
                                <>
                                </>
                            )
                        }
                    </Box>
                </Container >
            </Sidebar >
        </>
    )
}

export default AdmissionalDemissional