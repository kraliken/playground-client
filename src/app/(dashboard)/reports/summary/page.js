import ReportContainer from "@/components/reports/ReportContainer"


const ReportsPage = async ({ searchParams }) => {
    return (
        <div className="h-[calc(100vh-68px)]">
            <ReportContainer searchParams={searchParams} />
        </div>
    )
}

export default ReportsPage