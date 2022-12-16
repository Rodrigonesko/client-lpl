import React, { useState, useEffect } from "react";
import Axios from 'axios'
import moment from "moment";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import './Mensagens.css'

let numPropostas = 0

const Mensagens = () => {

    const [horarios, setHorarios] = useState([])
    const [propostas, setPropostas] = useState([])
    const [dataMensagem, setDataMensagem] = useState('')

    const gerarMensagens = () => {
        try {
            buscarPropostas()
            buscarHorarios(dataMensagem)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarHorarios = (date) => {
        try {
            console.log(date);
        } catch (error) {
            console.log(error);
        }
    }

    const buscarPropostas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/naoAgendadas`, { withCredentials: true })

            setPropostas(result.data.propostas)
            console.log(result.data.propostas.length);

        } catch (error) {
            console.log(error);
        }
    }

    const ajustarDiaSemana = date => {
        try {

            switch (date) {
                case 'Monday':
                    return 'Segunda'
                    break;
                case 'Tuesday':
                    return 'Terça'
                    break;
                case 'Wednesday':
                    return 'Quarta'
                    break;
                case 'Thursday':
                    return 'Quinta'
                    break;
                case 'Friday':
                    return 'Sexta'
                    break;
                case 'Saturday':
                    return 'Sábado'
                    break;
                case 'Sunday':
                    return 'Domingo'
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

    })

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-mensagens-container">
                <div className="mensagens-container">
                    <div className="title">
                        <h3>Mensagens</h3>
                    </div>
                    <div className="filtro-mensagens">
                        <label htmlFor="gerar-mensagem">Selecionar data parar mensagens: </label>
                        <input type="date" id="gerar-mensagens" name="gerar-mensagens" onChange={e => setDataMensagem(e.target.value)} />
                        <button onClick={gerarMensagens}>Gerar mensagens</button>
                    </div>
                    <div className="mensagens">
                        {
                            propostas.map(e => {

                                let qtd = 0
                                let associados = new Map()

                                propostas.forEach(element => {
                                    if (element.proposta == e.proposta) {
                                        qtd++
                                        associados.set(`${element.nome}`, `${element.sexo}`)
                                    }
                                })

                                if (qtd >= 2) {
                                    associados.forEach((item, key) => {
                                        console.log(item, key);
                                    })
                                }

                                let sexo
                                if (e.sexo === 'M') {
                                    sexo = 'Prezado Sr.'
                                }
                                if (e.sexo === 'F') {
                                    sexo = 'Prezada Sra.'
                                }

                                let diaSemana = ajustarDiaSemana(moment(dataMensagem).format('dddd'))

                                if (e.tipoAssociado == 'Titular') {
                                    return (
                                        <div key={e._id} className='mensagem'>
                                            <p>{sexo} {e.nome} proposta: {e.proposta}</p>
                                            <p>Somos da equipe de adesão da operadora de saúde Amil e para concluirmos a sua contratação ao Plano de Saúde precisamos confirmar alguns dados para que a contratação seja concluída.</p>
                                            <p>Precisamos entrar em contato através do número 85999809731. Temos disponíveis os horários para dia *{moment(dataMensagem).format('DD/MM/YYYY')}* {diaSemana} as 09:00 - 09:20 - 09:40 - 10:00 - 10:20 - 10:40 - 11:00 - 11:20 - 11:40 - 12:00 - 12:20 - 12:40 - 13:00 - 13:20 - 13:40 - 14:00 - 14:20 - 14:40 - 15:00 - 15:20 - 15:40 - 16:00 - 16:20 - 16:40 - 17:00 - 17:20 - 17:40 - 18:00 - 18:20 - 18:40 - 19:00 - 19:20 - Qual melhor horário?</p>
                                            <p>Informamos que vamos ligar dos números 11 42404975 ou 42403554, pedimos tirar do spam para evitar bloqueio da ligação.</p>
                                            <p>Desde já agradecemos.</p>
                                        </div>
                                    )
                                }


                            })
                        }
                    </div>
                </div>

            </section>
        </>
    )
}

export default Mensagens