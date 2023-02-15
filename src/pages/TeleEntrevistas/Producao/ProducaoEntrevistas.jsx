import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
import TabelaProducao from "./TabelaProducao/TabelaProducao";
import './ProducaoEntrevistas.css'

const ProducaoEntrevistas = () => {

    const [producao, setProducao] = useState([])
    // const [producaoRns, setProducaoRns] = useState([])

    const buscarDados = async () => {
        try {

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/teste/producao`, { withCredentials: true })

            console.log(result);

            setProducao(result.data.arrQuantidadeTotalMes)

            // setProducaoRns(result.data.arrRns)


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
            <section className="section-producao-entrevistas-container">
                <div className="producao-entrevistas-container">
                    <div className="title producao-entrevistas">
                        <h3>Produção Entrevistas</h3>
                    </div>
                    <TabelaProducao producao={producao}></TabelaProducao>
                </div>

            </section>
        </>
    )
}

export default ProducaoEntrevistas