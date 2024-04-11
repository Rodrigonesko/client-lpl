import { Card, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { filterUsers } from '../../../_services/user.service';

const CardAniversarioEmpresa = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const users = await filterUsers({
                    dataAdmissao: { $regex: moment('2024-04-11').format("MM-DD") },
                    inativo: { $ne: true }
                });
                console.log(users);
                setUsers(users);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();

    }, [])

    return (
        <Card
            sx={{
                minWidth: 275,
                mb: `20px`,
                bgcolor: grey[300],
                borderRadius: `10px`
            }}
        >
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                >
                    Aniversário de empresa!
                </Typography>
                <Typography
                    sx={{
                        fontSize: 14,
                        textAlign: `start`
                    }}
                    color="text.secondary"
                    gutterBottom
                >
                    {users.map(user => (
                        <Typography key={user.id}>
                            {user.name} - {moment(user.dataAdmissao).format("DD/MM")} - {moment().year() - moment(user.dataAdmissao).year()} anos
                        </Typography>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardAniversarioEmpresa;