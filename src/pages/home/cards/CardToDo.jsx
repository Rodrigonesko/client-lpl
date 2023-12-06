import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import { getUsers } from '../../../_services/user.service';

const CardToDo = ({ data, flushHook }) => {
    const [atividadesFazer, setAtividadesFazer] = useState([]);
    const [user, setUser] = useState({ name: data.name }); // Defina o usuário desejado

    const fetchInfoUser = async () => {
        try {
            const aFazer = await getUsers();
            const toDo = aFazer.filter(data => data.prorrogacao);
            setAtividadesFazer(toDo);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchInfoUser();
    }, [flushHook])

    const color = grey[300];

    const aFazer = atividadesFazer.filter(data => data.name === user.name);

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, bgcolor: color, borderRadius: `10px` }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Em Desenvolvimento!
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {aFazer.map(data => (
                        <Typography key={data.id}>
                            {
                                (data.nome) - (data.admissao.acao)
                            }
                        </Typography>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardToDo;
