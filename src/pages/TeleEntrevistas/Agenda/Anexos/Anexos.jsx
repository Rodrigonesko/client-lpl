import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment/moment";
import { Button, Box } from "@mui/material";

const Anexos = () => {

    const [propostas, setPropostas] = useState([])

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { withCredentials: true })

            setPropostas(result.data.propostas)

        } catch (error) {
            console.log(error);
        }
    }

    const mandarImplatacao = async (id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/mandarImplatacao`, {
                id
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const anexar = async (id) => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/anexar`, { id }, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
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