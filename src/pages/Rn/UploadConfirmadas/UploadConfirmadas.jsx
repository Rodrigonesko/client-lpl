import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import * as XLSX from 'xlsx';
import Axios from 'axios'
import './UploadConfirmadas.css'

const UploadConfirmadas = () => {


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

        const sendData = result.map(e => {
            
            const proposta = e.PROPOSTA
            const respostaBeneficiario = e['RESPOSTA BENEFICIARIO']

            const dados = {
                proposta,
                respostaBeneficiario
            }
            
            return dados
            
        })

        try {
            
            const send = await Axios.put(`${process.env.REACT_APP_API_KEY}/rn/updateConfirmadas`, {sendData}, {withCredentials: true})

            if(send.status === 200){
                setStatus('Rns atualizadas com sucesso!')
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
                            <h2>Upload de Rn Confirmadas</h2>
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

export default UploadConfirmadas