import { getInvoiceStatusSummary, getMonthlyFinanceSummary, getOverdueData, getPartners } from "@/lib/actions/report.actions"
import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import NetBarChartComponent from "./NetBarChartComponent";
import StatsCard from "./StatsCard";

const statusColorMap = {
    in_progress: "var(--color-in_progress)",
    paid: "var(--color-paid)",
    overdue: "var(--color-overdue)"
};

const ReportContainer = async ({ searchParams }) => {

    const params = await searchParams || {};
    const partner = params.partner ? decodeURIComponent(params.partner) : '';

    const summaryData = await getMonthlyFinanceSummary()
    const overDueData = await getOverdueData()
    const partners = await getPartners()
    const invoiceStatusData = await getInvoiceStatusSummary(partner)
    const allInvoiceStatusData = await getInvoiceStatusSummary("")

    const pieChartData = invoiceStatusData.map(item => ({
        ...item,
        fill: statusColorMap[item.status] || "#8884d8"
    }));

    const monthNames = [
        "Jan", "Feb", "Márc", "Ápr", "Máj", "Jún",
        "Júl", "Aug", "Szept", "Okt", "Nov", "Dec"
    ];
    const netIncomeData = summaryData.map(item => ({
        month: monthNames[(item.month || 1) - 1],
        net_income: item.income - item.expense,
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[calc(100vh-72px)] pb-4">
            <div className="rounded-lg col-span-1 lg:col-span-2 h-1/3">
                <NetBarChartComponent
                    data={netIncomeData}
                />
            </div>
            <div className="rounded-lg col-span-1 lg:col-span-3 h-1/3">
                <AreaChartComponent data={summaryData} />
            </div>
            <div className="rounded-lg col-span-5 h-1/3 flex flex-col">
                <StatsCard invoiceStatusData={allInvoiceStatusData} overDueData={overDueData} summaryData={summaryData} />
            </div>
            <div className="rounded-lg col-span-1 lg:col-span-3 h-1/3 flex flex-col">
                <PieChartComponent data={pieChartData} partners={partners} />
            </div>
            <div className="rounded-lg col-span-1 lg:col-span-2 h-1/3 flex flex-col">
                <BarChartComponent data={overDueData} />
            </div>
        </div>

    )
}

export default ReportContainer