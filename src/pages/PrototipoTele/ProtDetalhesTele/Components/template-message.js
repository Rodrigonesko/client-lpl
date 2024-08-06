const templateMessages = [
    {
        nome: 'Sem Sucesso',
        mensagem: 'Estamos tentando contato com o Sr (a) porém sem sucesso. A Sr (a) pode por favor ligar no número 11 4240-0422 e pedir para falar com a equipe médica.',
        templateSid: 'HX8df3402983474f02545859752d43e674',
        variaveis: {
        }
    },
    {
        nome: 'Mensagem Janelas 1',
        mensagem: `Prezado Sr.(a) {{1}},
Somos da Área de Implantação da Amil e para concluirmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) precisamos confirmar alguns dados médicos.
Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
*{{2}}*
1. Das 12:00 às 14:00
2. Das 14:00 às 16:00
3. Das 16:00 às 18:00
*{{3}}*
4. Das 08:00 às 10:00
5. Das 10:00 às 12:00
6. Das 12:00 às 14:00
7. Das 14:00 às 16:00
8. Das 16:00 às 18:00
Qual o melhor horário?
Informamos que vamos ligar dos números {{4}}, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.
Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.
Lembrando que em caso de menor de idade a entrevista será realizada com o responsável legal, não necessitando da presença do menor no momento da ligação!`,
        templateSid: 'HXbf141dbac262894073337dbd4732b221',
        variaveis: {
            nome: '',
            data1: '',
            data2: '',
            telefone: ''
        }
    },
    {
        nome: 'Mensagem Janelas 2',
        mensagem: `Prezado Sr.(a) {{1}},
Somos da Área de Implantação da Amil e para concluirmos a contratação do Plano de Saúde do Sr.(a), e dos seus dependentes (caso tenha) precisamos confirmar alguns dados médicos.
Por gentileza, escolha o *NÚMERO* referente a janela de horários para entrarmos em contato com o Sr.(a)
*{{2}}*
1. Das 08:00 às 10:00
2. Das 10:00 às 12:00
3. Das 12:00 às 14:00
4. Das 14:00 às 16:00
5. Das 16:00 às 18:00
*{{3}}*
6. Das 08:00 às 10:00
7. Das 10:00 às 12:00
8. Das 12:00 às 14:00
9. Das 14:00 às 16:00
10. Das 16:00 às 18:00
Qual o melhor horário?
Informamos que vamos ligar dos números {{4}}, pedimos tirar do spam para evitar bloqueio da ligação. Desde já agradecemos.
Atenção: o preenchimento dos horários é feito em tempo real. Caso o horário informado não esteja mais disponível, apresentarei uma nova opção.
Lembrando que em caso de menor de idade a entrevista será realizada com o responsável legal, não necessitando da presença do menor no momento da ligação.`,
        templateSid: 'HX2a7ab3d608a2d6fbb674ec9ac29086f9',
        variaveis: {
            nome: '',
            data1: '',
            data2: '',
            telefone: ''
        }
    },
    {
        nome: 'Horarios disponiveis',
        mensagem: `Visto que o preenchimento dos horários é feito em tempo real, esse horário já foi preenchido. Vou te passar os horários disponíveis atualizados:
Horários disponíveis para o dia {{1}} - {{2}}
Qual o melhor horário?`,
        templateSid: 'HXaa45e3096fb0f31ea8c7c4ed64c2c8fa',
        variaveis: {
            data: '',
            horarios: ''
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
        templateSid: 'HX41b1054fd9530c724bc2cc085a7ea3df',
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
    },
    {
        nome: 'Confirmação de agendamento',
        mensagem: `Agradecemos a confirmação do horário, a entrevista será realizada no dia {{1}}, às {{2}}. Informamos que ligaremos do número {{3}} (não será por WhatsApp, será por ligação telefônica), pedimos para tirar do spam para evitar o bloqueio da ligação.`,
        templateSid: 'HX0119b05ddd5799ac41782d75e1fba896',
        variaveis: {
            data: '',
            hora: '',
            telefone: ''
        }
    },
    {
        nome: 'Dependentes pendentes',
        mensagem: `Prezado(a) Sr(a) {{1}}, verificamos que consta pendente a entrevista do(s) seu(s) dependente(s). Solicitamos que acesse o link a seguir para realizar o agendamento. A Amil agradece e aguardo o seu contato.

{{2}}`,
        templateSid: 'HXee7778e84b9bcd574c5c819afaa06e59',
        variaveis: {
            nome: '',
            link: ''
        }
    },
    {
        nome: 'Agendamento pendente',
        mensagem: `Prezado(a) Sr(a) {{1}}, verificamos que consta pendente Entrevista(s) em seu Plano de Saúde. Digite 1000 para Atendimento Humanizado OU acesse o link a seguir para realizar o agendamento automático. A Amil agradece e aguardo o seu contato.

{{2}}`,
        templateSid: 'HX8a5dd4ffffb01bee3c922eb368f01044',
        variaveis: {
            nome: '',
            link: ''
        }
    },
    {
        nome: 'Adiantamento de entrevista',
        mensagem: `Prezado(a) Sr(a). A equipe médica esta disponível no momento, deseja adiantar a sua entrevista? Se sim, podemos entrar em contato neste momento? A Amil agradece e estamos disposição.`,
        templateSid: 'HXce758c7644b3de41683121f74950c9ea',
        variaveis: {
        }
    }
]

export default templateMessages