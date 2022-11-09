import React, { useState } from "react";
import Axios from 'axios'
import * as XLSX from "xlsx";
import Sidebar from "../../../components/Sidebar/Sidebar";

const RelatorioRsd = () => {

    const [msg, setMsg] = useState('')

    const gerarRelatorio = async () => {
        try {

            setMsg('Buscando Dados...')

            const result = await Axios.get(`${process.env.REACT_APP_API_KEY}/rsd/pedidos/todos`, { withCredentials: true })

            console.log(result);

            const ws = XLSX.utils.json_to_sheet(result.data.pedidos)
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
            XLSX.writeFile(wb, 'reportRSD.xlsx')


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Sidebar></Sidebar>
            <section>
                <div>
                    <div className="title">
                        Relatório RSD
                    </div>
                    <div>
                        <button onClick={gerarRelatorio} >Gerar Relatório</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RelatorioRsd