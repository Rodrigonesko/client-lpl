import React, { useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import moment from "moment";
import { getAllAniversariantes } from '../../../_services/user.service';

const CardAniversariantes = ({ data }) => {

    // const [dataUser, setDataUser] = useState([])

    // const calcularAniversario = () => {
    //     setDataUser(getAllAniversariantes())

    // }

    const color = grey[300];
    const mesAtual = moment().month() + 1;
    const mesAniversario = moment(data.dataAniversario).month() + 1;

    if (mesAniversario === mesAtual) {
        // const mostrarAniversario = `${data.name} - ${moment(data.dataAniversario).format('DD/MM')}`;
        return (
            <Card sx={{ minWidth: 275, mb: `20px`, bgcolor: color, borderRadius: `10px` }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Aniversariante do mês!
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Nomes abaixo
                        <br />
                        {/* {mostrarAniversario} */}
                        {/* {dataUser.map(data => {
                            return (
                                <Typography>
                                    {data.name}
                                    {data.dataAniversario}
                                </Typography>
                            )
                        })} */}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
    return null;
}

export default CardAniversariantes;
