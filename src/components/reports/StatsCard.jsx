import { Card, CardContent, CardTitle } from "../ui/card";


const StatsCard = ({ invoiceStatusData, overDueData, summaryData }) => {

    const getAmount = (status) => invoiceStatusData.find(d => d.status === status)?.total_amount || 0;

    const topPartner = overDueData.reduce(
        (max, curr) => curr.overdue > (max?.overdue || 0) ? curr : max, null
    );

    const overdueAmount = getAmount('overdue');
    const totalAmount = invoiceStatusData.reduce((sum, d) => sum + d.total_amount, 0);
    const overdueRatio = totalAmount ? Math.round((overdueAmount / totalAmount) * 100) : 0;
    const topPartnerRatio = overdueAmount
        ? Math.round((topPartner?.overdue || 0) / overdueAmount * 100)
        : 0;

    const netIncome = summaryData
        ? summaryData.reduce((acc, curr) => acc + (curr.income - curr.expense), 0)
        : 0;
    const totalIncome = summaryData
        ? summaryData.reduce((acc, curr) => acc + curr.income, 0)
        : 0;
    const totalExpense = summaryData
        ? summaryData.reduce((acc, curr) => acc + curr.expense, 0)
        : 0;
    const margin = totalIncome ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardContent>
                    <CardTitle>Legnagyobb kintlevőségű partner</CardTitle>
                    <div className="text-2xl font-bold">
                        {topPartner?.partner || "-"}
                    </div>
                    <div className="text-muted-foreground">
                        {topPartner?.overdue?.toLocaleString('hu-HU') || 0} HUF
                        <span className="ml-2 text-xs">
                            {topPartnerRatio}% a kintlevőségből
                        </span>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <CardTitle>Lejárt számlák aránya</CardTitle>
                    <div className="text-2xl font-bold">
                        {overdueRatio}%
                    </div>
                    <div className="text-muted-foreground">
                        {overdueAmount.toLocaleString('hu-HU')} HUF / {totalAmount.toLocaleString('hu-HU')} HUF
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <CardTitle>Teljes nettó eredmény</CardTitle>
                    <div className="text-2xl font-bold">{netIncome.toLocaleString('hu-HU')} HUF</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <CardTitle>Profit margin</CardTitle>
                    <div className="text-2xl font-bold">{margin}%</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCard