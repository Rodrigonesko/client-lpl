import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import { grey } from '@mui/material/colors';
import moment from "moment";
import { getAllAniversariantes } from '../../../_services/user.service';

const CardAniversariantes = ({ data, flushHook }) => {

    // const [aniversarioEmpresa, setAniversarioEmpresa] = useState([])
    const [aniversario, setAniversario] = useState([])

    const fetchInfoUser = async () => {
        try {
            const aniversarios = await getAllAniversariantes();

            // const aniversariantesEmpresaComData = aniversarios.filter(data => data.dataAdmissao);
            // setAniversarioEmpresa(aniversariantesEmpresaComData)
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

    const mesAtual = moment().month() + 1;
    // const anoAtual = moment().year()

    // const aniversariantesNaEmpresa = aniversarioEmpresa.filter(data => {
    //     const anoAniversario = moment(data.dataAdmissao).year();
    //     return anoAniversario === anoAtual;
    // });

    const aniversariantesNoMesAtual = aniversario.filter(data => {
        const mesAniversario = moment(data.dataAniversario).month() + 1;
        return mesAniversario === mesAtual;
    }).sort((a, b) => {
        const dataA = moment(a.dataAniversario).format("MM-DD");
        const dataB = moment(b.dataAniversario).format("MM-DD");
        return dataA.localeCompare(dataB);
    });

    return (
        <Card sx={{ minWidth: 275, mb: `20px`, bgcolor: color, borderRadius: `10px` }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Aniversariante do mês!
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {aniversariantesNoMesAtual.map(data => (
                        <Typography key={data.id}>
                            {data.nome} - {moment(data.dataAniversario).format("DD/MM")}
                        </Typography>
                    ))}
                </Typography>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {aniversariantesNaEmpresa.map(data => (
                        <Typography key={data.id}>
                            {data.nome} - {moment(data.dataAdmissao).format("DD/MM/YYYY")}
                        </Typography>
                    ))}
                </Typography> */}
            </CardContent>
        </Card>
    );
}

export default CardAniversariantes;
