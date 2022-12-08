import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import RoteiroTeleEntrevista from "../../../components/RoteiroTeleEntrevista/RoteiroTeleEntrevista";
import InfoPessoaEntrevista from "../../../components/InfoPessoaEntrevista/InfoPessoaEntrevista";
import Pergunta from "../../../components/Pergunta/Pergunta";
import gerarPdf from "../Pdf/Pdf";
import Modal from 'react-modal'

import './Formulario.css'

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
    const [cidsSelecionados, setCidsSelecionados] = useState([])
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

    const [subResp, setSubResp] = useState({})
    const [resp, setResp] = useState({})
    const [simnao, setSimNao] = useState({})

    const [novoFormulario, setNovoFormulario] = useState('')

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

    const buscarInfoPessoa = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/pessoa/${id}`, { withCredentials: true })

            setPessoa(result.data.pessoa)
            setFormulario(result.data.pessoa.formulario)
            setSexo(result.data.pessoa.sexo)
            if (result.data.pessoa.formulario != 'adulto') {
                setHabitos(false)
            }

            console.log(result);

            setRiscoBeneficiario(result.data.pessoa.riscoBeneficiario)
            setRiscoImc(result.data.pessoa.riscoImc)
            setSinistral(result.data.pessoa.sinistral)
            setTipoAssociado(result.data.pessoa.tipoAssociado)
            setGrupoCarencia(result.data.pessoa.grupoCarencia)
            setDs1(result.data.pessoa.d1)
            setDs2(result.data.pessoa.d2)
            setDs3(result.data.pessoa.d3)
            setDs4(result.data.pessoa.d4)
            setDs5(result.data.pessoa.d5)
            setDs6(result.data.pessoa.d6)
            setDs7(result.data.pessoa.d7)
            setDs8(result.data.pessoa.d8)
            setDs9(result.data.pessoa.d9)
            setPeso(result.data.pessoa.peso)
            setAltura(result.data.pessoa.altura)
            setImc(result.data.pessoa.imc)
            setCidAnterior1(result.data.pessoa.cid1)
            setCidAnterior2(result.data.pessoa.cid2)
            setCidAnterior3(result.data.pessoa.cid3)

        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (item) => {
        respostas[`${item.id}`] = item.value
        setResp(respostas)

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

            console.log(indicadorImc, imc);

            if (imc >= 30) {
                let span = document.createElement('span')
                span.textContent = `De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.`
                document.getElementById('indicador-obesidade').innerHTML = `<div class='indicador-imc'>De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.</div>`
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

            console.log(indicadorImc, imc);

            if (imc >= 30) {
                let span = document.createElement('span')
                span.textContent = `De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.`
                document.getElementById('indicador-obesidade').innerHTML = `<div class='indicador-imc'>De acordo com a OMS pelo cálculo realizado com as informações de seu peso e altura, o Sr(a) está inserido na faixa de peso ${indicadorImc} com isso será necessário incluirmos essa informação e constará no seu contrato pré-existência para esta patologia.</div>`
            }
        }


    }

    const handleChangeSub = (item) => {
        subRespostas[`${item.id}`] = item.value
        console.log(subRespostas);
        setSubResp(subRespostas)

    }

    const handleSimOuNao = (item) => {
        let split = item.name.split('-')
        simOuNao[`${split[1]}`] = item.value
        console.log(simOuNao);
    }

    const enviarDados = async () => {
        try {

            console.log(respostas);
            console.log(subRespostas);

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
                arrCids = []
                respostas = {}
                subRespostas = {}
                simOuNao = {}
            }

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

        let div = document.getElementById('cids-selecionados')

        if (item.checked == true) {
            arrCids.push(item.value)
            let div1 = document.createElement('div')
            let span = document.createElement('span')
            span.textContent = item.value
            div1.appendChild(span)
            div.appendChild(div1)
        }

        if (item.checked == false) {
            let indice = arrCids.indexOf(item.value)
            arrCids.splice(indice, 1)
        }

    }

    const mostraDivergencia = (item) => {
        let div = document.getElementById('divergencia-container')
        if (item === 'true') {
            div.classList.remove('none')
        } else {
            div.classList.add('none')
            console.log('oi');
        }
    }

    const alterarFormulario = async () => {
        try {
            console.log(novoFormulario);

            if (!novoFormulario == '') {
                const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/entrevistas/propostas/alterarFormulario`, {
                    formulario: novoFormulario,
                    id: id
                }, {
                    withCredentials: true
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
        buscarPerguntas()
        buscarInfoPessoa()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-formulario-container">
                <div className="formulario-container">
                    <div className="title">
                        <h3>Entrevista Qualificativa</h3>
                        <label htmlFor="alterar-formulario">Alterar Formulario</label>
                        <select name="alterar-formulario" id="alterar-formulario" onChange={e => setNovoFormulario(e.target.value)}>
                            <option value=""></option>
                            <option value="adulto">Adulto</option>
                            <option value="0-2 anos">0-2 anos</option>
                            <option value="2-8 anos">2-8 anos</option>
                        </select>
                        <button onClick={alterarFormulario}>Alterar</button>
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
                    {
                        habitos ? (
                            <>
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
                            </>
                        ) : null
                    }

                    <div className="div-pergunta">
                        <label htmlFor="identifica-divergencia" className="label-pergunta">Identifica Divergência?</label>
                        <select name="identifica-divergencia" id="identifica-divergencia" onChange={e => {
                            mostraDivergencia(e.target.value)
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
                                    {/* {
                                        cidsSelecionados.map(item => {
                                            return (
                                                <div>
                                                    <span>{item}</span>
                                                </div>
                                            )
                                        })
                                    } */}
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
                    onRequestClose={closeModal}
                    contentLabel="Exemplo"
                    overlayClassName='modal-overlay'
                    className='modal-content modal-info' >
                    <div className="title">
                        <h2>Informações do beneficiario!</h2>
                    </div>
                    <div>
                        <div className="div-pergunta">
                            <label htmlFor="">Risco Beneficiário</label>
                            <input type="text" className="input-pergunta" defaultValue={riscoBeneficiaro} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">Risco Imc</label>
                            <input type="text" className="input-pergunta" defaultValue={riscoImc} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">Sinistral</label>
                            <input type="text" className="input-pergunta" defaultValue={sinistral} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">Tipo Associado</label>
                            <input type="text" className="input-pergunta" defaultValue={tipoAssociado} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">Grupo Carência</label>
                            <input type="text" className="input-pergunta" defaultValue={grupoCarencia} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 1</label>
                            <input type="text" className="input-pergunta" defaultValue={ds1} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 2</label>
                            <input type="text" className="input-pergunta" defaultValue={ds2} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 3</label>
                            <input type="text" className="input-pergunta" defaultValue={ds3} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 4</label>
                            <input type="text" className="input-pergunta" defaultValue={ds4} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 5</label>
                            <input type="text" className="input-pergunta" defaultValue={ds5} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 6</label>
                            <input type="text" className="input-pergunta" defaultValue={ds6} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 7</label>
                            <input type="text" className="input-pergunta" defaultValue={ds7} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 8</label>
                            <input type="text" className="input-pergunta" defaultValue={ds8} disabled />
                        </div>
                        <div className="div-pergunta">
                            <label htmlFor="">DS 9</label>
                            <input type="text" className="input-pergunta" defaultValue={ds9} disabled />
                        </div>
                    </div>
                    <button onClick={() => {
                        closeModalInfo()
                    }}>Ok</button>
                </Modal>
            </section>
        </>
    )
}

export default Formulario