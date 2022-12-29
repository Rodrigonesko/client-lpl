import React from "react";
import Axios from 'axios'

const ModalDevolucao = ({ setModal }) => {

    const enviarDevolucao = () => {
        try {

            let motivos = []
            
            let inputsMotivos = document.getElementsByClassName('motivo-devolucao')

            for (const item of inputsMotivos) {
                if(item.checked){
                    motivos.push(item.value)
                }
            }

            console.log(motivos);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="motivos-devolucao-container">
                <div>
                    <div>
                        <input type="checkbox" name="1" id="1" className="motivo-devolucao" value={1} />
                        <label htmlFor="1">1 - Documento elegivel</label>
                    </div>
                    <div>
                        <input type="checkbox" name="2" id="2" value={2} className="motivo-devolucao" />
                        <label htmlFor="2">2 - Falta Documento</label>
                    </div>
                    <div>
                        <input type="checkbox" name="3" id="3" value={3} className="motivo-devolucao" />
                        <label htmlFor="3">3 - Falta Declaração/Carteirinha Associado</label>
                    </div>
                    <div>
                        <input type="checkbox" name="4" id="4" value={4} className="motivo-devolucao" />
                        <label htmlFor="4">4 - Ficha de Associação Solicitada à Entidade</label>
                    </div>
                    <div>
                        <input type="checkbox" name="5" id="5" value={5} className="motivo-devolucao" />
                        <label htmlFor="5">5 - Falta de Assinatura na Declaração de Associado</label>
                    </div>
                    <div>
                        <input type="checkbox" name="6" id="6" value={6} className="motivo-devolucao" />
                        <label htmlFor="6">6 - Dependentes Elegíveis - cônjuge e filhos</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" name="7" id="7" value={7} className="motivo-devolucao" />
                        <label htmlFor="7">7 - Ausência de Verso do Diploma</label>
                    </div>
                    <div>
                        <input type="checkbox" name="8" id="8" value={8} className="motivo-devolucao" />
                        <label htmlFor="8">8 - Ausência de Assinatura no Diploma</label>
                    </div>
                    <div>
                        <input type="checkbox" name="10" id="10" value={10} className="motivo-devolucao" />
                        <label htmlFor="10">10 - Enviar frente e versodo Diploma ou Declaração de Conclusão do Curso</label>
                    </div>
                    <div>
                        <input type="checkbox" name="11" id="11" value={11} className="motivo-devolucao" />
                        <label htmlFor="11">11 - Enviar Declaração de Matricula na Instituição de Ensino</label>
                    </div>
                    <div>
                        <input type="checkbox" name="13" id="13" value={13} className="motivo-devolucao" />
                        <label htmlFor="13">13 - Falta Comprovante de Mens da Instituição</label>
                    </div>
                    <div>
                        <input type="checkbox" name="14" id="14" value={14} className="motivo-devolucao" />
                        <label htmlFor="14">14 - Carta de Permanência Com Prazo Superior a 60 Dias</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="checkbox" name="18" id="18" value={18} className="motivo-devolucao" />
                        <label htmlFor="18">18 - Ausência de Carteirinha do Plano Anterior</label>
                    </div>
                    <div>
                        <input type="checkbox" name="19" id="19" value={19} className="motivo-devolucao" />
                        <label htmlFor="19">19 - Ausência de Declaração do Plano Anterior</label>
                    </div>
                    <div>
                        <input type="checkbox" name="20" id="20" value={20} className="motivo-devolucao" />
                        <label htmlFor="20">20 - Falta 3 Últimos Comprovantes de Pagamento do Plano Anterior</label>
                    </div>
                    <div>
                        <input type="checkbox" name="21" id="21" value={21} className="motivo-devolucao" />
                        <label htmlFor="21">21 - Outros</label>
                        <input type="text" />
                    </div>
                    <div>
                        <input type="checkbox" name="30" id="30" value={30} className="motivo-devolucao" />
                        <label htmlFor="30">30 - Assinatura Digital Inválida</label>
                    </div>
                </div>
            </div>
            <div>
                <button className="botao-padrao-cinza" onClick={() => { setModal(false) }} >Fechar</button>
                <button className="btn-padrao-amarelo" onClick={() => enviarDevolucao()} >Devolver</button>
            </div>
        </div>
    )
}

export default ModalDevolucao