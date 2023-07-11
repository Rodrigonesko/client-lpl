import { useState, useRef } from "react"
import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import { MdCancel } from 'react-icons/md'

const DragAndDrop = ({ file, setFile, fontColor, bgColor, textOnDrag, text, textOnDrop }) => {

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

    const handleRemoveFile = () => {
        setFile(null)
    }

    return (
        <>
            {
                file ? (
                    <Box textAlign='end'>
                        <Tooltip title='Remover arquivo'>
                            <IconButton onClick={handleRemoveFile} ><MdCancel /></IconButton>
                        </Tooltip>
                    </Box>
                ) : null
            }
            <Box
                component={Paper}
                elevation={2}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={() => {
                    setOnDrag(false)
                }}
                p={6}
                onClick={handleClick}
                bgcolor={onDrag ? bgColor : ''}
                color={onDrag ? 'white' : ''}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 4,
                    borderWidth: 2,
                    borderRadius: 2,
                    outline: "none",
                    transition: "0.3s ease",
                    cursor: "pointer",
                    '&:hover': {
                        backgroundColor: 'lighGray',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {
                    onDrag ? (
                        <Typography>
                            {textOnDrag}
                        </Typography>
                    ) : null
                }
                {
                    file ? (
                        <Typography fontWeight='bold' p={2} color={fontColor}>
                            {textOnDrop}
                        </Typography>
                    ) : (
                        <Typography fontWeight='bold' >
                            {text}
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
        </>

    )
}

export default DragAndDrop