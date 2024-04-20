import React, { createContext, useState } from 'react';

export const PropostasContext = createContext();

export const PropostasProvider = ({ children }) => {
    const [propostas, setPropostas] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <PropostasContext.Provider value={{
            propostas,
            setPropostas,
            loading,
            setLoading
        }}>
            {children}
        </PropostasContext.Provider>
    );
}