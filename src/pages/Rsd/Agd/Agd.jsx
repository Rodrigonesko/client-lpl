import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'

const Agd = () => {

    const [csvFile, setCsvFile] = useState();


    const submit = (element) => {
        element.preventDefault()
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
        }

        reader.readAsText(file);
    }

    return (
        <>
            <Sidebar />
            <section className="section-upload-container">
                <div className="upload-container">
                    <form action="" method="post" encType="multipart/form-data">
                        <div className="title">
                            <h2>Upload AGD</h2>
                        </div>
                        <div>
                            <label htmlFor="file-rn">Arquivo: </label>
                            <input type="file" name="file-rn" id="file-rn" onChange={e => setCsvFile(e.target.files[0])} />
                        </div>
                        <div className="container-btns">
                            <button className="btn" onClick={submit}>Enviar</button>
                        </div>
                    </form>
                </div>


            </section>
        </>

    )
}

export default Agd