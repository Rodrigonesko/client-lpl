import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Sidebar from "../../../components/Sidebar/Sidebar";
import './FichaBeneficiario.css'

const FichaBeneficiario = () => {

    const { mo } = useParams()

    const buscarMo = async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pessoas/${mo}`, { withCredentials: true })

        console.log(result);
    }

    useEffect(() => {
        buscarMo()
    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section className="">
                <div>

                </div>
            </section>
        </>
    )
}

export default FichaBeneficiario
