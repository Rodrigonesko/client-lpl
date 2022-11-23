import React, { useState } from "react";
import SubPergunta from "../SubPergunta/SubPergunta";

const Pergunta = ({ item, handleChange, handleChangeSub, handleSimOuNao }) => {

    const [radioSimouNao, setRadioSimOuNao] = useState(false)

    return (
        <div key={item._id} className='div-pergunta'>
            <label htmlFor={item.name} className='label-pergunta'>{item.pergunta}</label>
            <input type="text" name={`pergunta-${item._id}`} id={item.name} className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
            {
                item.existeSub && (
                    <>
                        <input type="radio" name={`radio-${item.name}`} id={`radio-${item.name}-sim`} onClick={e => {
                            setRadioSimOuNao(true)
                            handleSimOuNao(e.target)
                        }} value='Sim' />
                        <label htmlFor={`radio-${item.name}-sim`}>Sim</label>
                        <input type="radio" name={`radio-${item.name}`} id={`radio-${item.name}-nao`} onClick={e => {
                            setRadioSimOuNao(false)
                            handleSimOuNao(e.target)
                        }} value='Não' />
                        <label htmlFor={`radio-${item.name}-nao`}>Não</label>
                    </>
                )
            }
            {
                radioSimouNao ? (
                    <>
                        {
                            item.subPerguntasSim.map(e => {
                                return (
                                    <SubPergunta handleChangeSub={handleChangeSub} name={item.name} pergunta={e}></SubPergunta>
                                )

                            })
                        }
                    </>
                ) : (
                    <>
                        {
                            item.subPerguntasNao.map(e => {
                                return (
                                    <SubPergunta handleChangeSub={handleChangeSub} name={item.name} pergunta={e}></SubPergunta>
                                )
                            })
                        }
                    </>
                )
            }
        </div>
    )
}

export default Pergunta