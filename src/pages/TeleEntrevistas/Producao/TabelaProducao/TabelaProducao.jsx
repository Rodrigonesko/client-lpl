import React from "react";
import $ from 'jquery'
import moment from "moment/moment";
const TabelaProducao = ({ producao }) => {

    const mostrarDadosMes = (item) => {
        let trs = document.getElementsByClassName(item)
        for (const e of trs) {
            $(e).toggle('fast')
        }

        let qtdDia = document.getElementsByClassName('qtd-dia')
        for (const obj of qtdDia) {
            $(obj).hide('fast')
        }

    }

    const mostrarDadosDia = (item) => {
        let tr = document.getElementById(item.className)
        $(tr).toggle('fast')
    }

    return (
        <div className="producao-entrevistas">
            <table className="table">
                <thead className="table-header">
                    <tr>
                        {
                            producao.map(item => {
                                return (
                                    <th>{item.data}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            producao.map(item => {
                                return (
                                    <>
                                        <td id={item.data} onClick={e => {
                                            mostrarDadosMes(e.target.id)
                                        }}>{item.quantidade}</td>
                                    </>

                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
            <br />
            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th>Mês/Ano</th>
                        <th>Analista</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        producao.map(item => {
                            return item.quantidadeAnalistaMes.map(e => {
                                return (
                                    <>
                                        <tr className={`${item.data} none`} >
                                            <td>{item.data}</td>
                                            <td>{e.analista}</td>
                                            <td className={`${item.data}-${e.analista}`} onClick={(td) => { mostrarDadosDia(td.target) }} >{e.quantidade}</td>
                                        </tr>

                                        <tr id={`${item.data}-${e.analista}`} className='none qtd-dia'>
                                            <div className="center-table">
                                                <table className="table">
                                                    <thead className="table-header">
                                                        <tr>
                                                            <th>Dia</th>
                                                            <th>Quantidade</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {
                                                            e.quantidadeAnalistaDia.map(elem => {
                                                                return (
                                                                    <tr >
                                                                        <td className="width-100" >{moment(elem.data).format('DD/MM/YYYY')}</td>
                                                                        <td>{elem.quantidade}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </tr>
                                    </>
                                )
                            })
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TabelaProducao