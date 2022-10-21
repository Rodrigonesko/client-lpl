import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import * as XLSX from 'xlsx';
import Axios from 'axios'


const UploadRsd = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [valorCorte, setValorCorte] = useState(20000)

    const send = async e => {
        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)
            formData.append('corte', valorCorte)

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/rsd/upload`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            console.log(result);

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
                    <form action="" method="post" encType="multipart/form-data">
                        <div className="title">
                            <h2>Upload da Fila PJ e PF</h2>
                        </div>
                        <div>
                            <label htmlFor="file-rn">Arquivo: </label>
                            <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                        </div>
                        <div>
                            <label htmlFor="valor-corte">Valor de Corte: </label>
                            <input type="number" defaultValue={valorCorte} name='valor-corte' id='valor-corte' onKeyUp={e => setValorCorte(e.target.value)} />
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

export default UploadRsd