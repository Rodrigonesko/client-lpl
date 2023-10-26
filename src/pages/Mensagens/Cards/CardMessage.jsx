import { Box, Button, Card, CardContent, Container, Paper, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import { FaPlay } from "react-icons/fa";

const CardMessage = () => {

    const color = grey[300]

    const handleSave = async () => {

    }
    return (
        <>
            <Container maxWidth>
                <Box>
                    <Card component={Paper} sx={{ bgcolor: color, borderRadius: `10px`, height: '90vh' }}>
                        <CardContent >
                            <Typography variant="h5" component="div">
                                Nome da Pessoa / Grupo!
                            </Typography>
                            <br />
                            <form action="" >
                                <TextField type='text' margin='normal' name="mensagem" size='small' label='Digite uma mensagem' />
                                <Button autoFocus variant="contained" color="primary" onClick={handleSave} sx={{ marginLeft: `15px` }} ><FaPlay /></Button>
                            </form>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    )
}

export default CardMessage