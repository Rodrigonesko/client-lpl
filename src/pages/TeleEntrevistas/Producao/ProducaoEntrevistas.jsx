import React, { useEffect, useState } from "react";
import Axios from 'axios'
import Sidebar from "../../../components/Sidebar/Sidebar";
// import TabelaProducao from "./TabelaProducao/TabelaProducao";
import TabelaProducaoMui from "./TabelaProducao/TabelaProducaoMui";
import './ProducaoEntrevistas.css'
import { CircularProgress } from "@mui/material";

const ProducaoEntrevistas = () => {

    const [producao, setProducao] = useState([])
    const [loading, setLoading] = useState(false)
    const [producaoRns, setProducaoRns] = useState([])

    useEffect(() => {

        const buscarDados = async () => {
            try {

                setLoading(true)

                const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/entrevistas/teste/producao`, { withCredentials: true })

                setProducao(result.data.arrQuantidadeTotalMes)

                console.log(result.data.arrRns);

                setProducaoRns(result.data.arrRns)

                setLoading(false)


            } catch (error) {
                console.log(error);
            }
        }

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
                    {
                        loading ? (
                            <CircularProgress style={{ position: 'absolute', top: '50%', right: '50%' }} />
                        ) : null
                    }
                    {/* <TabelaProducao producao={producao}></TabelaProducao> */}

                    <TabelaProducaoMui producao={producao}></TabelaProducaoMui>
{/* 
                    <TabelaProducaoMui producao={producaoRns}></TabelaProducaoMui> */}

                    <br />

                </div>

            </section>
        </>
    )
}

export default ProducaoEntrevistas