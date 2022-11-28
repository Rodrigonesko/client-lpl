import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Axios from 'axios'
import moment from 'moment'

const gerarPdf = async (proposta, nome) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista/${proposta}/${nome}`, { withCredentials: true })

    const resultPerguntas = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

    let tituloHabitos

    if (result.data.result[0].tipoFormulario == 'adulto') {
        tituloHabitos = [
            { text: 'HÁBITOS E HISTÓRICO FAMILIAR', fontSize: 20, margin: 20 },
        ]
    }

    const perguntas = resultPerguntas.data.perguntas.map(e => {

        if (e.formulario === result.data.result[0].tipoFormulario && e.categoria === 'questionario') {
            return [
                { text: e.pergunta, margin: [20, 0, 20, 0] },
                { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0] }
            ]
        }

    })

    const habitos = resultPerguntas.data.perguntas.map(e => {

        if (e.formulario === result.data.result[0].tipoFormulario && e.categoria === 'habitos') {
            return [
                { text: e.pergunta, margin: [20, 0, 20, 0] },
                { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0] }
            ]
        }

    })

    let divergencias

    if (result.data.result[0].divergencia != undefined) {
        divergencias = [
            { text: 'Identifica divergencia? ', margin: [20, 0, 20, 0] },
            { text: 'Sim', bold: true, margin: [20, 0, 20, 0] },
            { text: 'Qual?', margin: [20, 0, 20, 0] },
            { text: result.data.result[0].divergencia, bold: true, margin: [20, 0, 20, 0] },
            { text: 'Por que o beneficiario não informou na ds essas patologias:', margin: [20, 0, 20, 0] },
            { text: result.data.result[0].patologias, bold: true, margin: [20, 0, 20, 0] },
            { text: 'Cids', margin: [20, 0, 20, 0] },
            { text: result.data.result[0].cids, margin: [20, 0, 20, 0] }
        ]
    } else {
        divergencias = [
            { text: 'Identifica divergencia?', margin: [20, 0, 20, 0] },
            { text: 'Não', bold: true, margin: [20, 0, 20, 0] },
        ]
    }

    const reportTitle = [{
        text: 'Clientes',
        fontSize: 15,
        bold: true,
        margin: [5, 20, 0, 45] //Left, top, right, bottom
    }]

    const details = [
        {
            table: {
                body: [
                    ['Data', moment(result.data.result[0].createdAt).format('DD/MM/YYYY')],
                    ['Nome', `${nome}`],
                    ['CPF', `${result.data.result[0].cpf}`],
                    ['Proposta', `${proposta}`],
                    ['Data Nascimento', `${result.data.result[0].dataNascimento}`]
                ]
            },
            layout: 'header'
        },
        '\n\n\n',
        ...perguntas,
        tituloHabitos,
        ...habitos,
        { text: 'Tipo de teleatendimento:', margin: [20, 0, 20, 0] },
        { text: 'Telefone \n\n', bold: true, margin: [20, 0, 20, 0] },
        ...divergencias,
        { text: `\n\n Entrevista realizada por: ${result.data.result[0].responsavel}`, bold: true, margin: [20, 0, 20, 0] }
    ]

    const rodape = (currentPage, pageCount) => {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]//Left, top, right, bottom
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(docDefinitions).download()

}

export default gerarPdf 