import React, { useState } from "react";
import $ from 'jquery'
import moment from "moment/moment";

const TabelaProducao = ({ quantidadeMesAno, analistasQuantidadeTotalMes, analistaQuantidadeDia, idProducaoMes, idProducaoDia }) => {


    const [analista, setAnalista] = useState('')
    const [mesAno, setMesAno] = useState('')

    const mostrarDadosAnalistaTotalMes = (e) => {
        try {
            if (!document.getElementById(`${idProducaoMes}`).classList.contains('show-producao-mes')) {
                $(`#${idProducaoMes}`).show('fast')
                document.getElementById(`${idProducaoMes}`).classList.add('show-producao-mes')
            } else {
                $(`#${idProducaoMes}`).hide('fast')
                document.getElementById(`${idProducaoMes}`).classList.remove('show-producao-mes')
            }

            setMesAno(e)
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarDadosAnalistaDia = async (e, tr) => {
        try {
            console.log(e)
            setAnalista(e)
            $('.producao-dia').hide('fast')
            $(`#${idProducaoDia}-${e}`).toggle('fast')


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <table className="table">
                <thead className="table-header">
                    <tr>
                        <th>Datas</th>
                        {
                            Object.keys(quantidadeMesAno).map(e => {
                                return (
                                    <th>{e}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total</td>
                        {
                            Object.keys(quantidadeMesAno).map(e => {
                                return (
                                    <td onClick={(() => {
                                        mostrarDadosAnalistaTotalMes(e)
                                    })} >{quantidadeMesAno[e]}</td>
                                )
                            })
                        }
                    </tr>
                    <tr className="none" id={idProducaoMes}>
                        <td colspan={Object.keys(quantidadeMesAno).length + 1}>
                            <div>
                                <h4>Período: {mesAno}</h4>
                                <table className="table" border={1}>
                                    <thead className="table-header">

                                        <tr>
                                            <th>Analista</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Object.keys(analistasQuantidadeTotalMes).map(e => {
                                                if (analistasQuantidadeTotalMes[e][mesAno]) {
                                                    return (
                                                        <>
                                                            <tr >
                                                                <td>{e}</td>
                                                                <td onClick={(element) => {
                                                                    mostrarDadosAnalistaDia(e, element.target)
                                                                }}>{analistasQuantidadeTotalMes[e][mesAno]}</td>
                                                            </tr>
                                                            <tr id={`${idProducaoDia}-${e}`} className='none producao-dia'>
                                                                <td colspan='30'>
                                                                    <div>
                                                                        <table className="table" border={1}>
                                                                            <thead className="table-header">
                                                                                <tr>
                                                                                    <th>Dia</th>
                                                                                    {
                                                                                        Object.keys(analistaQuantidadeDia).map((analistaKey) => {
                                                                                            let td
                                                                                            if (analistaKey === analista) {
                                                                                                td = Object.keys(analistaQuantidadeDia[analistaKey]).map(data => {
                                                                                                    if (moment(data).format('MM/YYYY') === mesAno) {
                                                                                                        console.log(data);
                                                                                                        return (
                                                                                                            <th>{moment(data).format('DD')}</th>
                                                                                                        )
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            return td
                                                                                        })
                                                                                    }
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Quantidade/Dia</td>
                                                                                    {
                                                                                        Object.keys(analistaQuantidadeDia).map((analistaKey) => {
                                                                                            let td
                                                                                            if (analistaKey === analista) {
                                                                                                td = Object.keys(analistaQuantidadeDia[analistaKey]).map(data => {
                                                                                                    if (moment(data).format('MM/YYYY') === mesAno) {
                                                                                                        console.log(analistaQuantidadeDia[analistaKey][data]);
                                                                                                        return (
                                                                                                            <td>{analistaQuantidadeDia[analistaKey][data]}</td>
                                                                                                        )
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                            return td
                                                                                        })
                                                                                    }
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TabelaProducao