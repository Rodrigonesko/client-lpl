import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Axios from 'axios'
import moment from "moment/moment";
import { useParams } from "react-router-dom";

const AnaliseElegibilidadeDetalhes = () => {



    useEffect(() => {

    }, [])

    return (
        <>
            <Sidebar></Sidebar>
            <section>
                <div>
                    <div className="title">
                        <h3>1° fase: analista</h3>
                    </div>
                    <div className="title">
                        <h3>2° fase: analista</h3>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default AnaliseElegibilidadeDetalhes
