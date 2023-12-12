import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { getAllItens } from '../../../_services/admissaoDemissao.service';

const CardToDo = ({ data, flushHook }) => {
    const [atividadesFazer, setAtividadesFazer] = useState([]);

    const fetchInfoUser = async () => {
        try {
            const aFazer = await getAllItens()
            const fazer = aFazer.filter(data => data.acao)
            setAtividadesFazer(fazer);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchInfoUser();
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
                            {data.nome} - {data.acao}
                        </Typography>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardToDo;
