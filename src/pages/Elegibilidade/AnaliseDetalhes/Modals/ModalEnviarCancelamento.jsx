import React, { useState } from "react";
import $ from 'jquery'
import Axios from 'axios'

const ModalEnviarCancelamento = ({ setModal }) => {

    const [motivoCancelamento, setMotivoCancelamento] = useState('')
    const [categoria, setCategoria] = useState('')
    const [evidenciaFraude, setEvidenciaFraude] = useState('')

    const mostrarBtns = (e) => {
        if (e.checked) {
            $('#btns-enviar-under').show('fast')
        } else {
            $('#btns-enviar-under').hide('fast')
        }
    }

    const enviarCancelamento = () => {
        try {
            console.log(motivoCancelamento, categoria, evidenciaFraude);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="">Motivo do Cancelamento</label>
                <br />
                <textarea name="" id="" cols="50" rows="4" onKeyDown={e=>setMotivoCancelamento(e.target.value)} ></textarea>
            </div>
            <div>
                <label htmlFor="">Categoria de motivo de cancelamento</label>
                <select name="" id="" onChange={e=>setCategoria(e.target.value)} >
                    <option value=""></option>
                    <option value="À pedido da Adm">À pedido da Adm</option>
                    <option value="À pedido do Cliente">À pedido do Cliente</option>
                    <option value="Erro sistema">Erro sistema</option>
                    <option value="Fraude">Fraude</option>
                    <option value="Prazo expirado">Prazo expirado</option>
                    <option value="Situação Especial">Situação Especial</option>
                    <option value="Under">Under</option>
                </select>
            </div>
            <div>
                <label htmlFor="">Evidência de Fraude: </label>
                <select name="" id="" onChange={e=>setEvidenciaFraude(e.target.value)}>
                    <option value=""></option>
                    <option value="EMAIL">EMAIL</option>
                    <option value="LIGAÇÃO">LIGAÇÃO</option>
                    <option value="CONSULTA SITE">CONSULTA SITE</option>
                    <option value="ESTADO DIVERGENTE">ESTADO DIVERGENTE</option>
                </select>
            </div>
            <div>
                <label htmlFor="anexado-sis">Foi anexado os documentos no SisAmil?</label>
                <input type="checkbox" name="anexado-sis" id="anexado-sis" onClick={(e) => mostrarBtns(e.target)} />
            </div>
            <div id="btns-enviar-under" className="none">
                <button className="botao-padrao-cinza" onClick={() => { setModal(false) }} >Fechar</button>
                <button className="btn-padrao-vermelho" onClick={()=>enviarCancelamento()} >Cancelar</button>
            </div>
        </div>
    )
}

export default ModalEnviarCancelamento