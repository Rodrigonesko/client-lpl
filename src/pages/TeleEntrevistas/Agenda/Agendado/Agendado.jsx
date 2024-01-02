import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Button, TextField, Select, FormControl, MenuItem, InputLabel, Box, CircularProgress } from "@mui/material";
import TeleAgendadas from "../../../../components/Agendadas/TeleAgendadas";
import './Agendado.css'
import moment from "moment";
import { buscaAnalistasTele, filterUsers } from "../../../../_services/user.service";
import { getPropostasAgendadas, getRnsAgendadas } from "../../../../_services/teleEntrevista.service";


const Agendado = () => {

    const [propostas, setPropostas] = useState([])
    const [enfermeiros, setEnfermeiros] = useState([])
    const [responsavel, setResponsavel] = useState('Todos')
    const [loading, setLoading] = useState(false)
    const [pesquisa, setPesquisa] = useState('')

    const searchEnfermeiro = async () => {
        try {
            const result = await filterUsers({
                atividadePrincipal: 'Tele Entrevista',
                inativo: { $ne: true }
            })
            setEnfermeiros(result)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPropostas = async () => {

        setLoading(true)

        const result = await getPropostasAgendadas()
        const resultRn = await getRnsAgendadas()

        let arr = []

        for (const item of result) {
            console.log(item.whatsappsAnteriores);
            arr.push({
                dataEntrevista: item.dataEntrevista,
                proposta: item.proposta,
                telefone: item.telefone,
                nome: item.nome,
                idade: item.idade,
                sexo: item.sexo,
                enfermeiro: item.enfermeiro,
                _id: item._id,
                tipo: 'Tele',
                contato1: item.contato1,
                contato2: item.contato2,
                contato3: item.contato3,
                whatsapp: item.whatsapp,
                whatsappsAnteriores: item.whatsappsAnteriores,
                retrocedido: item.retrocedido
            })
        }

        for (const item of resultRn.rns) {
            arr.push({
                dataEntrevista: item.dataEntrevista,
                proposta: item.proposta,
                telefone: item.telefones,
                nome: item.beneficiario,
                idade: item.idade,
                enfermeiro: item.responsavel,
                _id: item._id,
                tipo: 'Rn'
            })
        }

        arr.sort(function compare(a, b) {
            if (moment(a.dataEntrevista) < moment(b.dataEntrevista)) return -1;
            if (moment(a.dataEntrevista) > moment(b.dataEntrevista)) return 1;
            return 0;
        })

        setLoading(false)

        return arr
    }

    const searchPropostas = async () => {
        try {
            const arr = await fetchPropostas()
            setPropostas(arr)
        } catch (error) {
            console.log(error);
        }
    }

    const filtroEnfermeiro = async enfermeiro => {

        const arr = await fetchPropostas()
        setPropostas([])
        if (enfermeiro === 'Todos') {
            searchPropostas()
            return
        }
        const arrAux = arr.filter(proposta => proposta.enfermeiro === enfermeiro)
        setPropostas(arrAux)
        setLoading(false)
    }

    const handleFilter = async (event) => {
        event.preventDefault()
        const arr = await fetchPropostas()
        setPropostas([])
        const arrAux = arr.filter(proposta => proposta.proposta.includes(pesquisa) || proposta.nome.includes(pesquisa))
        setPropostas(arrAux)
    }

    useEffect(() => {
        searchPropostas()
        searchEnfermeiro()
    }, [])

    return (
        <Sidebar>
            {
                loading ? (
                    <CircularProgress style={{ position: 'absolute', top: '50%', left: '49%' }} />
                ) : null
            }
            <section className="section-agendados-container">
                <div className="agendados-container">
                    <Box mt={3}>
                        <FormControl size='small'>
                            <InputLabel>Analista</InputLabel>
                            <Select
                                defaultValue=''
                                style={{ minWidth: '100px' }}
                                labelId='label-analista'
                                id='select-analista'
                                label="Analista"
                                onChange={e => {
                                    setResponsavel(e.target.value)
                                    filtroEnfermeiro(e.target.value)
                                }}
                            >
                                <MenuItem key='todos' value='Todos'>Todos</MenuItem>
                                {
                                    enfermeiros.map(e => {
                                        return (
                                            <MenuItem key={e._id} value={e.name}>{e.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display='flex' m={2} justifyContent='end'>
                        <form action="">
                            <TextField onChange={e => setPesquisa(e.target.value)} size="small" label='Colaborador ou proposta' />
                            <Button onClick={handleFilter} type="submit" >Pesquisar</Button>
                        </form>
                    </Box>
                    <TeleAgendadas setPropostas={setPropostas} propostas={propostas} atualizarPropostas={filtroEnfermeiro} analista={responsavel} />
                </div>
            </section>
        </Sidebar>

    )
}

export default Agendado