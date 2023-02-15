import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'
import html2canvas from 'html2canvas'
import jsPdf from 'jspdf'

const Pdf2 = () => {

    const { proposta, nome } = useParams()

    console.log(proposta, nome);

    const [perguntas, setPerguntas] = useState([])
    const [dadosEntrevista, setDadosEntrevista] = useState({})

    const gerarPdf = () => {
        const domElement = document.getElementById("pdf");
        html2canvas(domElement, {
            onclone: document => {
                document.getElementById("print")
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPdf();
            pdf.addImage(imgData, "JPEG", 10, 10);
            pdf.save(`${new Date().toISOString()}.pdf`);
        });
    }




    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

            setPerguntas(result.data.perguntas)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const buscarDadosEntrevista = async () => {
            try {

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/dadosEntrevista/${proposta}/${nome}`, { withCredentials: true })

                setDadosEntrevista(result.data.result[0])

                console.log(result);

            } catch (error) {
                console.log(error);
            }
        }

        buscarDadosEntrevista()
        buscarPerguntas()
        gerarPdf()
    }, [nome, proposta])

    return (
        <section className='section-editar-proposta-container' id='pdf'>
            <div className='editar-proposta-container' id='proposta-container'>
                <div className="title">
                    <h3>Editar Dados Entrevista</h3>
                </div>
                <div className="dados-entrevista-editar">
                    <table border='1'>
                        <tr>
                            <td>Data Entrevista</td>
                            <td>{moment(dadosEntrevista.createdAt).format('DD/MM/YYYY')}</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>{dadosEntrevista.nome}</td>
                        </tr>
                        <tr>
                            <td>CPF</td>
                            <td>{dadosEntrevista.cpf}</td>
                        </tr>
                        <tr>
                            <td>Proposta</td>
                            <td>{dadosEntrevista.proposta}</td>
                        </tr>
                        <tr>
                            <td>Data Nascimento</td>
                            <td>{moment(dadosEntrevista.dataNascimento).format('DD/MM/YYYY')}</td>
                        </tr>
                    </table>
                </div>
                <div className="perguntas-container">
                    {
                        perguntas.map(e => {
                            if (e.formulario === dadosEntrevista.tipoFormulario) {
                                return (
                                    <div className='title'>
                                        <label htmlFor={e.name}>{e.pergunta}</label>
                                        <textarea type="text" name="" id={e.name} defaultValue={dadosEntrevista[e.name]} className='input-pergunta' />
                                    </div>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Pdf2