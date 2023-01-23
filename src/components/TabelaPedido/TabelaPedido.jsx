import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import './TabelaPedido.css'
import Modal from 'react-modal'
import $ from 'jquery'

Modal.setAppElement('#root')

const TabelaPedido = ({ pedidos, protocolo, pacote, verificaPacote, finalizados, todos }) => {

    const [prioridade, setPrioridade] = useState(false)
    const [modalSalvar, setModalSalvar] = useState(false)
    const [modalInativar, setModalInativar] = useState(false)
    const [inativarPedido, setInativarPedido] = useState('')

    const devolvidoAmil = async e => {
        try {

            const motivoInativo = document.getElementById('motivo-inativo-pedido').value

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/devolverAmil`, {
                id: e,
                motivoInativo
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const voltarFase = async e => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/voltarFase`, {
                pedido: e
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                window.location.reload()
            }

        } catch (error) {
            console.log(error);
        }
    }

    const definirPrioridadeDossie = async (pedido, prioridade) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/prioridadeDossie`, {
                pedido: pedido,
                prioridade: prioridade.target.checked
            }, {
                withCredentials: true
            })

        } catch (error) {
            console.log(error);
        }
    }

    const editarPedido = async (id, pedido, cnpj, clinica, nf, valorApresentado, valorReembolsado, element) => {
        try {

            //console.log(element.target.parentElement.parentElement);

            let tr = element.target.parentElement.parentElement.children[5].firstChild.value

            clinica = tr

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/editar`, {
                pedido: id,
                pedidoEditado: pedido,
                nf,
                cnpj,
                clinica,
                valorApresentado,
                valorReembolsado
            }, {
                withCredentials: true
            })

            if (result.status === 200) {
                setModalSalvar(true)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const buscarClinica = async (cnpj, id) => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/clinica/busca`, { cnpj: cnpj }, { withCredentials: true })

            console.log(cnpj, id);

            console.log(result);

            document.getElementById(`clinica-${id}`).value = result.data.clinica.descricao

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <td colSpan={10} >
                <div>
                    <table className="table table-pedidos">
                        <thead className="table-header">
                            <tr>
                                <th>Pedido</th>
                                <th>Status</th>
                                <th>R$ Apresentado</th>
                                <th>R$ Reembolsado</th>
                                <th>CNPJ</th>
                                <th>Clínica</th>
                                <th>NF</th>
                                <th>Irregular</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Fila</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pedidos.map(e => {
                                    if (protocolo === e.protocolo && e.pacote === pacote) {
                                        if (finalizados && e.status === 'Finalizado') {
                                            return (
                                                <tr>
                                                    <td>{e.numero}</td>
                                                    <td>{e.status}</td>
                                                    <td>{Number(e.valorApresentado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{Number(e.valorReembolsado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{e.cnpj}</td>
                                                    <td>{e.clinica}</td>
                                                    <td>{e.nf}</td>
                                                    <td>{e.irregular}</td>
                                                    {
                                                        e.fase !== 'Finalizado' ? (
                                                            <>
                                                                <td><Link to={`/rsd/EditarPedido/${e._id}`} className='btn-editar-pedido'>Editar</Link></td>
                                                                <td><button className="botao-padrao-cinza" onClick={() => devolvidoAmil(e.numero)} >Devolvido Amil</button></td>
                                                            </>
                                                        ) : (
                                                            <td>
                                                                <button className="botao-padrao-cinza" onClick={() => {
                                                                    voltarFase(e.numero)
                                                                }} >Voltar Fase</button>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        e.statusPacote === 'Não iniciado' ? (
                                                            <td><input type="checkbox" name="checkbox-pedido" id={e.numero} value={e._id} className='checkbox-pedido' /></td>
                                                        ) : (
                                                            <td><input type="checkbox" name="prioridade-dossie" id={`prioridade-dossie-${e.numero}`} defaultChecked={e.prioridadeDossie} onClick={element => {
                                                                definirPrioridadeDossie(e.numero, element)
                                                            }} /><label htmlFor={`prioridade-dossie-${e.numero}`}> Prioridade Dossiê</label></td>
                                                        )
                                                    }

                                                </tr>
                                            )
                                        }
                                        if (!finalizados && e.status !== 'Finalizado') {
                                            return (
                                                <tr>
                                                    <td><input type="text" name="" id="" className="numero-pedido medium-width" defaultValue={e.numero} onChange={(element) => { e.numero = element.target.value }} /></td>
                                                    <td>{e.status}</td>
                                                    <td><input type="text" name="" id="" defaultValue={e.valorApresentado} onChange={(element) => { e.valorApresentado = element.target.value }} /></td>
                                                    <td>{Number(e.valorReembolsado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                    <td><input type="text" name="" id="" className="cnpj-pedido" defaultValue={e.cnpj} onKeyUp={(element) => {
                                                        e.cnpj = element.target.value
                                                        buscarClinica(element.target.value, e._id)
                                                    }} /></td>
                                                    <td><input type="text" name="" id={`clinica-${e._id}`} className="clinica-pedido" defaultValue={e.clinica} onChange={(element) => { e.clinica = element.target.value }} /></td>
                                                    <td><input type="text" name="" id="" className="nf-pedido small-width" defaultValue={e.nf} onChange={(element) => { e.nf = element.target.value }} /></td>
                                                    <td>{e.irregular}</td>
                                                    {
                                                        e.fase !== 'Finalizado' ? (
                                                            <>
                                                                <td><button className="btn-padrao-verde" onClick={(element) => {
                                                                    editarPedido(e._id, e.numero, e.cnpj, e.clinica, e.nf, e.valorApresentado, e.valorReembolsado, element)
                                                                }} >Salvar</button></td>
                                                                <td><button className="botao-padrao-cinza" onClick={() => {
                                                                    setModalInativar(true)
                                                                    setInativarPedido(e._id)
                                                                }} >Inativar</button></td>
                                                            </>
                                                        ) : (
                                                            <td>
                                                                <button className="botao-padrao-cinza" onClick={() => {
                                                                    voltarFase(e.numero)
                                                                }} >Voltar Fase</button>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        e.statusPacote === 'Não iniciado' ? (
                                                            <td><input type="checkbox" name="checkbox-pedido" id={e.numero} value={e._id} className='checkbox-pedido' /></td>
                                                        ) : (
                                                            <td><input type="checkbox" name="prioridade-dossie" id={`prioridade-dossie-${e.numero}`} defaultChecked={e.prioridadeDossie} onClick={element => {
                                                                definirPrioridadeDossie(e.numero, element)
                                                            }} /><label htmlFor={`prioridade-dossie-${e.numero}`}> Prioridade Dossiê</label></td>
                                                        )
                                                    }
                                                    <td>{e.fila}</td>

                                                </tr>
                                            )
                                        }
                                        if (todos) {
                                            return (
                                                <tr>
                                                    <td>{e.numero}</td>
                                                    <td>{e.status}</td>
                                                    <td>{Number(e.valorApresentado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{Number(e.valorReembolsado).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                    <td>{e.cnpj}</td>
                                                    <td>{e.clinica}</td>
                                                    <td>{e.nf}</td>
                                                    <td>{e.irregular}</td>
                                                    {
                                                        e.fase !== 'Finalizado' ? (
                                                            <>
                                                                <td><Link to={`/rsd/EditarPedido/${e._id}`} className='btn-editar-pedido'>Editar</Link></td>
                                                                <td><button className="botao-padrao-cinza" onClick={() => devolvidoAmil(e._id)} >Inativar</button></td>
                                                            </>
                                                        ) : (
                                                            <td>
                                                                <button className="botao-padrao-cinza" onClick={() => {
                                                                    voltarFase(e.numero)
                                                                }} >Voltar Fase</button>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        e.statusPacote === 'Não iniciado' ? (
                                                            <td><input type="checkbox" name="checkbox-pedido" id={e.numero} value={e._id} className='checkbox-pedido' /></td>
                                                        ) : (
                                                            <td><input type="checkbox" name="prioridade-dossie" id={`prioridade-dossie-${e.numero}`} defaultChecked={e.prioridadeDossie} onClick={element => {
                                                                definirPrioridadeDossie(e.numero, element)
                                                            }} /><label htmlFor={`prioridade-dossie-${e.numero}`}> Prioridade Dossiê</label></td>
                                                        )
                                                    }
                                                    <td>{e.fila}</td>
                                                </tr>
                                            )
                                        }

                                    }
                                })
                            }
                        </tbody>
                        <div className="div-criar-pedido">
                            {
                                pedidos[0].statusPacote != 'Finalizado' ? (
                                    <Link className="btn-criar-pedido" to={`/rsd/CriarPedido/${protocolo}`}>Novo Pedido</Link>
                                ) : null
                            }
                        </div>
                    </table>
                </div>
            </td>
            <Modal
                isOpen={modalSalvar}
                onRequestClose={() => { setModalSalvar(false) }}
                contentLabel="Exemplo"
                overlayClassName='modal-overlay'
                className='modal-content'>
                <div className="btns-modal">
                    <h3>Pedido Editado com sucesso!</h3>
                    <button onClick={() => {
                        setModalSalvar(false)
                    }}>Fechar</button>
                </div>
            </Modal>
            <Modal
                isOpen={modalInativar}
                onRequestClose={() => { setModalInativar(false) }}
                contentLabel="Exemplo"
                overlayClassName='modal-overlay'
                className='modal-content'
            >
                <div className="title titulo-modal-agenda">
                    <h2>Motivo de inativação</h2>
                </div>
                <div>
                    <select name="motivo-inativo-pedido" id="motivo-inativo-pedido">
                        <option value="devolvido">devolvido</option>
                        <option value="duplicidade">duplicidade</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>
                <div>
                    <button value={inativarPedido} onClick={e => {
                        devolvidoAmil(e.target.value)
                    }} >Inativar</button>
                </div>
            </Modal>
        </>
    )
}

export default TabelaPedido