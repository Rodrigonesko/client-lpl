import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import * as XLSX from 'xlsx';
import moment from "moment/moment";

const ContatosProvisorios2 = () => {

    const [file, setFile] = useState()

    const send = async e => {
        e.preventDefault()

        const data = await file.arrayBuffer()

        const workbook = XLSX.read(data, { type: 'array' })

        const firsSheetName = workbook.SheetNames[0]

        const worksheet = workbook.Sheets[firsSheetName]

        const result = XLSX.utils.sheet_to_json(worksheet)

        try {

            let csv = "Name; Given Name; Additional Name; Family Name; Yomi Name; Given Name Yomi; Additional Name Yomi; Family Name Yomi; Name Prefix; Name Suffix; Initials; Nickname; Short Name; Maiden Name; Birthday; Gender; Location; Billing Information; Directory Server; Mileage; Occupation; Hobby; Sensitivity; Priority; Subject; Notes; Language; Photo; Group Membership; Phone 1 - Type; Phone 1 - Value\n";

            result.forEach(e => {

                let numero = e.CELULAR?.toString().slice(0, 9)

                let ddd = e.DDD?.toString().replace('0', '')

                
                let telefone = `(${ddd}) ${numero}`

                let mo = e.MO
                let nome = e.ASSOCIADO

                console.log(telefone,ddd, numero , mo, nome);

                let data = new Date()

                data = moment(data).format('DD/MM/YYYY')

                let dataArr = data.split('/')

                let mes = dataArr[1]
                let ano = dataArr[2]

                csv += `${mes}/${ano} - ${mo} - ${nome}`
                csv += `;${mes}/${ano} - ${mo} - ${nome}`
                csv += `;;;;;;;;;;;;;;;;;;;;;;;;;;`
                csv += `;* myContacts;`
                csv += `; ${telefone}`
                csv += `\n`

            })

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'contatos.csv';
            hiddenElement.click();
        }

        catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-upload-container">
                <div className="upload-container">
                    <form action="" method="post">
                        <div className="title">
                            <h2>Contatos Provisórios</h2>
                        </div>
                        <div>
                            <label htmlFor="file-rn">Arquivo: </label>
                            <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                        </div>
                        <div className="container-btns">
                            <button className="btn" onClick={send} >Enviar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ContatosProvisorios2