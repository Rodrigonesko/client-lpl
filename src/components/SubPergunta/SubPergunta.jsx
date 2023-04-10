import React from "react";

const SubPergunta = ({ pergunta, name, handleChangeSub }) => {

    return (
        <div className="sub-pergunta">
            <label htmlFor={`${name}-${pergunta}`}>{pergunta}</label>
            <input spellCheck={true} type="text" name={`${name}-${pergunta}`} id={`${name}-${pergunta}`} className="input-pergunta" onKeyUp={e => { handleChangeSub(e.target) }} />
            <div id={`${name}-${pergunta}-erradas`}>
                <ul>

                </ul>
            </div>
        </div>
    )
}

export default SubPergunta