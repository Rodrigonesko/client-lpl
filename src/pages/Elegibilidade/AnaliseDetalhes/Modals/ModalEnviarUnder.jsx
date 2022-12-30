import React, { useState } from "react";
import $ from 'jquery'
import Axios from 'axios'
import { useParams } from "react-router-dom";

const ModalEnviarUnder = ({ setModal }) => {

    const {id} = useParams()

    const [erroSistema, setErroSistema] = useState(false)

    const mostrarBtns = (e) => {
        if (e.checked) {
            $('#btns-enviar-under').show('fast')
        } else {
            $('#btns-enviar-under').hide('fast')
        }
    }

    const enviarUnder = async () => {
        try {
            
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/enviarUnder`, {
                id,
                erroSistema
            }, {
                withCredentials: true
            })

            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="anexado-sis">Foi anexado os documentos no SisAmil?</label>
                <input type="checkbox" name="anexado-sis" id="anexado-sis" onClick={(e) => mostrarBtns(e.target)} />
            </div>
            <div>
                <label htmlFor="erro-sistema">Erro Sistema?</label>
                <input type="checkbox" name="erro-sistema" id="erro-sistema" onClick={e => {
                    if (e.target.checked) {
                        setErroSistema(true)
                    } else {
                        setErroSistema(false)
                    }
                }} />
            </div>
            <div id="btns-enviar-under" className="none">
                <button className="botao-padrao-cinza" onClick={() => { setModal(false) }} >Fechar</button>
                <button className="btn-padrao-verde" onClick={()=>enviarUnder()} >Enviar Under</button>
            </div>
        </div>
    )
}

export default ModalEnviarUnder