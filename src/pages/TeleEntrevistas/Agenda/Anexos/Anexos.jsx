import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment/moment";
import { Button, Box, Select, FormControl, InputLabel, MenuItem, CircularProgress } from "@mui/material";

const Anexos = () => {

    const [propostas, setPropostas] = useState([])
    const [divergencia, setDivergencia] = useState('')
    const [loading, setLoading] = useState(false)

    const buscarPropostas = async () => {
        try {
            setLoading(true)
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { withCredentials: true })

            setPropostas(result.data.propostas)
            setLoading(false)

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const mandarImplatacao = async (id) => {
        try {
            setLoading(true)
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/mandarImplatacao`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                buscarPropostas()
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    const anexar = async (id) => {
        try {

            setLoading(true)

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { id }, { withCredentials: true })

            if (result.status === 200) {
                buscarPropostas()
            }

            setLoading(false)


        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = async (divergencia) => {
        try {

            setLoading(true)

            console.log(divergencia);

            setDivergencia(divergencia)

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { withCredentials: true })

            if (divergencia === 'Todos') {
                setPropostas(result.data.propostas)
                setLoading(false)
                return
            }

            let arr = []

            result.data.propostas.forEach(e => {
                if (e.houveDivergencia === divergencia) {
                    arr.push(e)
                }
            })

            setPropostas(arr)

            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        buscarPropostas()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-anexos-container">
                <Box m={2}>
                    <h3>Anexar SisAmil: {propostas.length}</h3>
                </Box>
                <Box>
                    <FormControl style={{ minWidth: '130px' }}>
                        <InputLabel>Divergência</InputLabel>
                        <Select
                            label='Divergência'
                            value={divergencia}
                            onChange={
                                (e) => {
                                    handleChange(e.target.value)
                                }
                            }
                        >
                            <MenuItem value='Todos'>
                                Todos
                            </MenuItem>
                            <MenuItem value='Sim'>
                                Sim
                            </MenuItem>
                            <MenuItem value='Não'>
                                Não
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />

                    ) : null
                }
                <Box m={2}>
                    <div className="anexos-sisamil">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th>Vigência</th>
                                    <th>Proposta</th>
                                    <th>Nome</th>
                                    <th>TipoContrato</th>
                                    <th>Houve Divergência</th>
                                    <th>Cids</th>
                                    <th>Divergência</th>
                                    <th>Concluir</th>
                                    <th>Implantação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    propostas.map(e => {
                                        return (
                                            <tr key={e._id}>
                                                <td>{moment(e.vigencia).format('DD/MM/YYYY')}</td>
                                                <td>{e.proposta}</td>
                                                <td>{e.nome}</td>
                                                <td>{e.tipoContrato}</td>
                                                <td>{e.houveDivergencia}</td>
                                                <td>{e.cids}</td>
                                                <td>{e.divergencia}</td>
                                                <td><Button variant='contained' color='success' size='small' onClick={() => { anexar(e._id) }} >Concluir</Button></td>
                                                <td><Button variant='contained' color='warning' size='small' onClick={() => { mandarImplatacao(e._id) }}>Implantação</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Box>
            </section>
        </>
    )
}

export default Anexos