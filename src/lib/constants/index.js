import { AreaChart, Banknote, BookOpen, Briefcase, ChevronsLeftRightEllipsis, CloudUpload, FileDigit, FileOutput, FileSpreadsheet, FileWarning, Mail, Send, Smartphone, UserPen } from "lucide-react";

export const aerozoneListLinks = [
    {
        label: "Feltöltés",
        icon: <CloudUpload />,
        href: "/task/invoice-sender/upload",
        colorKey: "",
    },
    {
        label: "Küldés",
        icon: <Send />,
        href: "/task/invoice-sender/send",
        colorKey: "",
    },
    {
        label: "Partnerek",
        icon: <UserPen />,
        href: "/task/invoice-sender/partners",
        colorKey: "",
    },
    {
        label: "E-mailek",
        icon: <Mail />,
        href: "/task/invoice-sender/emails",
        colorKey: "",
    },
    {
        label: "Kapcsolatok",
        icon: <ChevronsLeftRightEllipsis />,
        href: "/task/invoice-sender/connections",
        colorKey: "",
    },
    // {
    //     label: "Oracle",
    //     icon: <FileSpreadsheet />,
    //     href: "/task/oracle-processing",
    //     colorKey: "",
    // },
    // {
    //     label: "Vodafone",
    //     icon: <FileOutput />,
    //     href: "/task/vodafone-extractor",
    //     colorKey: "",
    // }
]
export const nijhofListLinks = [
    {
        label: "MultiAlarm",
        icon: <CloudUpload />,
        href: "/task/upload/multialarm",
        colorKey: "",
    },
    {
        label: "Volvo",
        icon: <CloudUpload />,
        href: "/task/upload/volvo",
        colorKey: "",
    }
]
export const esselteListLinks = [
    {
        label: "Vodafone",
        icon: <Smartphone />,
        href: "/task/upload/vodafone",
        colorKey: "",
    },
    {
        label: "Adatbázis",
        icon: <FileDigit />,
        href: "/task/upload/vodafone/database",
        colorKey: "",
    }
]

export const reportListLinks = [
    {
        label: "Összesítő",
        icon: <AreaChart />,
        href: "/reports/summary ",
        colorKey: "",
    },
    // {
    //     label: "Kintlevőségek",
    //     icon: <FileWarning />,
    //     href: "/reports/invoice-status",
    //     colorKey: "",
    // },
    // {
    //     label: "Bérkültségek",
    //     icon: <Banknote />,
    //     href: "/reports/upload/vodafone/database",
    //     colorKey: "",
    // }
]