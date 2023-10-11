import React, { useState, useEffect, } from "react";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import Pergunta from "../../../components/Pergunta/Pergunta";
import InfoAdicionais from "./InfoAdicional/InfoAdicional";
import { Alert, Select, Button, InputLabel, FormControl, MenuItem, Box, CircularProgress, Typography } from '@mui/material'
import EntrevistaQualidade from "../../../components/EntrevistaQualidade/EntrevistaQualidade";
import ModalFormulario from "../../../components/ModalFormulario/ModalFormulario";
import ModalPatologias from "../../../components/ModalPatologias/ModalPatologias";

import './Formulario.css'
import { getCookie } from "react-use-cookie";

let arrCids = []

let respostas = {}

let subRespostas = {}

let simOuNao = {}

const Formulario = () => {

    const { id } = useParams()

    const [perguntas, setPerguntas] = useState([])
    const [pessoa, setPessoa] = useState({})
    const [formulario, setFormulario] = useState('')
    const [sexo, setSexo] = useState('')
    const [divergencia, setDivergencia] = useState(false)
    const [cids, setCids] = useState([])
    const [habitos, setHabitos] = useState(true)
    const [autismo, setAutismo] = useState(false)
    const [infoAdicional, setInfoAdicional] = useState({})
    const [entrevistaQualidade, setEntrevistaQualidade] = useState(false)
    const [novoFormulario, setNovoFormulario] = useState('')
    const [loading, setLoading] = useState(false)

    let alturaInput, pesoInput

    const buscarPerguntas = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/perguntas`, { withCredentials: true })
            setPerguntas(result.data.perguntas)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (item) => {
        respostas[`${item.id}`] = item.value
        let imc
        if (item.id === 'peso') {
            pesoInput = (item.value)
            imc = pesoInput / (alturaInput * alturaInput)
            let indicadorImc
            if (imc >= 40) {
                indicadorImc = 'OBESIDADE III'
            }
            if (imc >= 35 && imc <= 39.99) {
                indicadorImc = 'OBESIDADE II'
            }
            if (imc >= 30 && imc <= 34.99) {
                indicadorImc = 'OBESIDADE I'
            }
            document.getElementById('imc').innerHTML = `${imc} - ${indicadorImc}`
            if (imc >= 30) {
                let span = document.createElement('span')
                span.textContent = `De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.`
                document.getElementById('indicador-obesidade').innerHTML = `<div class='indicador-imc'>De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.</div>`
            }
            if (imc < 30) {
                let divIndicadorObesidade = document.getElementById('indicador-obesidade')
                divIndicadorObesidade.removeChild(divIndicadorObesidade.firstChild)
            }
        }
        if (item.id === 'altura') {
            alturaInput = (item.value)
            imc = pesoInput / (alturaInput * alturaInput)
            let indicadorImc
            if (imc >= 40) {
                indicadorImc = 'OBESIDADE III'
            }
            if (imc >= 35 && imc <= 39.99) {
                indicadorImc = 'OBESIDADE II'
            }
            if (imc >= 30 && imc <= 34.99) {
                indicadorImc = 'OBESIDADE I'
            }
            document.getElementById('imc').innerHTML = `${imc} - ${indicadorImc}`
            if (imc >= 30) {
                let span = document.createElement('span')
                span.textContent = `De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.`
                document.getElementById('indicador-obesidade').innerHTML = `<div class='indicador-imc'>De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.</div>`
            }
        }
    }

    const handleChangeSub = async (item) => {
        subRespostas[`${item.name}`] = item.value
        console.log(item, subRespostas);
    }

    const handleSimOuNao = (item) => {
        let split = item.name.split('-')
        simOuNao[`${split[1]}`] = item.value
    }

    const buscarCids = async (cid) => {
        try {
            if (cid === '' || cid.length <= 2) {
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
        let div = document.getElementById('cids-selecionados')
        if (item.checked === true) {
            arrCids.push(item.value)
            let div1 = document.createElement('div')
            let span = document.createElement('span')
            span.textContent = item.value
            div1.setAttribute('id', item.value)
            div1.appendChild(span)
            div.appendChild(div1)
        }
        if (item.checked === false) {
            let indice = arrCids.indexOf(item.value)
            arrCids.splice(indice, 1)
            let divRetirada = document.getElementById(item.value)
            console.log(divRetirada);
            divRetirada.parentNode.removeChild(divRetirada)
        }
        console.log(arrCids.some((cid => cid !== 'F841 (Autismo atípico)' && cid !== 'F840 (Autismo infantil)')));
    }

    const mostraDivergencia = (item) => {
        let div = document.getElementById('divergencia-container')
        if (item === 'true') {
            div.classList.remove('none')
        } else {
            div.classList.add('none')
        }
    }

    const alterarFormulario = async () => {
        try {
            setLoading(true)
            if (novoFormulario !== '') {
                const result = await Axios.put(`${process.env.REACT_APP_API_TELE_KEY}/alterarFormulario`, {
                    formulario: novoFormulario,
                    id: id
                }, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${getCookie('token')}` }
                })
                if (result.status === 200) {
                    window.location.reload()
                }
            } else {
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const buscarInfoPessoa = async () => {
            try {
                const result = await Axios.get(`${process.env.REACT_APP_API_TELE_KEY}/proposta/${id}`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${getCookie('token')}` }
                })
                setPessoa(result.data)
                setFormulario(result.data.formulario)
                setSexo(result.data.sexo)
                if (result.data.formulario !== 'adulto') {
                    setHabitos(false)
                }
                setInfoAdicional(result.data)
            } catch (error) {
                console.log(error);
            }
        }
        buscarPerguntas()
        buscarInfoPessoa()
    }, [id, pessoa?.grupoCarencia])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-formulario-container">
                <div className="formulario-container">
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />
                        ) : null
                    }
                    <div className="title">
                        <h3>Entrevista Qualificativa</h3>
                        <Box display='flex' mt={2}>
                            <FormControl size="small" style={{ minWidth: '130px' }}>
                                <InputLabel>Formulário</InputLabel>
                                <Select
                                    label='Formulário'
                                    onChange={e => setNovoFormulario(e.target.value)}
                                >
                                    <MenuItem>
                                        <em>Formulário</em>
                                    </MenuItem>
                                    <MenuItem value='adulto-f'>Adulto feminino</MenuItem>
                                    <MenuItem value='adulto-m'>Adulto masculino</MenuItem>
                                    <MenuItem value='0-2 anos'>0-2 anos</MenuItem>
                                    <MenuItem value='2-8 anos'>2-8 anos</MenuItem>
                                </Select>
                            </FormControl>
                            <Button style={{ marginLeft: '10px' }} variant="contained" size="small" onClick={alterarFormulario}>Alterar</Button>
                        </Box>

                        <EntrevistaQualidade setEntrevistaQualidade={setEntrevistaQualidade} entrevistaQualidade={entrevistaQualidade} />
                    </div>
                    <Box m={2} textAlign='center'>
                        <InfoAdicionais data={infoAdicional} />
                    </Box>
                    <RoteiroTeleEntrevista />
                    <div className="info-pessoa-entrevista-container">
                        <div className="title">
                            <h3>Questionário Médico</h3>
                        </div>
                        <InfoPessoaEntrevista pessoa={pessoa} />
                    </div>
                    <div className="observacoes-entrevista">
                        <div className="title">
                            <h3>Observações</h3>
                            <h4>IMC: <span id="imc"></span></h4>
                        </div>
                    </div>
                    <div className="formulario">
                        {
                            perguntas.map(e => {

                                if (e.formulario === formulario && e.categoria === 'questionario') {

                                    if (e.sexo !== 'M' && e.sexo !== 'F') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e} pessoa={pessoa} setAutismo={setAutismo}></Pergunta>
                                            </>
                                        )
                                    }
                                    if (e.sexo === 'M' && sexo === 'M') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e} pessoa={pessoa} setAutismo={setAutismo}></Pergunta>
                                            </>
                                        )
                                    }
                                    if (e.sexo === 'F' && sexo === 'F') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e} pessoa={pessoa} setAutismo={setAutismo}></Pergunta>
                                            </>
                                        )
                                    }
                                }

                                return null
                            })
                        }
                    </div>
                    {
                        habitos ? (
                            <>
                                <div className="perguntas-habitos-container title">
                                    <h3>HÁBITOS E HISTÓRICO FAMILIAR</h3>
                                </div>
                                <div className="formulario">
                                    {
                                        perguntas.map(e => {
                                            if (e.formulario === 'adulto' && e.categoria === 'habitos') {
                                                return (
                                                    <>
                                                        <Pergunta handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e} />
                                                    </>
                                                )
                                            }

                                            return null
                                        })
                                    }
                                </div>
                            </>
                        ) : null
                    }

                    <div className="div-pergunta">
                        <label htmlFor="identifica-divergencia" className="label-pergunta">Identifica Divergência?</label>
                        <select name="identifica-divergencia" id="identifica-divergencia" onChange={e => {
                            mostraDivergencia(e.target.value)
                            if (e.target.value === 'true') {
                                setDivergencia(true)
                                let divIndicadorObesidade = document.getElementById('indicador-obesidade')
                                divIndicadorObesidade.classList.add('none')
                            } else {
                                setDivergencia(false)
                                let divIndicadorObesidade = document.getElementById('indicador-obesidade')
                                divIndicadorObesidade.classList.remove('none')
                            }
                        }}>
                            <option value={false}>Não</option>
                            <option value={true}>Sim</option>
                        </select>
                    </div>

                    <div id="divergencia-container" className="none">
                        <div className="perguntas-habitos-container title">
                            <h3>Identificação de divergências</h3>
                        </div>
                        <div className="divergencias-container">
                            <Alert severity='error'>
                                <Typography m={1}>
                                    Notamos que houve divergência para as patologias: A, B, C (listar patologias) em relação ao preenchimento da DS. Para estas, iremos imputar CPT para ficar de acordo com as informações concedidas pelo Senhor(a). As demais coberturas permanecem inalteradas, caso haja necessidade de maior esclarecimentos procure seu corretor.
                                </Typography>
                                <Typography m={1}>
                                    * Cobertura Parcial Temporária (CPT) aquela que admite, por um período ininterrupto de até 24 meses, a partir da data da contratação ou adesão ao plano privado de assistência à saúde, a suspensão da cobertura de Procedimentos de Alta Complexidade (PAC), leitos de alta tecnologia e procedimentos cirúrgicos, desde que relacionados exclusivamente às doenças ou lesões preexistentes declaradas pelo beneficiário ou seu representante legal. (para os CIDs declarados, não para todo tipo de tratamento)
                                </Typography>
                            </Alert>
                            <div className="div-pergunta">
                                <label htmlFor="pergunta-divergencia" className="label-pergunta">Qual divergência?</label>
                                <input type="text" name="pergunta-qual-divergencia" id="divergencia" className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
                            </div>
                            <div className="div-pergunta">
                                <label htmlFor="pergunta-patologias" className="label-pergunta">Por que o beneficiário não informou na Declaração de Saúde essas patologias?</label>
                                <input type="text" name="pergunta-patologias" id="patologias" className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
                            </div>
                            <div className="div-pergunta">
                                <label htmlFor="cid">CID:</label>
                                <input type="text" name="cid" id="cid" className="input-pergunta" onChange={e => {
                                    buscarCids(e.target.value)
                                }} />

                                <h4>Cids Selecionados: </h4>
                                <div id="cids-selecionados">

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
                    </div>
                    <div id="indicador-obesidade">

                    </div>
                    {
                        autismo && (
                            <Alert severity="error">
                                Agradecemos pelas informações fornecidas e, apenas para fins de esclarecimento, informamos que o serviço de Acompanhante Terapêutico Escolar não possui cobertura pela Operadora de Saúde, visto o disposto na Lei de nº 14.454/2022 e o parecer da Agência Nacional de Saúde Suplementar 25/2022, que é nosso órgão regulador, que dispõe sobre a não cobertura em razão da falta de eficácia científica e técnica e de recomendação dos órgãos competentes.
                            </Alert>
                        )
                    }
                </div>
                <Box display='inline-block'>
                    <ModalFormulario respostas={respostas} cids={arrCids} subRespostas={subRespostas} simOuNao={simOuNao} pessoa={pessoa} divergencia={divergencia} entrevistaQualidade={entrevistaQualidade} />
                </Box>
                <ModalPatologias idCelula={id} celula={'Tele Entrevista'} />
            </section>
        </>
    )
}

export default Formulario