import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [flushHook, setFlushHook] = useState(false);
    const [whatsappSender, setWhatsappSender] = useState(localStorage.getItem('whatsappSender') || '');
    const [whatsappReceiver, setWhatsappReceiver] = useState({
        _id: '',
        nome: '',
        whatsapp: '',
    });
    const [responsavel, setResponsavel] = useState('Todos');

    return (
        <ChatContext.Provider value={{
            flushHook,
            setFlushHook,
            whatsappSender,
            setWhatsappSender,
            whatsappReceiver,
            setWhatsappReceiver,
            responsavel,
            setResponsavel
        }}>
            {children}
        </ChatContext.Provider>
    );
};