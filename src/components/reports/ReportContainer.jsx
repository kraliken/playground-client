import { getInvoiceStatusSummary, getMonthlyFinanceSummary, getPartners } from "@/lib/actions/report.actions"
import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";

const statusColorMap = {
    in_progress: "var(--color-in_progress)",
    paid: "var(--color-paid)",
    overdue: "var(--color-overdue)"
};

const ReportContainer = async ({ searchParams }) => {

    const params = await searchParams || {};
    const partner = params.partner ? decodeURIComponent(params.partner) : '';

    const summaryData = await getMonthlyFinanceSummary()
    const partners = await getPartners()
    const invoiceStatusData = await getInvoiceStatusSummary(partner)

    const pieChartData = invoiceStatusData.map(item => ({
        ...item,
        fill: statusColorMap[item.status] || "#8884d8"
    }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-4">
            <div className="rounded-lg lg:col-span-3">
                <AreaChartComponent data={summaryData} />
            </div>
            <div className="rounded-lg lg:col-span-2">
                <PieChartComponent data={pieChartData} partners={partners} />
            </div>
            {/* <div className="rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
                <BarChartComponent data={summaryData} />
            </div> */}
        </div >

    )
}

export default ReportContainer