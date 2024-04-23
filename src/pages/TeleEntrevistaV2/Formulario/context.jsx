import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [flushHook, setFlushHook] = useState(false);
    const [proposta, setProposta] = useState({
        beneficiario: {
            nome: '',
            sexo: '',
            cpf: '',
            telefone: '',
            dataNascimento: ''
        },
        proposta: ''
    });
    const [tea, setTea] = useState('')

    return (
        <FormContext.Provider value={{
            flushHook,
            setFlushHook,
            proposta,
            setProposta,
            tea,
            setTea
        }}>
            {children}
        </FormContext.Provider>
    );
}