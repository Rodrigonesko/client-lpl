import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import Pergunta from "../../../components/Pergunta/Pergunta";
import gerarPdf from "../Pdf/Pdf";

import './Formulario.css'

let respostas = {

}

let subRespostas = {

}

let simOuNao = {

}

let arrCids = [

]

const Formulario = () => {

    const { id } = useParams()

    const [perguntas, setPerguntas] = useState([])
    const [pessoa, setPessoa] = useState({})
    const [formulario, setFormulario] = useState('')
    const [sexo, setSexo] = useState('')
    const [divergencia, setDivergencia] = useState(false)
    const [cids, setCids] = useState([])
    const [cidsSelecionados, setCidsSelecionados] = useState([])

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })

            setPerguntas(result.data.perguntas)

        } catch (error) {
            console.log(error);
        }
    }

    const buscarInfoPessoa = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/pessoa/${id}`, { withCredentials: true })

            setPessoa(result.data.pessoa)
            setFormulario(result.data.pessoa.formulario)
            setSexo(result.data.pessoa.sexo)




        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (item) => {
        respostas[`${item.id}`] = item.value
    }

    const handleChangeSub = (item) => {
        subRespostas[`${item.id}`] = item.value
    }

    const handleSimOuNao = (item) => {
        let split = item.name.split('-')
        simOuNao[`${split[1]}`] = item.value
    }

    const enviarDados = async () => {
        try {

            const result = await Axios.post(`${process.env.REACT_APP_API_KEY}/entrevistas/formulario`, {
                respostas: respostas,
                subRespostas: subRespostas,
                pessoa,
                simOuNao,
                cids: arrCids
            }, {
                withCredentials: true
            })

            console.log(result);

            gerarPdf()

        } catch (error) {
            console.log(error);
        }
    }

    const buscarCids = async (cid) => {
        try {

            if (cid === '') {
                setCids([])
            } else {
                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/cids/pesquisa/${cid}`, { withCredentials: true })

                setCids(result.data.cids)
            }



        } catch (error) {
            console.log(error);
        }
    }

    const adicionarCids = (item) => {

        if (item.checked == true) {
            arrCids.push(item.value)
            console.log(arrCids);
        }

        if (item.checked == false) {
            let indice = arrCids.indexOf(item.value)
            arrCids.splice(indice, 1) 
            console.log(arrCids);
        }

        setCidsSelecionados(arrCids)

        console.log(cidsSelecionados);

    }

    useEffect(() => {
        buscarPerguntas()
        buscarInfoPessoa()
    }, [JSON.stringify(cidsSelecionados)])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-formulario-container">
                <div className="formulario-container">
                    <div className="title">
                        <h3>Entrevista Qualificativa</h3>
                    </div>
                    <div className="info-adicional">
                        <button>Informações Adicionais</button>
                    </div>
                    <RoteiroTeleEntrevista></RoteiroTeleEntrevista>
                    <div className="info-pessoa-entrevista-container">
                        <div className="title">
                            <h3>Questionário Médico</h3>
                        </div>
                        <InfoPessoaEntrevista pessoa={pessoa}></InfoPessoaEntrevista>
                    </div>
                    <div className="observacoes-entrevista">
                        <div className="title">
                            <h3>Observações</h3>
                        </div>
                    </div>
                    <div className="formulario">
                        {
                            perguntas.map(e => {

                                if (e.formulario == formulario && e.categoria == 'questionario') {

                                    if (e.sexo != 'M' && e.sexo != 'F') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                            </>
                                        )
                                    }
                                    if (e.sexo == 'M' && sexo == 'M') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                            </>
                                        )
                                    }
                                    if (e.sexo == 'F' && sexo == 'F') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                            </>
                                        )
                                    }

                                }


                            })
                        }
                    </div>
                    <div className="perguntas-habitos-container title">
                        <h3>HÁBITOS E HISTÓRICO FAMILIAR</h3>
                    </div>
                    <div className="formulario">
                        {
                            perguntas.map(e => {
                                if (e.formulario == 'adulto' && e.categoria == 'habitos') {
                                    return (
                                        <>
                                            <Pergunta handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                        </>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="div-pergunta">
                        <label htmlFor="identifica-divergencia" className="label-pergunta">Identifica Divergência?</label>
                        <select name="identifica-divergencia" id="identifica-divergencia" onChange={e => {
                            setDivergencia(e.target.value)
                        }}>
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                        </select>
                    </div>
                    {
                        divergencia && (
                            <>
                                <div className="perguntas-habitos-container title">
                                    <h3>Identificação de divergências</h3>
                                </div>
                                <div className="divergencias-container">
                                    <div className="div-pergunta">
                                        <label htmlFor="pergunta-divergencia" className="label-pergunta">Qual divergência?</label>
                                        <input type="text" name="pergunta-qual-divergencia" id="pergunta-divergencia" className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
                                    </div>
                                    <div className="div-pergunta">
                                        <label htmlFor="pergunta-patologias" className="label-pergunta">Por que o beneficiario não informou na ds essas patologias?</label>
                                        <input type="text" name="pergunta-patologias" id="pergunta-patologias" className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
                                    </div>
                                    <div className="div-pergunta">
                                        <label htmlFor="cid">CID:</label>
                                        <input type="text" name="cid" id="cid" className="input-pergunta" onChange={e => {
                                            buscarCids(e.target.value)
                                        }} />

                                        <h4>Cids Selecionados: </h4>
                                        <div id="cids-selecionados">
                                            {
                                                cidsSelecionados.map(item => {
                                                    return(
                                                        <div>
                                                            <span>{item}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                    <div className="cids-container">
                                        {
                                            cids.map(e => {
                                                return (
                                                    <div className="cid">
                                                        <input type="checkbox" name={e.subCategoria} id={e.subCategoria} value={`${e.subCategoria} (${e.descricao})`} onClick={(item) => {
                                                            adicionarCids(item.target)
                                                        }} /> <label htmlFor={e.subCategoria}>{e.subCategoria} - {e.descricao}</label >
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    }

                    <div className="btn-enviar-form-btn">
                        <button onClick={enviarDados} >Enviar</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Formulario