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
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import * as XLSX from "xlsx";
import './RnGraphs.css'


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

      let labelsMes = Object.values(rns).map(e => {
        let mes = e.createdAt
        mes = moment(mes).format('MM')
        let mesLabel
        switch (mes) {
          case '01':
            mesLabel = 'Janeiro'
            break;
          case '02':
            mesLabel = 'Fevereiro'
            break;
          case '03':
            mesLabel = 'Março'
            break;
          case '04':
            mesLabel = 'Abril'
            break;
          case '05':
            mesLabel = 'Maio'
            break;
          case '06':
            mesLabel = 'Junho'
            break;
          case '07':
            mesLabel = 'Julho'
            break;
          case '08':
            mesLabel = 'Agosto'
            break;
          case '09':
            mesLabel = 'Setembro'
            break;
          case '10':
            mesLabel = 'Outubro'
            break;
          case '11':
            mesLabel = 'Novembro'
            break;
          case '12':
            mesLabel = 'Dezembro'
            break;
          default:
            break;
        }

        return mesLabel
      })

      labelsMes = labelsMes.filter((mes, i) => labelsMes.indexOf(mes) === i);

      console.log(labelsMes);

      let quantidadeConcluidas1 = 0
      let quantidadeConfirmadas1 = 0

      let quantidadeRecebidasMes = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
      }

      Object.values(rns).forEach(item => {
        quantidadeRecebidasMes[moment(item.createdAt).month() + 1] += 1
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
        labels: labelsMes,
        datasets: [
          {
            label: 'Recebidas',
            data: ['60', '90'],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Realizadas',
            data: [50, 80],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Beneficiario Concordou',
            data: [50, 78],
            backgroundColor: 'rgba(21, 190, 255, 0.5)',
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
          <button onClick={report}>Report</button>
        </div>
      </section>
    </>
  )
}

export default RnGraphs