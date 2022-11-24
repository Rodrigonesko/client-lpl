import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

const gerarPdf = (proposta, nome) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [{
        text: 'Clientes',
        fontSize: 15,
        bold: true,
        margin: [15, 20, 0, 45] //Left, top, right, bottom
    }]

    const details = [{
        table: {
            body: [
                ['Data', '24/11/2022'],
                ['Nome', 'Rodrigo'],
                ['CPF', '09754728969'],
                ['Proposta', '4648479879'],
                ['Data Nascimento', '05/06/2001']
            ]
        },
        layout: 'header'
    }]

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