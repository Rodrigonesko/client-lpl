import { Button, FormControl, InputLabel, MenuItem, Select, TableCell, TableRow } from "@mui/material"
import gerarPdf from "../../Pdf/Pdf"
import moment from "moment"
import { useState } from "react"
import { updatePropostaEntrevista } from "../../../../_services/teleEntrevistaV2.service"
import ModalVoltarEntrevista from "./ModalVoltarEntrevista"

const Linha = ({ entrevista }) => {

    const [data, setData] = useState(entrevista)

    return (
        <TableRow style={{ background: data.entrevistaQualidade ? 'lightgreen' : null }}>
            <TableCell>{data.proposta}</TableCell>
            <TableCell>{moment(data.dataEntrevista).format('DD/MM/YYYY')}</TableCell>
            <TableCell>{data.nome}</TableCell>
            <TableCell>{data.cpf}</TableCell>
            <TableCell>{data.idade}</TableCell>
            <TableCell>
                <FormControl size="small">
                    <InputLabel>Sexo</InputLabel>
                    <Select
                        value={data.idProposta.sexo}
                        label="Sexo"
                        onChange={async (e) => {
                            try {
                                await updatePropostaEntrevista({ _id: data.idProposta._id, sexo: e.target.value })
                                setData({ ...data, idProposta: { ...data.idProposta, sexo: e.target.value } })
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        <MenuItem value={"M"}>M</MenuItem>
                        <MenuItem value={"F"}>F</MenuItem>
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell>
                {
                    data.cancelado && (
                        <ModalVoltarEntrevista entrevista={entrevista} />
                    )
                }
            </TableCell>
            <TableCell><Button variant='contained' href={`/entrevistas/propostas/editar/${data._id}`} size='small' >Editar</Button>  </TableCell>
            {/* <TableCell><Button color='error' variant='contained' size='small' href={`/entrevistas/pdf2/${data.proposta}/${data.nome}`} target='_blank'>PDF</Button></TableCell> */}
            <TableCell><Button color='error' variant='contained' size='small' onClick={() => { gerarPdf(data._id) }}>PDF</Button></TableCell>
        </TableRow>
    )
}

export default Linha