import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from "axios";
import 'chart.js/auto'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Recebidas x Concluídas',
        },
    },
};

export const optionsMes = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Recebidas x Concluídas por mês',
        },
    },
};

export const optionsDaily = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Recebidas x Concluídas por dia',
        },
    },
};


const LiminaresGraphs = () => {

    const [liminares, setLiminares] = useState({})
    const [totalLiminares, setTotalLiminares] = useState(0)

    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    const [dataMes, setDataMes] = useState({
        labels: [],
        datasets: []
    })

    const [dataDaily, setDataDaily] = useState({
        labels: [],
        datasets: []
    })



    const searchLiminares = async () => {

        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/liminares/show`, { withCredentials: true })

        setLiminares(result.data.liminares)

        setTotalLiminares(liminares.length)

        const totalConcluidos = Object.values(liminares).filter(e => {
            return e.situacao !== 'andamento'
        })

        setData({
            labels: ['total'],
            datasets: [
                {
                    label: 'Recebidas',
                    data: [totalLiminares],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Concluidas',
                    data: [totalConcluidos.length],
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ]
        })

        let quantidadeRecebidasMes = new Map()
        let quantidadeConcluidasMes = new Map()

        Object.values(liminares).forEach(item => {

            if (quantidadeRecebidasMes.has(moment(item.createdAt).format('MMMM'))) {
                quantidadeRecebidasMes.set(moment(item.createdAt).format('MMMM'), quantidadeRecebidasMes.get(moment(item.createdAt).format('MMMM')) + 1)
            } else {
                quantidadeRecebidasMes.set(moment(item.createdAt).format('MMMM'), 1)
            }

            if (quantidadeConcluidasMes.has(moment(item.dataConclusao).format('MMMM'))) {
                quantidadeConcluidasMes.set(moment(item.createdAt).format('MMMM'), quantidadeConcluidasMes.get(moment(item.createdAt).format('MMMM')) + 1)
            } else {
                quantidadeConcluidasMes.set(moment(item.dataConclusao).format('MMMM'), 1)
            }

        })

        console.log(quantidadeRecebidasMes);

        let labelsMes = []

        quantidadeRecebidasMes.forEach((e, key)=>{
            labelsMes.push(key)
        })

        console.log(labelsMes);

        quantidadeRecebidasMes = [...quantidadeRecebidasMes.values()]

        quantidadeConcluidasMes = [...quantidadeConcluidasMes.values()]



        //console.log(quantidadeRecebidasMes);

        setDataMes({
            labels: labelsMes,
            datasets: [
                {
                    label: 'Recebidas',
                    data: quantidadeRecebidasMes,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Realizadas',
                    data: quantidadeConcluidasMes,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgba(53, 162, 235, 0.5)',
                },
            ]
        })

        let recebidasDiarias = new Map()
        let concluidasDiarias = new Map()

        Object.values(liminares).forEach(e => {
            if (recebidasDiarias.has(e.createdAt)) {
                recebidasDiarias.set(e.createdAt, recebidasDiarias.get(e.createdAt) + 1)
            } else {
                recebidasDiarias.set(e.createdAt, 1)
            }
            if (concluidasDiarias.has(e.dataConclusao)) {
                concluidasDiarias.set(e.dataConclusao, concluidasDiarias.get(e.dataConclusao) + 1)
            } else {
                concluidasDiarias.set(e.dataConclusao, 1)
            }
        })

        let recebidas = [...recebidasDiarias.values()]

        let concluidas = [...concluidasDiarias.values()]

        setDataDaily({
            labels: recebidas,
            datasets: [
                {
                    label: 'Recebidas',
                    data: recebidas,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Concluidas',
                    data: concluidas,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgba(53, 162, 235, 0.5)',
                },
            ]
        })


    }

    useEffect(() => {
        searchLiminares()
    }, [totalLiminares])

    return (
        <>
            <Sidebar />
            <section className="section-graphs-container">
                <div className="">
                    <div className="title">
                        <h3>Estátisticas Liminares</h3>

                    </div>
                    <div>
                        <Bar className="recebidas-x-realizadas" options={options} data={data} />
                        <Bar className="recebidas-x-realizadas" options={optionsMes} data={dataMes} />
                        <Line className="recebidas-x-realizadas" options={optionsDaily} data={dataDaily} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default LiminaresGraphs