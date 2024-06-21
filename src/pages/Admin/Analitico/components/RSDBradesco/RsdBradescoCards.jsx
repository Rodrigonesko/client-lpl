import { AlignHorizontalLeft, AutorenewOutlined, Cancel, Done } from "@mui/icons-material"
import CardDashboardRsdBradesco from "../../../../../components/Card/CardDashboardRsdBradesco"

const RsdBradescoCards = ({ data }) => {

    return (
        <>
            <CardDashboardRsdBradesco title='Concluídos Pacotes' value={data.concluidos} icon={<Done color="success" />} />
            <CardDashboardRsdBradesco title='A Iniciar Pacotes' value={data.aIniciar} icon={<Cancel color="error" />} />
            <CardDashboardRsdBradesco title='Em Andamento Pacotes' value={data.emAndamento} icon={<AutorenewOutlined color="primary" />} />
            <CardDashboardRsdBradesco title='Total Pacotes' value={data.total} icon={<AlignHorizontalLeft color="warning" />} />
        </>
    )
}

export default RsdBradescoCards