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

      console.log(rns);

      let quantidadeConcluidas1 = 0
      let quantidadeConfirmadas1 = 0

      let quantidadeRecebidasMes = {
        'Agosto': 0,
        'Setembro': 0,
      }
      let quantidadeRealizadasMes = {
        'Agosto': 0,
        'Setembro': 0,
      }

      let quantidadeConfirmadasMes = {
        'Agosto': 0,
        'Setembro': 0,
      }

      Object.values(rns).forEach(item => {
        if ((moment(item.createdAt).month() + 1) === 8) {
          quantidadeRecebidasMes['Agosto'] += 1
          if (item.status === 'Concluido') {
            quantidadeRealizadasMes['Agosto'] += 1
          }
          if (item.respostaBeneficiario === 'Sim') {
            quantidadeConfirmadasMes['Agosto'] += 1
          }
        }
        if ((moment(item.createdAt).month() + 1) === 9) {
          quantidadeRecebidasMes['Setembro'] += 1
          if (item.status === 'Concluido') {
            quantidadeRealizadasMes['Setembro'] += 1
          }
          if (item.respostaBeneficiario === 'Sim') {
            quantidadeConfirmadasMes['Setembro'] += 1
          }
        }
        console.log(moment(item.createdAt).format('MMMM'));
        // quantidadeRecebidasMes[moment(item.createdAt).month() + 1] += 1
      })

      console.log(quantidadeRecebidasMes);


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
    console.log('report');
    try {
      const ws = XLSX.utils.json_to_sheet(rnsForExcel)
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
      XLSX.writeFile(wb, 'reportRnCompleto.xlsx')

      console.log(ws);

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