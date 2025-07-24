"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditPartnerForm from "../EditPartnerForm"

const EditPartnerDialog = ({ partner, isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>Partner</DialogTitle>
                    <EditPartnerForm partner={partner} onOpenChange={onOpenChange} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditPartnerDialog