import React, {useState} from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";

const MigracaoTele = () => {

    const [file, setFile] = useState()

    const send = async e => {
        try {

            e.preventDefault()

            let formData = new FormData()

            formData.append('file', file, file.name)

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/upload/propostas`, formData, { headers: { "Content-Type": `multipart/form-data; boundary=${formData._boundary}` }, withCredentials: true })

            console.log(result);

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Sidebar></Sidebar>
            <form action="" method="post" encType="multipart/form-data">
                <div className="title">
                    <h2>Migracao de base</h2>
                </div>
                <div>
                    <label htmlFor="file-rn">Arquivo: </label>
                    <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                </div>
                <div className="container-btns">
                    <button className="btn" onClick={send} >Propostas</button>
                    <button className="btn" onClick={send} >Dados Entrevista</button>
                    <button className="btn" onClick={send} >Cids</button>
                </div>
            </form>
        </>

    )
}

export default MigracaoTele