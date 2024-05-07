import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export const createPdf = () => {

    pdfMake.createPdf({
        content: [
            {
                text: 'This is a header, using header style',
                style: 'header'
            },
            'This is a standard paragraph',
            {
                text: 'This is a subheader, using subheader style',
                style: 'subheader'
            }
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            subheader: {
                fontSize: 18,
                bold: true
            }
        }
    }).open()

}