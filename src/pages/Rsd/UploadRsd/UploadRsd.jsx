import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './UploadRsd.css'
import { subirPedidos, uploadRsd } from "../../../_services/rsd.service";
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@mui/material";

const UploadRsd = () => {

    const [file, setFile] = useState()
    const [status, setStatus] = useState('')
    const [valorCorte, setValorCorte] = useState(20000)
    const [pedidos, setPedidos] = useState([])
    const [open, setOpen] = useState(false)

    const send = async e => {
        e.preventDefault()

        try {

            let formData = new FormData()

            formData.append('file', file, file.name)
            formData.append('corte', valorCorte)

            setStatus('Enviando...')

            const result = await uploadRsd(formData)

            setStatus(`Novos pedidos: ${result.pedidos.length}`)

            setPedidos(result.pedidos)

        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado')
        }

    }

    const subir = async () => {
        try {
            const result = await subirPedidos({
                pedidos
            })

            setStatus(`Foram adicionados ${result.pedidos.length} pedidos`)
            setOpen(true)


        } catch (error) {
            console.log(error);
            setStatus('Algo deu errado')
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Sidebar>
                <section className="section-upload-container">
                    {status !== '' ? (
                        <div className="result">
                            <p>{status}</p>
                            {
                                status !== 'Enviando...' ? (
                                    <Button type='submit' onClick={subir} variant='contained' size='large'>Subir</Button>
                                ) : (
                                    <CircularProgress />
                                )
                            }
                        </div>
                    ) : null}
                    <div className="upload-container">
                        <form action="" method="post" encType="multipart/form-data">
                            <div className="title">
                                <h2>Upload da Fila PJ e PF</h2>
                            </div>
                            <div>
                                <label htmlFor="file-rn">Arquivo: </label>
                                <input type="file" name="file-rn" id="file-rn" onChange={e => setFile(e.target.files[0])} />
                            </div>
                            <div>
                                <label htmlFor="valor-corte">Valor de Corte: </label>
                                <input type="number" defaultValue={valorCorte} name='valor-corte' id='valor-corte' onKeyUp={e => setValorCorte(e.target.value)} />
                            </div>
                            <div className="container-btns">
                                <Button type='submit' onClick={send} variant='contained' size='large' >Enviar</Button>
                            </div>
                        </form>
                    </div>
                    <div className="pedidos-tabela">
                        {

                            status !== 'Enviando...' ? (
                                <table className="table-novos-pedidos">
                                    <thead>
                                        <tr>
                                            <th>Pedido</th>
                                            <th>Nome</th>
                                            <th>Protocolo</th>
                                            <th>Valor apresentado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pedidos.map(e => {
                                                return (
                                                    <tr>
                                                        <td>{e[0]}</td>
                                                        <td>{e[8]}</td>
                                                        <td>{e[11]}'</td>
                                                        <td>{e[9]}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                            ) : (
                                <CircularProgress />
                            )
                        }
                    </div>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{status}</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>Fechar</Button>
                        </DialogActions>
                    </Dialog>
                </section>
            </Sidebar>
        </>

    )
}

export default UploadRsd