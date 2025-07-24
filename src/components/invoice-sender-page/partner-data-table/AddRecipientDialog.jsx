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
import AddRecepientForm from "../AddRecepientForm"

const AddRecipientDialog = ({ partner, isOpen, onOpenChange }) => {

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>{partner.name}</DialogTitle>
                    <AddRecepientForm partner={partner} onOpenChange={onOpenChange} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddRecipientDialog