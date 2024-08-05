import { Button } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PropostaService } from '../../../../../_services/teleEntrevistaV2.service';
const propostaService = new PropostaService();

const RelatorioRespondeuWhats = () => {

    const handleGerarRelatorio = async () => {

        const data = await propostaService.relatorioRespondeuWhats()

        console.log(data);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sinistros');

        worksheet.columns = [
            { header: 'Data Recebimento', key: 'dataRecebimento', width: 30 },
            { header: 'Vigencia', key: 'vigencia', width: 30 },
            { header: 'Vigencia Amil', key: 'vigenciaAmil', width: 30 },
            { header: 'Proposta', key: 'proposta', width: 30 },
            { header: 'Tipo Associado', key: 'tipoAssociado', width: 30 },
            { header: 'Nome', key: 'nome', width: 30 },
            { header: 'Cpf', key: 'cpf', width: 30 },
            { header: 'Cpf Titular', key: 'cpfTitular', width: 30 },
            { header: 'Data Nascimento', key: 'dataNascimento', width: 30 },
            { header: 'Status', key: 'status', width: 30 },
            { header: 'telefone', key: 'telefone', width: 30 },
            { header: 'Respondeu', key: 'respondeu', width: 30 },
            { header: 'Tipo Contrato', key: 'tipoContrato', width: 30 },
            { header: 'Tentativas De Contato', key: 'tentativasDeContato', width: 30 },
            { header: 'Tentativa 1', key: 'tentativaContato1', width: 30 },
            { header: 'Responsavel 1', key: 'responsavelContato1', width: 30 },
            { header: 'Tentativa 2', key: 'tentativaContato2', width: 30 },
            { header: 'Responsavel 2', key: 'responsavelContato2', width: 30 },
            { header: 'Tentativa 3', key: 'tentativaContato3', width: 30 },
            { header: 'Responsavel 3', key: 'responsavelContato3', width: 30 },
        ]

        data.forEach(e => {
            worksheet.addRow({
                dataRecebimento: new Date(e.dataRecebimento),
                vigencia: new Date(e.vigencia),
                vigenciaAmil: new Date(e.vigenciaAmil),
                proposta: e.proposta,
                tipoAssociado: e.tipoAssociado,
                nome: e.nome,
                cpf: e.cpf,
                cpfTitular: e.cpfTitular,
                dataNascimento: e.dataNascimento,
                status: e.status,
                telefone: e.telefone,
                respondeu: e.respondeu,
                tipoContrato: e.tipoContrato,
                tentativasDeContato: e?.tentativasDeContato?.length,
                tentativaContato1: e.tentativasDeContato && e?.tentativasDeContato[0]?.data,
                responsavelContato1: e.tentativasDeContato && e?.tentativasDeContato[0]?.responsavel,
                tentativaContato2: e.tentativasDeContato && e?.tentativasDeContato[1]?.data,
                responsavelContato2: e.tentativasDeContato && e?.tentativasDeContato[1]?.responsavel,
                tentativaContato3: e.tentativasDeContato && e?.tentativasDeContato[2]?.data,
                responsavelContato3: e.tentativasDeContato && e?.tentativasDeContato[2]?.responsavel,
            })
        })

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), 'RelatorioRespondeuWhats.xlsx')
    }

    return (
        <Button
            onClick={handleGerarRelatorio}
            variant="contained"
            color="primary"
        >
            Gerar Relatório
        </Button>
    )
}

export default RelatorioRespondeuWhats