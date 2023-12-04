import { Avatar, Box, Fade, IconButton, Tooltip, Typography } from "@mui/material"
import moment from "moment"
import React, { useState } from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import ModalExpandirImagem from "../Modal/ModalExpandirImagem";
import { grey } from "@mui/material/colors";

const IndividualMessage = ({ item, index, name, setMessageReplayed, loadSelectedRespondedMessage }) => {

    const [showReplyButton, setShowReplyButton] = useState(false);

    const handleMessageReplayed = (mensagem, idMessage) => {
        setMessageReplayed({
            mensagem,
            idMessage
        })
    }

    const handleScroll = (idMessage) => {
        loadSelectedRespondedMessage(idMessage)
    }

    const isImageByExtension = (url) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp', '.tiff', '.ico', '.exif', '.raw'];

        const fileExtension = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2); // Extrai a extensão do arquivo da URL

        return imageExtensions.includes('.' + fileExtension.toLowerCase());
    }

    return (
        <Box
            key={index}
            m={1}
            style={{ textAlign: item.remetente === name ? 'right' : 'left' }}
            id={`responseMessage_${item._id}`}
        >
            {
                item.remetente !== name && (
                    <Avatar
                        sx={{
                            width: '30px',
                            height: '30px',
                            float: item.remetente === name ? 'right' : 'left',
                            margin: '0 10px 0 0',
                        }}
                        alt={item.remetente}
                        src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${item.remetente.split(' ').join('%20')}.jpg`}
                    />
                )
            }

            <Typography color="GrayText">{item.remetente}</Typography>

            <div
                onMouseEnter={() => setShowReplyButton(true)}
                onMouseLeave={() => setShowReplyButton(false)}
            >

                <Typography
                    style={{
                        display: 'inline-block',
                        backgroundColor: item.remetente === name ? '#42a5f5' : 'gray',
                        color: 'white',
                        padding: '10px',
                        borderRadius: item.remetente === name ? '10px 0 10px 10px' : '0 10px 10px 10px',
                        maxWidth: '80%',
                    }}
                >
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {item.resposta && (
                            <div onClick={() => handleScroll(item.resposta.idMessage)}>
                                <Typography
                                    sx={{
                                        ':hover': { cursor: 'pointer', bgcolor: '#1976d2' },
                                        transition: 'ease 0.3s',
                                    }}
                                    borderRadius={'3px'}
                                    p={1}
                                    border={'1px solid #1565c0'}
                                    borderTop={'5px solid #1565c0'}
                                >
                                    {item?.resposta?.mensagem}
                                </Typography>
                            </div>
                        )}

                        <Typography component="div" style={{ whiteSpace: 'pre-line' }}>
                            {item.tipo === 'Arquivo' ? (
                                isImageByExtension(`${process.env.REACT_APP_CHAT_SERVICE}/media/${item.caminhoArquivo}`) ? (
                                    <ModalExpandirImagem url={`${process.env.REACT_APP_CHAT_SERVICE}/media/${item.caminhoArquivo}`} />
                                ) : (
                                    <a target="_blank" href={`${process.env.REACT_APP_CHAT_SERVICE}/media/${item.caminhoArquivo}`}>
                                        {item.mensagem}
                                    </a>
                                )
                            ) : (
                                item.mensagem
                            )}
                        </Typography>
                        <Typography textAlign={'end'} fontSize='10px' color={grey[100]}>{moment(item.horario).format('HH:mm DD/MM/YYYY')}</Typography>
                    </div>
                </Typography>
                <Fade in={showReplyButton} unmountOnExit mountOnEnter>
                    <Tooltip title="Responder">
                        <IconButton sx={{ m: 1 }} size="small" onClick={() => handleMessageReplayed(item.mensagem, item._id)}>
                            <ReplyIcon />
                        </IconButton>
                    </Tooltip>
                </Fade>
            </div>
        </Box>
    )
}

export default IndividualMessage