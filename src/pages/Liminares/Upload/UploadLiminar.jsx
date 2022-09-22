import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import * as XLSX from 'xlsx';
import Axios from 'axios'
import './UploadLiminar.css'

const UploadLiminar = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')

    const send = async e => {
        e.preventDefault()

        setStatus('Enviando...')

        const data = await file.arrayBuffer()

        const workbook = XLSX.read(data, { type: 'array' })

        const firsSheetName = workbook.SheetNames[0]

        const worksheet = workbook.Sheets[firsSheetName]

        const result = XLSX.utils.sheet_to_json(worksheet)

        try {

            const send = await Axios.post(`${process.env.REACT_APP_API_KEY}/liminares/upload`, { result }, { withCredentials: true })

            if (send.status === 200) {
                setStatus(send.data.message)
            }

        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado tente novamente!')
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
                            <h2>Upload Liminares</h2>
                        </div>
                        <div>
                            <label htmlFor="file-liminar">Arquivo: </label>
                            <input type="file" name="file-liminar" id="file-liminar" onChange={e => setFile(e.target.files[0])} />
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


export default UploadLiminar