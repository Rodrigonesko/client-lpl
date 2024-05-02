import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useContext } from "react"
import { PropostasContext } from "../context"

const TabelaTeleEntrevista = ({ loading }) => {

    const { propostas } = useContext(PropostasContext)

    return (
        <Table
            size="small"
        >
            <TableHead
                sx={{
                    backgroundColor: '#f5f5f5'
                }}
            >
                <TableRow>
                    <TableCell>
                        Recebimento
                    </TableCell>
                    <TableCell>
                        Vigência
                    </TableCell>
                    <TableCell>
                        Proposta
                    </TableCell>
                    <TableCell>
                        Nome
                    </TableCell>
                    <TableCell>
                        Associado
                    </TableCell>
                    <TableCell>
                        Sexo
                    </TableCell>
                    <TableCell>
                        Idade
                    </TableCell>
                    <TableCell>
                        Contrato
                    </TableCell>
                    <TableCell>
                        Status
                    </TableCell>
                    <TableCell>
                        Risco
                    </TableCell>
                    <TableCell>

                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    !loading ? propostas.map((proposta, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {proposta.dataRecebimento}
                            </TableCell>
                            <TableCell>
                                {proposta.vigencia}
                            </TableCell>
                            <TableCell>
                                {proposta.proposta}
                            </TableCell>
                            <TableCell>
                                {proposta.beneficiario.nome}
                            </TableCell>
                            <TableCell>
                                {proposta.infoAdicional.tipoAssociado}
                            </TableCell>
                            <TableCell>
                                {proposta.beneficiario.sexo}
                            </TableCell>
                            <TableCell>
                                {proposta.beneficiario.idade}
                            </TableCell>
                            <TableCell>
                                {proposta.infoAdicional.tipoContrato}
                            </TableCell>
                            <TableCell>
                                {proposta.status}
                            </TableCell>
                            <TableCell>
                                {proposta.infoAdicional.riscoBeneficiario}
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        console.log('Clicou em editar')
                                    }}
                                >
                                    Editar
                                </Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={1}>
                                Carregando...
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}

export default TabelaTeleEntrevista