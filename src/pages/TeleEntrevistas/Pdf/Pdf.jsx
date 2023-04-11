import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Axios from 'axios'
import moment from 'moment'

const gerarPdf = async (proposta, nome) => {

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista/${proposta}/${nome}`, { withCredentials: true })

    const resultPerguntas = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

    const enfermeiras = [
        { nome: "Marcia Rocha", coren: "COREN PR-000.233.985" },
        { nome: "Allana Silva", coren: "COREN PR-001.257.825" },
        { nome: "Giovana Santana", coren: "COREN PR-001.786.031" },
        { nome: "Daniele Silva", coren: "COREN PR-001.801.022" },
        { nome: "Roberta Alexandre", coren: "COREN SC-000.199.674" },
        { nome: "Gislaine Alberton Almeida", coren: "COREN PR-000.774.407" },
        { nome: "Isabelle Silva", coren: "COREN PR-001.816.536" },
        { nome: "Sandra Santos", coren: "COREN PR-001.812.442" },
        { nome: "Eduarda Mayworm", coren: "COREN PR-001.866.786" },
        { nome: "Cristiane Antonioli", coren: "COREN PR-000.356.705" },
        { nome: "Liliane Antunes Laureano", coren: "COREN PR-001.794.387" }
    ];

    let coren = enfermeiras.find(enfermeira => enfermeira.nome === result.data.result[0].responsavel)?.coren;


    let tituloHabitos

    if (result.data.result[0].tipoFormulario === 'adulto') {
        tituloHabitos = [
            { text: 'HÁBITOS E HISTÓRICO FAMILIAR', fontSize: 20, margin: 20 },
        ]
    }

    const perguntas = resultPerguntas.data.perguntas.map(e => {

        if (e.formulario === result.data.result[0].tipoFormulario && e.categoria === 'questionario') {
            if (e.sexo !== 'M' && e.sexo !== 'F') {
                return [
                    { text: e.pergunta, margin: [20, 0, 20, 0] },
                    { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0], italics: true, color: '#0070c0' }
                ]
            }
            if (e.sexo === 'M' && result.data.result[0].sexo === 'M') {
                return [
                    { text: e.pergunta, margin: [20, 0, 20, 0] },
                    { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0], italics: true, color: '#0070c0' }
                ]
            }

            if (e.sexo === 'F' && result.data.result[0].sexo === 'F') {
                return [
                    { text: e.pergunta, margin: [20, 0, 20, 0] },
                    { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0], italics: true, color: '#0070c0' }
                ]
            }

        }

        return null

    })

    const habitos = resultPerguntas.data.perguntas.map(e => {

        if (e.formulario === result.data.result[0].tipoFormulario && e.categoria === 'habitos') {
            return [
                { text: e.pergunta, margin: [20, 0, 20, 0] },
                { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0], italics: true, border: [true, true, true, true], color: '#0070c0' }
            ]
        }

        return null

    })

    let divergencias

    if (result.data.result[0].divergencia !== undefined) {
        divergencias = [
            {
                text: [{ text: 'Identifica divergência? ' }, { text: 'Sim', color: '#0070c0', bold: true, italics: true }], margin: [20, 0, 20, 0]
            },
            {
                text: [{ text: '\nQual? ' }, { text: result.data.result[0].divergencia, bold: true, margin: [20, 0, 20, 0], italics: true, color: '#0070c0' }], margin: [20, 0, 20, 0]
            },
            {
                text: [{ text: 'Por que o beneficiário não informou na Declaração de Saúde essas patologias: ' }, { text: result.data.result[0].patologias, bold: true, margin: [20, 0, 20, 0], italics: true, color: '#0070c0' }], margin: [20, 0, 20, 0]
            },
            {
                text: [{ text: 'Cids: ' }, { text: result.data.result[0].cids, margin: [20, 0, 20, 0], italics: true, color: '#0070c0', bold: true }], margin: [20, 0, 20, 0]
            },
        ]
    } else {
        divergencias = [
            {
                text: [{ text: 'Identifica divergencia?' }, { text: 'Não \n', color: '#0070c0', bold: true, italics: true }], margin: [20, 0, 20, 0]
            }
        ]
    }

    let responsavel = result.data.result[0].responsavel

    const details = [
        {
            image: 'data:image/png;base64,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',
            width: 60,
            height: 50,
            alignment: 'right',
            margin: [0, 5]
        },
        {
            layout: {
                defaultBorder: false // Desabilita as bordas padrão
            },
            table: {
                body: [
                    [
                        { text: 'Data Tele Entrevista:', bold: true },
                        { text: moment(result.data.result[0].createdAt).format('DD/MM/YYYY'), bold: false, margin: [10, 0, 0, 0], italics: true, color: '#0070c0' }
                    ],
                    [
                        { text: 'Nome:', bold: true },
                        { text: `${nome}`, bold: false, margin: [10, 0, 0, 0], italics: true, color: '#0070c0' }
                    ],
                    [
                        { text: 'CPF:', bold: true },
                        { text: `${result.data.result[0].cpf}`, bold: false, margin: [10, 0, 0, 0], italics: true, color: '#0070c0' }
                    ],
                    [
                        { text: 'Proposta:', bold: true },
                        { text: `${proposta}`, bold: false, margin: [10, 0, 0, 0], italics: true, color: '#0070c0' }
                    ],
                    [
                        { text: 'Data Nascimento:', bold: true },
                        { text: `${result.data.result[0].dataNascimento}`, bold: false, margin: [10, 0, 0, 0], italics: true, color: '#0070c0' }
                    ]
                ]
            }
        },
        '\n\n\n',
        ...perguntas,
        tituloHabitos,
        ...habitos,
        { text: 'RESUMO \n\n', margin: [20, 0, 20, 0], bold: true },
        { text: [{ text: 'Tipo de teleatendimento:' }, { text: 'Telefone \n\n', bold: true, margin: [20, 0, 20, 0], italics: true, color: '#0070c0' }], margin: [20, 0, 20, 0] },
        ...divergencias,
        { text: `\n\n Realizado por: ${responsavel} (${coren})`, margin: [20, 0, 20, 0], decoration: "underline" }
    ]

    const rodape = (currentPage, pageCount) => {
        return [
            {
                text: `Página ${currentPage} de ${pageCount}`,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]//Left, top, right, bottom
            }
        ]
    }

    // const header = () => {
    //     return [{
    //         image: 'data:image/png;base64,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',
    //         width: 60,
    //         height: 50,
    //         alignment: 'right',
    //         margin: [5, 5, 5, 5]
    //     }];
    // }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        content: [details],
        footer: rodape,
    }

    pdfMake.createPdf(docDefinitions).download(`${nome}.pdf`)

}

export default gerarPdf

