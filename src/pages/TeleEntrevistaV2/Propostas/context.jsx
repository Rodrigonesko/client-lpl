import React, { createContext, useState } from 'react';

export const PropostasContext = createContext();

export const PropostasProvider = ({ children }) => {
    const [propostas, setPropostas] = useState([]);
    const [propostasRn, setPropostasRn] = useState([]);
    const [propostasUe, setPropostasUe] = useState([]);
    const [filtros, setFiltros] = useState({
        status: ['Ajustar', 'Não enviado', 'Enviado'],
        agendado: false,
        humanizado: false,
        tipoContrato: '',
        vigencia: '',
        risco: '',
        idade: '',
        pesquisa: '',
    });
    const [statusRn, setStatusRn] = useState(['Em andamento']);
    const [statusUe, setStatusUe] = useState(['Andamento']);
    const [loading, setLoading] = useState(false);

    return (
        <PropostasContext.Provider value={{
            propostas,
            setPropostas,
            propostasRn,
            setPropostasRn,
            propostasUe,
            setPropostasUe,
            filtros,
            setFiltros,
            statusRn,
            setStatusRn,
            statusUe,
            setStatusUe,
            loading,
            setLoading
        }}>
            {children}
        </PropostasContext.Provider>
    );
}