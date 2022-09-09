import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './UploadRn.css'
import * as XLSX from 'xlsx';
import Axios from 'axios'


const UploadRn = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')

    const send = async e => {
        e.preventDefault()

        const data = await file.arrayBuffer()

        const workbook = XLSX.read(data, { type: 'array' })

        const firsSheetName = workbook.SheetNames[0]

        const worksheet = workbook.Sheets[firsSheetName]

        const result = XLSX.utils.sheet_to_json(worksheet)

        try {

            setStatus('Enviando...')

            const send = await Axios.post('http://10.0.121.55:3001/rn/upload', { result }, { withCredentials: true })

            if(send.status === 200){
                setStatus(send.data.message)
                console.log(send);
            }

        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado')
        }

    }



    return (
        <>
            <Sidebar />
            <section className="section-upload-container">
                {status != '' ? (
                    <div className="result">
                        <p>{status}</p>
                    </div>
                ) : null}
                <div className="upload-container">
                    <form action="" method="post">
                        <div className="title">
                            <h2>Upload de Rn</h2>
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