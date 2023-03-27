import React, { useState, useEffect, } from "react";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import Pergunta from "../../../components/Pergunta/Pergunta";
import gerarPdf from "../Pdf/Pdf";
import Modal from 'react-modal'
import InfoAdicionais from "./InfoAdicional/InfoAdicional";
import { Alert, Select, Button, InputLabel, FormControl, MenuItem, Box, CircularProgress } from '@mui/material'

import './Formulario.css'
import { getCookie } from "react-use-cookie";

Modal.setAppElement('#root')

let arrCids = [

]

let respostas = {

}

let subRespostas = {

}

let simOuNao = {

}

const Formulario = () => {

    const { id } = useParams()

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)

    const [perguntas, setPerguntas] = useState([])
    const [pessoa, setPessoa] = useState({})
    const [formulario, setFormulario] = useState('')
    const [sexo, setSexo] = useState('')
    const [divergencia, setDivergencia] = useState(false)
    const [cids, setCids] = useState([])
    const [habitos, setHabitos] = useState(true)

    const [riscoBeneficiaro, setRiscoBeneficiario] = useState('')
    const [riscoImc, setRiscoImc] = useState('')
    const [sinistral, setSinistral] = useState('')
    const [tipoAssociado, setTipoAssociado] = useState('')
    const [grupoCarencia, setGrupoCarencia] = useState('')
    const [ds1, setDs1] = useState('')
    const [ds2, setDs2] = useState('')
    const [ds3, setDs3] = useState('')
    const [ds4, setDs4] = useState('')
    const [ds5, setDs5] = useState('')
    const [ds6, setDs6] = useState('')
    const [ds7, setDs7] = useState('')
    const [ds8, setDs8] = useState('')
    const [ds9, setDs9] = useState('')
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [imc, setImc] = useState('')
    const [cidAnterior1, setCidAnterior1] = useState('')
    const [cidAnterior2, setCidAnterior2] = useState('')
    const [cidAnterior3, setCidAnterior3] = useState('')

    const [novoFormulario, setNovoFormulario] = useState('')

    const [loading, setLoading] = useState(false)

    let alturaInput, pesoInput

    const openModal = () => {
        setModalIsOpen(true)
    }
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const openModalInfo = () => {
        setModalInfo(true)
    }
    const closeModalInfo = () => {
        setModalInfo(false)
    }

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
                cids: arrCids,
                divergencia
            }, {
                withCredentials: true
            })

            gerarPdf(pessoa.proposta, pessoa.nome)

            if (result.status === 200) {
                openModal()
            }

        } catch (error) {
            console.log(error);
        }
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

                console.log(result);

                setRiscoBeneficiario(result.data.riscoBeneficiario)
                setRiscoImc(result.data.riscoImc)
                setSinistral(result.data.sinistral)
                setTipoAssociado(result.data.tipoAssociado)
                setGrupoCarencia(result.data.grupoCarencia)
                setDs1(result.data.d1)
                setDs2(result.data.d2)
                setDs3(result.data.d3)
                setDs4(result.data.d4)
                setDs5(result.data.d5)
                setDs6(result.data.d6)
                setDs7(result.data.d7)
                setDs8(result.data.d8)
                setDs9(result.data.d9)
                setPeso(result.data.peso)
                setAltura(result.data.altura)
                setImc(result.data.imc)
                setCidAnterior1(result.data.cid1)
                setCidAnterior2(result.data.cid2)
                setCidAnterior3(result.data.cid3)

            } catch (error) {
                console.log(error);
            }
        }

        buscarPerguntas()
        buscarInfoPessoa()
    }, [id])

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
                                    <MenuItem value='2-8 anos'>2-8 ano</MenuItem>
                                </Select>
                            </FormControl>
                            <Button style={{ marginLeft: '10px' }} variant="contained" size="small" onClick={alterarFormulario}>Alterar</Button>
                        </Box>
                    </div>
                    <div className="info-adicional">
                        <button onClick={openModalInfo}>Informações Adicionais</button>
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
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                            </>
                                        )
                                    }
                                    if (e.sexo === 'M' && sexo === 'M') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
                                            </>
                                        )
                                    }
                                    if (e.sexo === 'F' && sexo === 'F') {
                                        return (
                                            <>
                                                <Pergunta sexo={sexo} formulario={formulario} handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
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
                                                        <Pergunta handleSimOuNao={handleSimOuNao} handleChangeSub={handleChangeSub} handleChange={handleChange} item={e}></Pergunta>
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
                            console.log(e.target.value);
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
                                Notamos que houve divergência para as patologias: A, B, C (listar patologias) em relação ao preenchimento da DS. Para estas, iremos imputar CPT para ficar de acordo com as informações concedidas pelo Senhor(a). As demais coberturas permanecem inalteradas, caso haja necessidade de maior esclarecimentos procure seu corretor.
                            </Alert>
                            <div className="div-pergunta">
                                <label htmlFor="pergunta-divergencia" className="label-pergunta">Qual divergência?</label>
                                <input type="text" name="pergunta-qual-divergencia" id="divergencia" className="input-pergunta" onKeyUp={e => handleChange(e.target)} />
                            </div>
                            <div className="div-pergunta">
                                <label htmlFor="pergunta-patologias" className="label-pergunta">Por que o beneficiario não informou na ds essas patologias?</label>
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
                    <div className="btn-enviar-form-btn">
                        <button onClick={enviarDados} >Enviar</button>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content'>
                    <div className="title">
                        <h2>Entrevista Realizada e Salva com Sucesso!</h2>
                    </div>
                    <button onClick={() => {
                        closeModal()
                    }}>Ok</button>
                </Modal>
                <Modal
                    isOpen={modalInfo}
                    onRequestClose={closeModalInfo}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content modal-info' >
                    <div className="title">
                        <h2>Informações do beneficiario!</h2>
                    </div>
                    <InfoAdicionais
                        riscoBeneficiaro={riscoBeneficiaro}
                        riscoImc={riscoImc}
                        sinistral={sinistral}
                        tipoAssociado={tipoAssociado}
                        grupoCarencia={grupoCarencia}
                        ds1={ds1}
                        ds2={ds2}
                        ds3={ds3}
                        ds4={ds4}
                        ds5={ds5}
                        ds6={ds6}
                        ds7={ds7}
                        ds8={ds8}
                        ds9={ds9}
                        peso={peso}
                        altura={altura}
                        imc={imc}
                        cidAnterior1={cidAnterior1}
                        cidAnterior2={cidAnterior2}
                        cidAnterior3={cidAnterior3}
                    />
                    <button onClick={() => {
                        closeModalInfo()
                    }}>Ok</button>
                </Modal>
            </section>
        </>
    )
}

export default Formulario