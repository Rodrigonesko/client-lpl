import { Button } from "@mui/material"
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Upload = () => {
    return (
        <>
            <Button
                variant="contained"
                startIcon={<FileUploadIcon />}
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': {
                        bgcolor: 'black',
                        opacity: 0.8,
                    },
                }}
            >
                Upload
            </Button>
        </>
    )
}

export default Upload