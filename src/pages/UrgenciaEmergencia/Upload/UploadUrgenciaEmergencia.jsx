import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import { CircularProgress } from "@mui/material";

const UploadUrgenciaEmergencia = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const send = async e => {
        e.preventDefault()

        try {

            setLoading(true)

            let formData = new FormData()

            formData.append('file', file, file.name)

            setStatus('Enviando...')


            console.log(formData);

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/urgenciaEmergencia/upload`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            console.log(result);

            if (result.status === 200) {
                setStatus(`${result.data.quantidade} novas propostas adicionadas!`)
            }

            setLoading(false)

        } catch (error) {
            console.log(error);
            setStatus(error.response.data.error)
        }
    }

    return (
        <>
            <Sidebar>
                <section className="section-upload-container">

                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute' }} />
                        ) : null
                    }

                    <div className="upload-container">
                        {
                            status !== '' ? (
                                <div>
                                    <strong>{status}</strong>
                                </div>
                            ) : null
                        }
                        <form action="" method="post">
                            <div className="title">
                                <h2>Upload Urgencia && Emergencia</h2>
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
            </Sidebar>
        </>
    )
}

export default UploadUrgenciaEmergencia