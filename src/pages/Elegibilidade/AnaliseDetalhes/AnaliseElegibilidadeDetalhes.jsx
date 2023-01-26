import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import './AnaliseElegibilidadeDetalhes.css'
import StatusGeral from "./StatusGeral";
import DadosElegibilidade from "./DadosElegebilidade";
import ProcessamentoElegibilidade from "./ProcessamentoElegibilidade";
import AgendaElegibilidade from "./AgendaElegibilidade";
import { Modal, Button, Box, Typography } from "@mui/material";
import ModalEnviarUnder from "./Modals/ModalEnviarUnder";
import ModalEnviarCancelamento from "./Modals/ModalEnviarCancelamento";
import ModalDevolucao from "./Modals/ModalDevolucao";

// Modal.setAppElement('#root')

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AnaliseElegibilidadeDetalhes = () => {

    const { id } = useParams()

    const [proposta, setProposta] = useState({})

    const [sisAmilDeacordo, setSisAmilDeacordo] = useState('')
    const [contrato, setContrato] = useState('')
    const [prc, setPrc] = useState('')
    const [ligacao, setLigacao] = useState('')
    const [site, setSite] = useState('')
    const [statusContrato600, setStatusContrato600] = useState(false)
    const [statusContrato118, setStatusContrato118] = useState(false)
    const [comentario, setComentario] = useState('')
    const [agenda, setAgenda] = useState([])
    const [prcs, setPrcs] = useState([])

    const [modalSalvar, setModalSalvar] = useState(false)
    const [modalEnviarUnder, setModalEnviarUnder] = useState(false)
    const [modalEnviarCancelamento, setModalEnviarCancelamento] = useState(false)
    const [modalDevolucao, setModalDevolucao] = useState(false)

    const buscarDados = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })
        setProposta(result.data.proposta)

        console.log(result.data.proposta.sisAmilDeacordo);

        setSisAmilDeacordo(result.data.proposta.sisAmilDeacordo)
        setContrato(result.data.proposta.contrato)
        setPrc(result.data.proposta.prc)
        setLigacao(result.data.proposta.ligacao)
        setSite(result.data.proposta.site)

        if (result.data.proposta.contrato === '600') {
            setStatusContrato600(true)
            console.log(result.data.proposta.contrato);
        }
        if (result.data.proposta.contrato === '118') {
            setStatusContrato118(true)
            console.log(result.data.proposta.contrato);
        }

        if (result.data.proposta.status === 'A iniciar') {
            await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/proposta/alterarStatus`, {
                id
            }, {
                withCredentials: true
            })

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/infoProposta/${id}`, { withCredentials: true })
            setProposta(result.data.proposta)

        }

        const resultAgenda = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/agenda/${result.data.proposta.proposta}`, { withCredentials: true })

        setAgenda(resultAgenda.data.agenda)

        const resultPrcs = await Axios.get(`${process.env.REACT_APP_API_KEY}/elegibilidade/prc`, { withCredentials: true })

        setPrcs(resultPrcs.data.prc)

    }

    const salvarDados = async () => {
        try {

            const result = await Axios.put(`${process.env.REACT_APP_API_KEY}/elegibilidade/proposta/salvarDadosAnalise`, {
                id,
                sisAmilDeacordo,
                contrato,
                prc,
                ligacao,
                site,
                comentario,
                proposta: proposta.proposta
            }, {
                withCredentials: true
            })

            console.log(result);

            if (result.status === 200) {
                setModalSalvar(true)
            }

            //console.log(sisAmilDeacordo, contrato, prc, ligacao, site, comentario);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarDados()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="section-analise-detalhes">
                <div>
                    <div className="title">
                        <h3>1° fase: {proposta.analistaPreProcessamento}</h3>
                    </div>
                    <div className="title">
                        <h3>2° fase: {proposta.analista}</h3>
                    </div>
                    <div className="info-proposta-container">
                        <div className="title">
                            <h3>{proposta.proposta} - {proposta.nome}</h3>
                        </div>
                        <StatusGeral
                            statusProposta={proposta.status}
                            status1Analise={proposta.status1Analise}
                            status2Analise={proposta.status2Analise}
                            status3Analise={proposta.status3Analise}
                        />
                        <DadosElegibilidade
                            proposta={proposta.proposta}
                            vigencia={moment(proposta.vigencia).format('DD/MM/YYYY')}
                            nome={proposta.nome}
                            administradora={proposta.administradora}
                            numeroVidas={proposta.numeroVidas}
                            entidade={proposta.entidade}
                            dataImportacao={moment(proposta.dataImportacao).format('DD/MM/YYYY')}
                            tipoVinculo={proposta.tipoVinculo}
                            statusMotor={proposta.statusMotor}
                        />
                        <ProcessamentoElegibilidade
                            sisAmilDeacordo={sisAmilDeacordo}
                            setSisAmilDeacordo={setSisAmilDeacordo}
                            contrato={contrato}
                            setContrato={setContrato}
                            prc={prc}
                            setPrc={setPrc}
                            ligacao={ligacao}
                            setLigacao={setLigacao}
                            site={site}
                            setSite={setSite}
                            planoAnterior={proposta.planoAnterior}
                            observacoes={proposta.observacoes}
                            documentoIdentificacao={proposta.documentoIdentificacao}
                            declaracaoAssociado={proposta.declaracaoAssociado}
                            vinculadosSimNao={proposta.vinculadosSimNao}
                            vinculados={proposta.vinculados}
                            planoAmil={proposta.planoAmil}
                            dataInicioPlanoAmil={moment(proposta.dataInicioPlanoAmil).format('DD/MM/YYYY')}
                            dataFimPlanoAmil={moment(proposta.dataFimPlanoAmil).format('DD/MM/YYYY')}
                            custoPlanoAmil={proposta.custoPlanoAmil}
                            faltaDoc={proposta.faltaDoc}
                            statusContrato600={statusContrato600}
                            statusContrato118={statusContrato118}
                            prcs={prcs}
                        />
                        <AgendaElegibilidade
                            setComentario={setComentario}
                            agenda={agenda}
                        />
                        <div className="btn-detalhes-elegi">
                            <button className="btn-padrao-azul" onClick={salvarDados} >Salvar</button>
                            <button className="btn-padrao-verde" onClick={() => {
                                setModalEnviarUnder(true)
                            }} >Enviar Under</button>
                            <button className="btn-padrao-vermelho" onClick={() => {
                                setModalEnviarCancelamento(true)
                            }} >Enviar Cancelamento</button>
                            <button className="btn-padrao-amarelo" onClick={() => {
                                setModalDevolucao(true)
                            }} >1° Devolução</button>
                            <button className="btn-padrao-amarelo" onClick={() => {
                                setModalDevolucao(true)
                            }} >2° Devolução</button>
                            <button className="btn-padrao-amarelo" onClick={() => {
                                setModalDevolucao(true)
                            }} >3° Devolução</button>
                            <button className="btn-padrao-vermelho">Cancelar</button>
                        </div>
                    </div>
                </div>
                <Modal
                    open={modalSalvar}
                    onClose={() => { setModalSalvar(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box component='span' sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Dados salvos com sucesso
                            </Typography>
                        </Box>
                        <Box component="span" sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="success" onClick={() => { setModalSalvar(false) }}>Ok</Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={modalEnviarUnder}
                    onClose={() => setModalEnviarUnder(false)}
                >
                    <Box sx={style}>
                        <ModalEnviarUnder setModal={setModalEnviarUnder} ></ModalEnviarUnder>
                    </Box>

                </Modal>
                <Modal
                    open={modalEnviarCancelamento}
                    onClose={() => setModalEnviarCancelamento(false)}
                >
                    <Box sx={style}>
                        <ModalEnviarCancelamento setModal={setModalEnviarCancelamento} ></ModalEnviarCancelamento>
                    </Box>

                </Modal>
                <Modal
                    open={modalDevolucao}
                    onClose={() => setModalDevolucao(false)}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <ModalDevolucao setModal={setModalDevolucao} ></ModalDevolucao>
                    </Box>

                </Modal>

            </section>
        </>
    )
}

export default AnaliseElegibilidadeDetalhes
