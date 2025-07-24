"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import AddCarbonCopyForm from "../AddCarbonCopyForm"

const AddCarbonCopyDialog = ({ partner, isOpen, onOpenChange }) => {

    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>{partner.name}</DialogTitle>
                    <AddCarbonCopyForm partner={partner} onOpenChange={onOpenChange} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddCarbonCopyDialog