import { Box, Fade, IconButton, Tooltip, Typography } from "@mui/material"
import moment from "moment"
import {  useState } from "react";
import ReplyIcon from '@mui/icons-material/Reply';

const IndividualMessage = ({ item, index, name, setMessageReplayed }) => {

    const [showReplyButton, setShowReplyButton] = useState(false);

    const handleMessageReplayed = (mensagem, idMessage) => {
        setMessageReplayed({
            mensagem,
            idMessage
        })
    }

    const handleScroll = (idMessage) => {
        const responseMessage = document.getElementById(`responseMessage_${idMessage}`);

        if (responseMessage) {
            responseMessage.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    return (
        <Box
            key={index}
            m={1}
            style={{ textAlign: item.remetente === name ? 'right' : 'left' }}
            id={`responseMessage_${item._id}`}
        >
            <Typography color='GrayText' >{item.remetente}</Typography>
            {item.mensagem.includes('<img') ? (
                <div dangerouslySetInnerHTML={{ __html: item.mensagem }} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            ) : (
                <div
                    onMouseEnter={() => setShowReplyButton(true)}
                    onMouseLeave={() => setShowReplyButton(false)}
                >
                    <Typography
                        style={{
                            display: 'inline-block',
                            backgroundColor: item.remetente === name ? '#42a5f5' : 'gray',
                            color: 'white', padding: '10px',
                            borderRadius: '10px',
                            maxWidth: '80%'
                        }}

                    >
                        {
                            item.resposta && (
                                <div onClick={() => {
                                    handleScroll(item.resposta.idMessage)
                                }}>
                                    <Typography sx={{ ":hover": { cursor: 'pointer', bgcolor: '#1976d2' }, transition: 'ease 0.3s' }} borderRadius={'3px'} p={1} border={'1px solid #1565c0'} borderTop={'5px solid #1565c0'}>
                                        {item?.resposta?.mensagem}
                                    </Typography>
                                </div>
                            )
                        }
                        {

                            item.tipo === 'Arquivo' ? (
                                <a target="_blank" href={`${process.env.REACT_APP_CHAT_SERVICE}/media/${item.caminhoArquivo}`}>{ item.mensagem}</a>
                            ) : (
                                <>{item.mensagem}</>
                            )

                        }
                    </Typography>
                    {showReplyButton && (
                        <Fade in={showReplyButton} >
                            <Tooltip title="Responder">
                                <IconButton sx={{ m: 1 }} size="small" onClick={() => {
                                    handleMessageReplayed(item.mensagem, item._id)
                                }}>
                                    <ReplyIcon />
                                </IconButton>
                            </Tooltip>
                        </Fade >
                    )}
                </div>

            )
            }
            <Typography color='GrayText'>{moment(item.horario).format('HH:mm DD/MM/YYYY')}</Typography>
        </Box >
    )
}

export default IndividualMessage