import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { v4 as uuidv4 } from "uuid";
import Axios from 'axios'

const chunkSize = 1048576 * 3;

const Agd = () => {

    const [csvFile, setCsvFile] = useState();

    const [showProgress, setShowProgress] = useState(false);
    const [counter, setCounter] = useState(1);
    const [fileToBeUpload, setFileToBeUpload] = useState({});
    const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
    const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
    const [progress, setProgress] = useState(0);
    const [fileGuid, setFileGuid] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [chunkCount, setChunkCount] = useState(0);

    useEffect(() => {

        if (fileSize > 0) {
            setShowProgress(true);
            fileUpload(counter);
        }
    }, [fileToBeUpload, progress]);

    const getFileContext = (e) => {
        const _file = e.target.files[0];
        setFileSize(_file.size);
        const _totalCount =
            _file.size % chunkSize == 0
                ? _file.size / chunkSize
                : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
        setChunkCount(_totalCount);
        setFileToBeUpload(_file);
        const _fileID = uuidv4() + "." + _file.name.split(".").pop();
        setFileGuid(_fileID);
    };
    const fileUpload = () => {
        setCounter(counter + 1);
        if (counter <= chunkCount) {
            var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
            uploadChunk(chunk);
        }
    };
    const uploadChunk = async (chunk) => {
        try {
            const response = await Axios.post(
                "https://localhost:44356/weatherforecast/UploadChunks",
                chunk,
                {
                    params: {
                        id: counter,
                        fileName: fileGuid,
                    },
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = response.data;
            if (data.isSuccess) {
                setBeginingOfTheChunk(endOfTheChunk);
                setEndOfTheChunk(endOfTheChunk + chunkSize);
                if (counter == chunkCount) {
                    console.log("Process is complete, counter", counter);
                    await uploadCompleted();
                } else {
                    var percentage = (counter / chunkCount) * 100;
                    setProgress(percentage);
                }
            } else {
                console.log("Error Occurred:", data.errorMessage);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const uploadCompleted = async () => {
        var formData = new FormData();
        formData.append("fileName", fileGuid);
        const response = await Axios.post(
            "https://localhost:44356/weatherforecast/UploadComplete",
            {},
            {
                params: {
                    fileName: fileGuid,
                },
                data: formData,
            }
        );
        const data = response.data;
        if (data.isSuccess) {
            setProgress(100);
        }
    };

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
                            <input type="file" name="file-rn" id="file-rn" onChange={getFileContext} />
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