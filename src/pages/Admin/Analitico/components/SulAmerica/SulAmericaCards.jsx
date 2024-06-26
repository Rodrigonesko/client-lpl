import CardDashboardSulAmerica from "../../../../../components/Card/CardDashboardSulAmerica"
import { AlignHorizontalLeft, AutorenewOutlined, Cancel, Done } from "@mui/icons-material"

const SulAmericaCards = ({ data, totalEmAndamentoAiniciarAgendado }) => {

    return (
        <>
            <CardDashboardSulAmerica title='Concluídos' value={data.concluidos} icon={<Done color="success" />} />
            <CardDashboardSulAmerica title='Sem sucesso' value={data.cancelados} icon={<Cancel color="error" />} />
            <CardDashboardSulAmerica title='Em Andamento' value={totalEmAndamentoAiniciarAgendado} icon={<AutorenewOutlined color="primary" />} />
            <CardDashboardSulAmerica title='Total' value={data.total} icon={<AlignHorizontalLeft color="warning" />} />
        </>
    )
}

export default SulAmericaCards