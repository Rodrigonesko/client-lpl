import React, { useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Mensagens.css'
const Mensagens = () => {

    const [dataMensagem, setDataMensagem] = useState('')
    const [mensagens, setMensagens] = useState([])

    const gerarMensagens = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/mensagens/${dataMensagem}`)

            console.log(result);

            setMensagens(result.data.msgs)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-mensagens-container">
                <div className="mensagens-container">
                    <div className="title">
                        <h3>Mensagens</h3>
                    </div>
                    <div className="filtro-mensagens">
                        <label htmlFor="gerar-mensagem">Selecionar data parar mensagens: </label>
                        <input type="date" id="gerar-mensagens" name="gerar-mensagens" onChange={e => setDataMensagem(e.target.value)} />
                        <button onClick={gerarMensagens}>Gerar mensagens</button>
                    </div>
                    <div className="mensagens">
                        {
                            mensagens.map(e=>{
                                return(
                                    <div className="mensagem">
                                        {e.saudacao}
                                        <br />
                                        <br />
                                        {e.parte1} {e.parte2} {e.parte3}
                                        <br />
                                        {e.parte4} {e.parte5}
                                        <br />
                                        {e.parte6}
                                        <br />
                                        <br />
                                        {e.parte8}
                                        <br />
                                        <br />
                                        {e.parte7}
                                        <br />
                                        <span>Tipo Contrato: {e.tipoContrato}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </section>
        </>
    )
}

export default Mensagens