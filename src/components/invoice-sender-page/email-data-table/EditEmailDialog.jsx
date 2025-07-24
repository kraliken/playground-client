"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EditEmailForm from "../EditEmailForm"

const EditEmailDialog = ({ email, isOpen, onOpenChange }) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogContent className="[&>button]:hidden">
                <DialogHeader>
                    <DialogTitle>Email</DialogTitle>
                    <EditEmailForm email={email} onOpenChange={onOpenChange} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditEmailDialog