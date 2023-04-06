import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import Axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'

const gerarPdf = async (proposta, nome) => {

    let base64 = ''

    function loadImage() {
        fetch("./logo_amil.png")
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => {
                    const base64String = reader.result;
                    base64 = base64String;
                    console.log(base64);
                };
            });
    };

    loadImage()

    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista/${proposta}/${nome}`, { withCredentials: true })

    const resultPerguntas = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

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
                    { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0] }
                ]
            }
            if (e.sexo === 'M' && result.data.result[0].sexo === 'M') {
                return [
                    { text: e.pergunta, margin: [20, 0, 20, 0] },
                    { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0] }
                ]
            }

            if (e.sexo === 'F' && result.data.result[0].sexo === 'F') {
                return [
                    { text: e.pergunta, margin: [20, 0, 20, 0] },
                    { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0] }
                ]
            }

        }

        return null

    })

    const habitos = resultPerguntas.data.perguntas.map(e => {

        if (e.formulario === result.data.result[0].tipoFormulario && e.categoria === 'habitos') {
            return [
                { text: e.pergunta, margin: [20, 0, 20, 0] },
                { text: result.data.result[0][e.name], bold: true, margin: [20, 0, 20, 0] }
            ]
        }

        return null

    })

    let divergencias

    if (result.data.result[0].divergencia !== undefined) {
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

    let responsavel = result.data.result[0].responsavel

    if (responsavel === 'Thaynara Santos' || responsavel === 'Cecilia Belli' || responsavel === 'Jéssica Wachesk') {
        responsavel += ' Supervisionado por: Roberta Alexandre'
    }

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
        {
            image: 'data:image/png;base64,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',
            width: 150,
            height: 150
        },
        '\n\n\n',
        ...perguntas,
        tituloHabitos,
        ...habitos,
        { text: 'Tipo de teleatendimento:', margin: [20, 0, 20, 0] },
        { text: 'Telefone \n\n', bold: true, margin: [20, 0, 20, 0] },
        ...divergencias,
        { text: `\n\n Entrevista realizada por: ${responsavel}`, bold: true, margin: [20, 0, 20, 0] }
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

    pdfMake.createPdf(docDefinitions).download(`${nome}.pdf`)

}

export default gerarPdf

