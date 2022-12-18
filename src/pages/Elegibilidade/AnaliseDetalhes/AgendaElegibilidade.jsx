import React from "react";

const AgendaElegibilidade = ({ setComentario, agenda }) => {

    const handleChange = (set, value) => {
        set(value)
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
                                    <td>
                                        oii
                                    </td>
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