import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios'
import './TabelaPedido.css'

const TabelaPedido = ({ pedidos, protocolo, pacote, verificaPacote, finalizados, todos }) => {

    const [prioridade, setPrioridade] = useState(false)

    const devolvidoAmil = async e => {
        try {
            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/devolverAmil`, {
                pedido: e
            }, {
                withCredentials: true
            })

            console.log(result);

            window.location.reload()

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

            console.log(result);

            window.location.reload()

        } catch (error) {
            console.log(error);
        }
    }

    const definirPrioridadeDossie = async (pedido, prioridade) => {
        try {

            console.log(pedido, prioridade.target.checked);

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/rsd/pedido/prioridadeDossie`, {
                pedido: pedido,
                prioridade: prioridade.target.checked
            }, {
                withCredentials: true
            })

            console.log(result);

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
                                                            <td><input type="checkbox" name="checkbox-pedido" id={e.numero} value={e.numero} className='checkbox-pedido' /></td>
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
                                                            <td><input type="checkbox" name="checkbox-pedido" id={e.numero} value={e.numero} className='checkbox-pedido' /></td>
                                                        ) : (
                                                            <td><input type="checkbox" name="prioridade-dossie" id={`prioridade-dossie-${e.numero}`} defaultChecked={e.prioridadeDossie} onClick={element => {
                                                                definirPrioridadeDossie(e.numero, element)
                                                            }} /><label htmlFor={`prioridade-dossie-${e.numero}`}> Prioridade Dossiê</label></td>
                                                        )
                                                    }

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
                                                            <td><input type="checkbox" name="checkbox-pedido" id={e.numero} value={e.numero} className='checkbox-pedido' /></td>
                                                        ) : (
                                                            <td><input type="checkbox" name="prioridade-dossie" id={`prioridade-dossie-${e.numero}`} defaultChecked={e.prioridadeDossie} onClick={element => {
                                                                definirPrioridadeDossie(e.numero, element)
                                                            }} /><label htmlFor={`prioridade-dossie-${e.numero}`}> Prioridade Dossiê</label></td>
                                                        )
                                                    }

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
        </>
    )
}

export default TabelaPedido