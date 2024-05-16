import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'
import axios from 'axios'
import { Base64 } from 'js-base64'
import { blue } from '@mui/material/colors'


pdfMake.vfs = pdfFonts.pdfMake.vfs

export const createPdf = (respostas) => {

    const printAddress = (address) => {
        return [
            { text: `${address.logradouro}, ${address.numero}`, bold: true, margin: [20, 0, 20, 0], italics: true, color: blue[900] },
            { text: `${address.bairro}`, bold: true, margin: [20, 0, 20, 0], italics: true, color: blue[900] },
            { text: `${address.localidade} - ${address.uf}`, bold: true, margin: [20, 0, 20, 0], italics: true, color: blue[900] },
        ]
    }

    const printResposta = (resposta, index) => {
        return [
            { text: `${index + 1}. ` + resposta.pergunta, bold: true, margin: [20, 15, 20, 0] },
            resposta.tipo === 'ENDEREÇO' ? printAddress(JSON.parse(resposta.resposta)) : {
                text: resposta.resposta, bold: true, margin: [20, 0, 20, 0], italics: true, color: blue[900]
            },
            resposta.subPerguntas.filter(subPergunta => {
                return subPergunta.resposta
            }).map(subPergunta => {
                if (subPergunta.tipo === 'Endereço') {
                    return [{
                        text: `${subPergunta.texto} `, bold: true, margin: [20, 0, 20, 0], italics: true
                    }, printAddress(JSON.parse(subPergunta.resposta))]
                }
                return [
                    { text: `${subPergunta.texto} `, bold: true, margin: [20, 0, 20, 0], italics: true },
                    { text: `${subPergunta.resposta}`, bold: true, margin: [20, 0, 20, 0], italics: true, color: blue[900] }
                ]
            }),
            { text: resposta.observacoes, bold: true, margin: [20, 0, 20, 0], italics: true, color: blue[900] },
        ]
    }

    const perfilEContracao = respostas.respostas.filter(resposta => resposta.categoria === 'PERFIL E CONTRATAÇÃO').map((resposta, index) => {
        return printResposta(resposta, index)
    })

    const tratamento = respostas.respostas.filter(resposta => resposta.categoria === 'TRATAMENTO').map((resposta, index) => {
        return printResposta(resposta, index)
    })

    const acompanhamento = respostas.respostas.filter(resposta => resposta.categoria === 'ACOMPANHAMENTO TERAPÊUTICO E DESFECHO').map((resposta, index) => {
        return printResposta(resposta, index)
    })



    axios.get(`${process.env.REACT_APP_API_KEY}/media/imgs/logo_sulamerica.jpg`, { responseType: 'arraybuffer' }).then(response => {
        const base64 = Base64.fromUint8Array(new Uint8Array(response.data))
        const img = 'data:image/jpeg;base64,' + base64

        pdfMake.createPdf({
            pageSize: 'A4',
            pageMargins: [15, 50, 15, 40],
            content: [
                {
                    image: img,
                    width: 100,
                    height: 60,
                    alignment: 'right',
                    margin: [0, 5]
                },
                {
                    layout: {
                        defaultBorder: false,
                    },
                    table: {
                        body: [
                            [
                                { text: 'Data de Emissão:', bold: true },
                                { text: moment(respostas.createdAt).format('DD/MM/YYYY'), bold: true }
                            ],
                            [
                                { text: 'Nome:', bold: true },
                                { text: respostas.pedido.beneficiario.nome, bold: true }
                            ],
                            [
                                { text: 'CPF:', bold: true },
                                { text: respostas.pedido.beneficiario.cpf, bold: true }
                            ],
                            [
                                { text: 'Prestador:', bold: true },
                                { text: respostas.pedido.prestador.nome, bold: true }
                            ],
                            [
                                { text: 'Responsável:', bold: true },
                                { text: `${respostas.pedido.beneficiario.responsavelLegal} | ${respostas.pedido.beneficiario.vinculoResponsavel}`, bold: true }
                            ]
                        ]
                    }
                },
                '\n\n\n',
                {
                    text: 'PERFIL E CONTRATAÇÃO', fontSize: 20, bold: true, margin: 20
                },
                ...perfilEContracao,
                '\n\n\n',
                {
                    text: 'TRATAMENTO', fontSize: 20, bold: true, margin: 20
                },
                ...tratamento,
                '\n\n\n',
                {
                    text: 'ACOMPANHAMENTO TERAPÊUTICO E DESFECHO', fontSize: 20, bold: true, margin: 20
                },
                ...acompanhamento
            ],
            footer: function (currentPage, pageCount) {
                return {
                    text: 'Página ' + currentPage.toString() + ' de ' + pageCount,
                    alignment: 'center'
                };
            },
        }).open()
    })



}