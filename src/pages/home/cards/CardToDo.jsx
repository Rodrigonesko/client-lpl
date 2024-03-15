import React, { useEffect, useState } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, Tooltip, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { getAllItens } from '../../../_services/admissaoDemissao.service';
import { getAgendaToDo, updateAgendaCheck } from '../../../_services/agenda.service';
import moment from 'moment';

const CardToDo = ({ data, flushHook, setFlushHook }) => {

    const [atividadesFazer, setAtividadesFazer] = useState([]);
    const [atividadesFazerAgenda, setAtividadesFazerAgenda] = useState([]);

    const fetchInfoUser = async () => {
        try {
            const aFazer = await getAllItens()
            const fazer = aFazer.filter(data => data.acao)
            setAtividadesFazer(fazer);
            const aFazerAgenda = await getAgendaToDo()
            console.log(aFazerAgenda);
            const fazerAgenda = aFazerAgenda.filter(item => item.descricao)
            setAtividadesFazerAgenda(fazerAgenda)
        } catch (error) {
            console.error(error);
        }
    }

    let concluido = false

    const handleFeitoAgenda = async (_id) => {
        try {
            const result = await updateAgendaCheck({ _id, concluido: !concluido })
            console.log(result)
            concluido = (!concluido)
            setFlushHook(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInfoUser();
        setFlushHook(false);
    }, [flushHook])

    const color = grey[300];

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, bgcolor: color, borderRadius: `10px` }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    A Fazer!
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {atividadesFazer.map(data => (
                        <Typography key={data.id}>
                            {data.nome} - {
                                data.negrito ? (
                                    <strong>{data.acao}</strong>
                                ) : (
                                    data.acao
                                )}
                        </Typography>
                    ))}
                    {atividadesFazerAgenda.map(item => (
                        <Typography key={item._id} sx={{ alignItems: 'center' }} >
                            {item.descricao} - {moment(item.data).format('DD/MM/YYYY')} {
                                <Tooltip title='Concluido'>
                                    <FormControlLabel value={item.concluido}
                                        control={<Checkbox value={item.concluido} checked={item.concluido} />}
                                        labelPlacement="start"
                                        onClick={() => {
                                            handleFeitoAgenda(item._id)
                                        }} />
                                </Tooltip>
                            }
                        </Typography>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardToDo;
