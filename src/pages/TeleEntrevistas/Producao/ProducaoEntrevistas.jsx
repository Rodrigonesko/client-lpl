import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import TabelaProducao from "./TabelaProducao/TabelaProducao";
import './ProducaoEntrevistas.css'
import moment from "moment";
import $ from 'jquery'

const ProducaoEntrevistas = () => {

    const [quantidadeMesAno, setQuantidadeMesAno] = useState({})
    const [analistasQuantidadeTotalMes, setAnalistasQuantidadeTotalMes] = useState({})
    const [analistaQuantidadeDia, setAnalistaQuantidadeDia] = useState({})
    const [quantidadeMesAnoRn, setQuantidadeMesAnoRn] = useState({})
    const [analistasQuantidadeTotalMesRn, setAnalistasQuantidadeTotalMesRn] = useState({})
    const [analistaQuantidadeDiaRn, setAnalistaQuantidadeDiaRn] = useState({})
    const [mesAno, setMesAno] = useState('')
    const [analista, setAnalista] = useState('')

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/producao/dados`, { withCredentials: true })

            console.log(result);

            setQuantidadeMesAno(result.data.quantidadeMesAno)
            setAnalistasQuantidadeTotalMes(result.data.quantidadeAnalistaMesAno);
            setAnalistaQuantidadeDia(result.data.quantidadeAnalistaDia)
            setQuantidadeMesAnoRn(result.data.quantidadeMesAnoRn)
            setAnalistasQuantidadeTotalMesRn(result.data.quantidadeAnalistaMesAnoRn);
            setAnalistaQuantidadeDiaRn(result.data.quantidadeAnalistaDiaRn)

            console.log(result.data.quantidadeAnalistaDia);

        } catch (error) {
            console.log(error);
        }
    }

    const mostrarDadosAnalistaTotalMes = (e) => {
        try {
            let trProducaoMes = document.getElementById('producao-total-mes')
            // if (trProducaoMes.classList.contains('hide')) {
            //     trProducaoMes.classList.add('show')
            //     trProducaoMes.classList.remove('hide')
            //     setMesAno(e)
            // } else {
            //     trProducaoMes.classList.add('hide')
            // }
            $('#producao-total-mes').toggle('fast')
            setMesAno(e)
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarDadosAnalistaDia = async (e, tr) => {
        try {
            console.log(e)
            setAnalista(e)
            let tr = document.getElementById(`producao-dia-${e}`)
            let trs = $('.producao-dia').hide('fast')
            // Object.values(trs).forEach(item => {
            //     console.log(item.cl);
            // })
            $(`#producao-dia-${e}`).toggle('fast')

            // if (tr.classList.contains(`hide`)) {
            //     // tr.classList.add(`show`)
            //     // tr.classList.remove(`hide`)
            //     $(`#producao-dia-${e}`).toggle('fast')
            // } else {
            //     tr.classList.add(`hide`)
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-producao-entrevistas-container">
                <div className="producao-entrevistas-container">
                    <div className="title producao-entrevistas">
                        <h3>Produção Entrevistas</h3>
                    </div>
                    <div className="producao-entrevistas">
                        {/* <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th></th>
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
                                <tr className="none" id="producao-total-mes">
                                    <td colspan={Object.keys(quantidadeMesAno).length + 1}>
                                        <div>
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
                                                                        <tr id={`producao-dia-${e}`} className='none producao-dia'>
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
                        </table> */}
                        <TabelaProducao quantidadeMesAno={quantidadeMesAno} analistasQuantidadeTotalMes={analistasQuantidadeTotalMes} analistaQuantidadeDia={analistaQuantidadeDia} idProducaoMes='producao-mes-entrevistas' idProducaoDia='producao-dia-entrevistas' >

                        </TabelaProducao>
                    </div>
                    <div className="title producao-rn">
                        <h3>Produção Rns</h3>
                    </div>
                    <div className="producao-rn">
                        <TabelaProducao quantidadeMesAno={quantidadeMesAnoRn} analistasQuantidadeTotalMes={analistasQuantidadeTotalMesRn} analistaQuantidadeDia={analistaQuantidadeDiaRn} idProducaoMes='producao-mes-rns' idProducaoDia='producao-dia-rns' >

                        </TabelaProducao>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProducaoEntrevistas