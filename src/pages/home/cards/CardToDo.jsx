import React, { useEffect, useState } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, Tooltip, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { getAllItens } from '../../../_services/admissaoDemissao.service';
import { getAgendaToDo, updateAgendaCheck } from '../../../_services/agenda.service';

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
            const fazerAgenda = aFazerAgenda.filter(data => data.descricao)
            setAtividadesFazerAgenda(fazerAgenda)
        } catch (error) {
            console.error(error);
        }
    }

    const handleFeitoAgenda = async () => {
        try {
            let concluido = false
            const result = await updateAgendaCheck({ _id: data._id, concluido: !concluido })
            console.log(result)
            concluido = (!concluido)
            setFlushHook(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInfoUser();
        setFlushHook(false)
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
                    {atividadesFazerAgenda.map(data => (
                        <Typography key={data._id} sx={{ alignItems: 'center' }} >
                            {data.nome} - {data.descricao} - {
                                <Tooltip title='Concluido'>
                                    <FormControlLabel value={data.concluido}
                                        control={<Checkbox value={data.concluido} checked={data.concluido} />}
                                        labelPlacement="start"
                                        onClick={() => {
                                            handleFeitoAgenda(data._id)
                                            //Estou trazendo um _id errado, verificar amanhâ
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
