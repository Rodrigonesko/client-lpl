import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './UploadEntrevistas.css'
import * as XLSX from 'xlsx';
import moment from "moment/moment";
import { CircularProgress } from "@mui/material";
import { uploadPropostas } from "../../../_services/teleEntrevista.service";

const UploadRn = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const send = async e => {
        e.preventDefault()

        const data = await file.arrayBuffer()

        const workbook = XLSX.read(data, { type: 'array' })

        const firsSheetName = workbook.SheetNames[0]

        const worksheet = workbook.Sheets[firsSheetName]

        const result = XLSX.utils.sheet_to_json(worksheet)

        try {

            setStatus('Enviando...')

            setLoading(true)

            const send = await uploadPropostas({ result })

            setStatus(send.message)
            console.log(send);

            let csv = "Name; Given Name; Additional Name; Family Name; Yomi Name; Given Name Yomi; Additional Name Yomi; Family Name Yomi; Name Prefix; Name Suffix; Initials; Nickname; Short Name; Maiden Name; Birthday; Gender; Location; Billing Information; Directory Server; Mileage; Occupation; Hobby; Sensitivity; Priority; Subject; Notes; Language; Photo; Group Membership; Phone 1 - Type; Phone 1 - Value\n";

            result.forEach(e => {
                let telefone = `(${e.NUM_DDD_CEL}) ${e.NUM_CEL}`
                let proposta = e.NUM_PROPOSTA
                let nome = e.NOME_ASSOCIADO

                let data = new Date()

                data = moment(data).format('DD/MM/YYYY')

                let dataArr = data.split('/')

                let mes = dataArr[1]
                let ano = dataArr[2]

                csv += `${mes}/${ano} - ${proposta} - ${nome}`
                csv += `;${mes}/${ano} - ${proposta} - ${nome}`
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

            setLoading(false)

        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado')
            setLoading(false)
        }

    }

    return (
        <>
            <Sidebar />
            <section className="section-upload-container">
                {
                    loading ? (
                        <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }}></CircularProgress>
                    ) : null
                }
                {status !== '' ? (
                    <div className="result">
                        <p>{status}</p>
                    </div>
                ) : null}
                <div className="upload-container">
                    <form action="" method="post">
                        <div className="title">
                            <h2>Upload Tele Entrevista</h2>
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

export default UploadRn