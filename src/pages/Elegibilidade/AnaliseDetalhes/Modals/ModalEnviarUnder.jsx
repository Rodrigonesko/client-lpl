import React, {useState} from "react";
import $ from 'jquery'
import Axios from 'axios'

const ModalEnviarUnder = ({setModal}) => {

    return (
        <div>
            <div>
                <label htmlFor="anexado-sis">Foi anexado os documentos no SisAmil?</label>
                <input type="checkbox" name="anexado-sis" id="anexado-sis" />
            </div>
            <div>
                <label htmlFor="erro-sistema">Erro Sistema?</label>
                <input type="checkbox" name="erro-sistema" id="erro-sistema" />
            </div>
            <div>
                <button className="botao-padrao-cinza" >Fechar</button>
                <button className="btn-padrao-verde" >Enviar Under</button>
            </div>
        </div>
    )
}

export default ModalEnviarUnder