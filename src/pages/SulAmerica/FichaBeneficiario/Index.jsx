import { useParams } from "react-router-dom"
import Sidebar from "../../../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { getBeneficiarioById } from "../../../_services/sulAmerica.service"

const FichaBeneficiarioSulAmerica = () => {

    const { id } = useParams()

    const [data, setData] = useState()

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getBeneficiarioById(id)
                setData(result)
            } catch (error) {
                console.log(error);
            }
        }

        fetch()
    }, [id])

    return (
        <Sidebar>
            Ficha Beneficiario
            {id}
            {data?.nome}
        </Sidebar>
    )
}

export default FichaBeneficiarioSulAmerica