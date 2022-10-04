import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import 'chart.js/auto';
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
import * as XLSX from "xlsx";
import './RnGraphs.css'

moment.locale('pt-br')

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
      text: 'Recebidas x Realizadas',
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
      text: 'Recebidas x Realizadas por mês',
    },
  },
};

let rnsForExcel

const RnGraphs = () => {

  const [rns, setRns] = useState({})
  const [quantidadeConcluidas, setQuantidadeConcluidas] = useState('')
  const [quantidadeConfirmadas, setQuantidadeConfirmadas] = useState('')
  const [meses, setMeses] = useState([])

  const [dataMes, setDataMes] = useState({
    labels: [],
    datasets: []
  })

  const [data, setData] = useState({
    labels: [],
    datasets: []
  })

  const transformData = () => {
    try {

      rnsForExcel = rns.map(e => {

        let contato1, contato2, contato3

        if (e.dataContato1 !== undefined) {
          contato1 = moment(e.dataContato1).format('DD/MM/YYYY') + ' ' + e.horarioContato1
        }

        if (e.dataContato2 !== undefined) {
          contato2 = moment(e.dataContato2).format('DD/MM/YYYY') + ' ' + e.horarioContato2
        }

        if (e.dataContato3 !== undefined) {
          contato3 = moment(e.dataContato3).format('DD/MM/YYYY') + ' ' + e.horarioContato3
        }

        console.log(contato1, contato2, contato3)
        return (
          {
            DATA: e.data,
            'BENEFICIÁRIO': e.beneficiario,
            MO: e.mo,
            PROPOSTA: e.proposta,
            VIGENCIA: e.vigencia,
            'PEDIDO/PROPOSTA': e.pedido,
            TIPO: e.tipo,
            FILIAL: e.filial,
            IDADE: e.idade,
            'DATA RECEBIMENTO DO PEDIDO': e.dataRecebimento,
            PROCEDIMENTO: e.procedimento,
            'DOENÇA': e.doenca,
            CID: e.cid,
            'PERÍODO DA DOENÇA': e.periodo,
            PRC: e.prc,
            'TELEFONES BENEFICIARIO': e.telefones,
            'EMAIL BENEFICIARIO': e.email,
            '1º CTTO': contato1,
            '2º CTTO': contato2,
            '3º CTTO': contato3,
            'OBSERVAÇÕES DO CONTATO': e.observacoes,
            'CONFIRMAÇÃO BENEFICIARIO': e.respostaBeneficiario

          }
        )
      })

      console.log(rnsForExcel);

    } catch (error) {
      console.log(error);
    }
  }

  const searchRn = async () => {
    try {
      const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rn/rns`, { withCredentials: true })
      setRns(result.data)

      let quantidadeConcluidas1 = 0
      let quantidadeConfirmadas1 = 0

      Object.values(rns).forEach(e => {

        if (e.status == 'Concluido') {
          quantidadeConcluidas1++
        }
        if (e.respostaBeneficiario == 'Sim') {
          quantidadeConfirmadas1++
        }
      })

      setQuantidadeConcluidas(quantidadeConcluidas1)
      setQuantidadeConfirmadas(quantidadeConfirmadas1)

      setData({
        labels: ['Total'],
        datasets: [
          {
            label: 'Recebidas',
            data: [rns.length],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Realizadas',
            data: [quantidadeConcluidas],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Beneficiario Concordou',
            data: [quantidadeConfirmadas],
            backgroundColor: 'rgba(21, 190, 255, 0.5)',
          },
        ],
      })

      let quantidadeRecebidasMes = new Map()
      let quantidadeRealizadasMes = new Map()
      let quantidadeConfirmadasMes = new Map()

      Object.values(rns).forEach(item => {

        console.log(item.createdAt+' - ' + item._id);

        if (quantidadeRecebidasMes.has(moment(item.createdAt).format('MMMM/YY'))) {
          quantidadeRecebidasMes.set(moment(item.createdAt).format('MMMM/YY'), quantidadeRecebidasMes.get(moment(item.createdAt).format('MMMM/YY')) + 1)
          if (item.status === 'Concluido') {
            if (quantidadeRealizadasMes.has(moment(item.createdAt).format('MMMM/YY'))) {
              quantidadeRealizadasMes.set(moment(item.createdAt).format('MMMM/YY'), quantidadeRealizadasMes.get(moment(item.createdAt).format('MMMM/YY')) + 1)
            } else {
              quantidadeRealizadasMes.set(moment(item.createdAt).format('MMMM/YY'), 2)
            }
          }

          if (item.respostaBeneficiario === 'Sim') {
            if (quantidadeConfirmadasMes.has(moment(item.createdAt).format('MMMM/YY'))) {
              quantidadeConfirmadasMes.set(moment(item.createdAt).format('MMMM/YY'), quantidadeConfirmadasMes.get(moment(item.createdAt).format('MMMM/YY')) + 1)
            } else {
              quantidadeConfirmadasMes.set(moment(item.createdAt).format('MMMM/YY'), 2)
            }
          }

        } else {
          quantidadeRecebidasMes.set(moment(item.createdAt).format('MMMM/YY'), 1)
        }
      })

      let labelsMes = []

      quantidadeRecebidasMes.forEach((e, key) => {
        labelsMes.push(key)
      })

      quantidadeRecebidasMes = [...quantidadeRecebidasMes.values()]
      quantidadeRealizadasMes = [...quantidadeRealizadasMes.values()]
      quantidadeConfirmadasMes = [...quantidadeConfirmadasMes.values()]

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
            data: quantidadeRealizadasMes,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Beneficiario Concordou',
            data: quantidadeConfirmadasMes,
            backgroundColor: 'rgba(21, 190, 255, 0.5)',
            borderColor: 'rgba(21, 190, 255, 0.5)',
          },
        ]
      })

    } catch (error) {
      console.log(error);
    }
  }

  const report = () => {
    transformData()
    try {
      const ws = XLSX.utils.json_to_sheet(rnsForExcel)
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
      XLSX.writeFile(wb, 'reportRnCompleto.xlsx')

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    searchRn()
  }, [quantidadeConcluidas, quantidadeConfirmadas])

  return (
    <>
      <Sidebar />
      <section className="section-graphs-container">
        <div className="graphs-container">
          <Bar className="recebidas-x-realizadas" options={options} data={data} />
          <Bar className="recebidas-x-realizadas" options={optionsMes} data={dataMes} />
          <Line className="recebidas-x-realizadas" options={optionsMes} data={dataMes} />
          <button onClick={report}>Report</button>
        </div>
      </section>
    </>
  )
}

export default RnGraphs