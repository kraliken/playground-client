import { ChevronsLeftRightEllipsis, CloudUpload, FileOutput, FileSpreadsheet, Mail, Send, UserPen } from "lucide-react";

export const taskListLinks = [
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