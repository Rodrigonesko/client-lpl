import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import * as XLSX from 'xlsx';
import Axios from 'axios'


const UploadElegibilidade = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    
    const send = async e => {
        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)

            setStatus('Enviando...')

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/elegibilidade/upload`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            console.log(result.data);

            if (result.status == 200) {
                setStatus(`Novos pedidos: ${result.data.qtd}`)
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
                            <h2>Upload Elegibilidade</h2>
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

export default UploadElegibilidade