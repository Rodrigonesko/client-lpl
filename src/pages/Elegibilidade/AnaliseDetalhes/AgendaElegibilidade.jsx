import React from "react";
import moment from "moment/moment";
import Axios from 'axios'

const AgendaElegibilidade = ({ setComentario, agenda }) => {

    const handleChange = (set, value) => {
        set(value)
    }

    const excluirComentario = async (id) => {
        try {

            const result = await Axios.delete(`${process.env.REACT_APP_API_KEY}/elegibilidade/agenda/${id}`, { withCredentials: true })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="agenda-elegibilidade">
            <div>
                <div className="title">
                    <h3>Agenda</h3>
                </div>
                <div>
                    <textarea name="comentario-elegi" id="comentario-elegi" cols="60" rows="5" onKeyUp={e => {
                        handleChange(setComentario, e.target.value)
                    }} ></textarea>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>Analista</th>
                            <th>Data</th>
                            <th>Comentario</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agenda.map(e => {
                                return (
                                    <tr>
                                        <td>{e.analista}</td>
                                        <td>{moment(e.createdAt).format('DD/MM/YYYY hh:mm')}</td>
                                        <td>{e.comentario}</td>
                                        <td><button onClick={() => {
                                            excluirComentario(e._id)
                                        }} >Excluir</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AgendaElegibilidade