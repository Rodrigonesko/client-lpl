import React, { useEffect, useState } from 'react';
import { Card, CardContent, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import moment from "moment";
import { getAllAniversariantes } from '../../../_services/user.service';

const CardPessoasGrupos = ({ data, flushHook }) => {

    const [aniversario, setAniversario] = useState([])

    const fetchInfoUser = async () => {
        try {
            const aniversarios = await getAllAniversariantes();


            const aniversariantesComData = aniversarios.filter(data => data.dataAniversario);
            setAniversario(aniversariantesComData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchInfoUser()
    }, [flushHook])

    const color = grey[300];
    const color1 = grey[400];

    const mesAtual = moment().month() + 1;


    const aniversariantesNoMesAtual = aniversario.filter(data => {
        const mesAniversario = moment(data.dataAniversario).month() + 1;
        return mesAniversario === mesAtual;
    });

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, bgcolor: color, borderRadius: `10px`, height: `83vh` }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Grupos / Pessoas
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: color1, borderRadius: '15px' }}>
                    {[1, 2, 3].map((value) => (
                        <ListItemButton>
                            <ListItem key={value} disableGutters >
                                <ListItemText primary={`Pessoa ${value}`} />
                            </ListItem>
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default CardPessoasGrupos;
