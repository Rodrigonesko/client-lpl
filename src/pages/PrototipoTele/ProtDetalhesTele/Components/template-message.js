const templateMessages = [
    {
        nome: 'Sem Sucesso',
        mensagem: 'Olá, tudo bem? Estou tentando falar com você, mas não tive sucesso. Poderia me chamar no whatsapp?',
        templateSid: 'whatsapp:template:1',
        variaveis: {
        }
    },
    {
        nome: 'Mensagem Padrão 1',
        mensagem: 'Olá, tudo bem? Estou tentando falar com você, mas não tive sucesso. Poderia me chamar no whatsapp?',
        templateSid: 'whatsapp:template:2',
        variaveis: {
            nome: '',
            link: ''
        }
    },
    {
        nome: 'Mensagem Padrão 2',
        mensagem: 'Olá, tudo bem? Estou tentando falar com você, mas não tive sucesso. Poderia me chamar no whatsapp?',
        templateSid: 'whatsapp:template:3',
        variaveis: {
            nome: '',
            link: ''
        }
    },
    {
        nome: 'Retomando atendimento',
        mensagem: `Prezado(a) Sr(a), desculpe a demora em retornar. Podemos retomar o seu agendamento?
Se sim, por favor, digitar OK`,
        templateSid: 'HX7f2a237a69f8b792eaa10eab3aa95ee2',
        variaveis: {
        }
    },
    {
        nome: 'Retomando atendimento 2',
        mensagem: `Prezado(a) Sr(a) {{1}}, desculpe a demora em retornar. Podemos retomar o seu agendamento?
Se sim, por favor, digite 1000 para Atendimento Humanizado OU acesse o link a seguir para realizar o agendamento automático. A Amil agradece e aguardo o seu contato.
{{2}}`,
        templateSid: 'HX7f2a237a69f8b792eaa10eab3aa95ee2',
        variaveis: {
            nome: '',
            link: ''
        }
    },
    {
        nome: 'Mensagem reagendamento',
        mensagem: `Prezado(a) Sr(a), deseja então realizar a alteração de agendamento?
Se sim, por favor, digitar OK`,
        templateSid: 'HXba366fd63f3fe58e61c8abb44ad8fba2',
        variaveis: {
        }
    },
    {
        nome: 'Mensagem reagendamento 2',
        mensagem: `Tentamos contato com o Sr(a) {{1}} no horário agendado porém sem sucesso. Será necessário reagendar. Por favor, digite 1000 para Atendimento Humanizado OU acesse o link a seguir para realizar o agendamento automático.
{{2}}`,
        templateSid: 'HXcaadf30610c5a6f934b204ff1993da71',
        variaveis: {
            nome: '',
            link: ''
        }
    }
]

export default templateMessages