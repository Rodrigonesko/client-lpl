import { Avatar, Chip, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ModalEditarDados from "./ModalEditarDados";
import { green, red } from "@mui/material/colors";


const TableUsers = ({
    users,
    loading,
    dense
}) => {
    return (
        <TableContainer
            sx={{
                mt: 2,
            }}
        >
            {
                !loading ? (
                    <Table
                        sx={{
                            minWidth: 650,
                        }}
                        size={dense ? 'small' : 'medium'}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    backgroundColor: '#F5F5F5',
                                }}
                            >
                                <TableCell
                                    sx={{
                                        width: 50,
                                    }}
                                ></TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Célula</TableCell>
                                <TableCell>Ativo</TableCell>
                                <TableCell>Editar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell
                                        sx={{
                                            width: 50,
                                        }}
                                    >
                                        <Avatar
                                            alt={user.name}
                                            src={`${process.env.REACT_APP_API_KEY}/media/profilePic/${user.name.split(' ').join('%20')}.jpg`}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {user.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {user.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{user.atividadePrincipal}</TableCell>
                                    <TableCell>{user.inativo ? <Chip label='Inativo' sx={{ color: red[800], backgroundColor: red[100] }} /> : <Chip label='Ativo' sx={{ color: green[800], backgroundColor: green[100] }} />}</TableCell>
                                    <TableCell>
                                        <ModalEditarDados user={user} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <LinearProgress
                        color="inherit"
                        sx={{
                            mt: 2
                        }}
                    />
                )
            }
        </TableContainer>
    )
}

export default TableUsers;