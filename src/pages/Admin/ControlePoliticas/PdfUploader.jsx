import { useRef, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { FaRegFilePdf } from 'react-icons/fa'
import { MdOutlineUnarchive } from 'react-icons/md'

const PdfUploader = ({ setFile, file }) => {

    const fileInputRef = useRef(null)
    const [onDrag, setOnDrag] = useState(false)

    const handleDrop = (e) => {
        e.preventDefault()
        setFile(e.dataTransfer.files[0]);
        setOnDrag(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setOnDrag(true)
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    return (
        <Box
            component={Paper}
            elevation={2}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => {
                setOnDrag(false)
            }}
            p={10}
            onClick={handleClick}
            bgcolor={onDrag ? 'red' : ''}
            color={onDrag ? 'white' : ''}
        >
            {
                onDrag ? (
                    <Typography>
                        Solte o pdf <MdOutlineUnarchive />
                    </Typography>
                ) : null
            }
            {
                file ? (
                    <object data={URL.createObjectURL(file)} type="application/pdf" height={500} >
                        PDF
                    </object>
                ) : (
                    <Typography>
                        Arraste e solte o pdf aqui <FaRegFilePdf />
                    </Typography>
                )
            }

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                style={{ display: 'none' }}
            />
        </Box >
    )
}

export default PdfUploader