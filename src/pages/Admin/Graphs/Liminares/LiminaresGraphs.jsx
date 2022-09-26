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

        let quantidadeRecebidasMes = {
            'March': 0,
            'April': 0,
            'May': 0,
            'June': 0,
            'July': 0,
            'August': 0,
            'September': 0
        }

        let quantidadeConcluidasMes = {
            'March': 0,
            'April': 0,
            'May': 0,
            'June': 0,
            'July': 0,
            'August': 0,
            'September': 0
        }

        Object.values(liminares).forEach(item => {

            if (moment(item.createdAt).format('MMMM') === 'March') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }
            if (moment(item.createdAt).format('MMMM') === 'April') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }
            if (moment(item.createdAt).format('MMMM') === 'May') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }
            if (moment(item.createdAt).format('MMMM') === 'June') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }
            if (moment(item.createdAt).format('MMMM') === 'July') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }
            if (moment(item.createdAt).format('MMMM') === 'August') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }
            if (moment(item.createdAt).format('MMMM') === 'September') {
                quantidadeRecebidasMes[moment(item.createdAt).format('MMMM')] += 1
                if (item.situacao !== 'andamento') {
                    quantidadeConcluidasMes[moment(item.createdAt).format('MMMM')] += 1
                }
            }

            // console.log(moment(item.createdAt).format('MMMM'));

        })

        console.log(quantidadeRecebidasMes);

        setDataMes({
            labels: [],
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
                    </div>
                </div>
            </section>
        </>
    )
}

export default LiminaresGraphs