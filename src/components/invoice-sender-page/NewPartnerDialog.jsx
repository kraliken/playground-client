"use client"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import NewPartnerForm from "./NewPartnerForm"
import { useState } from "react"

const NewPartnerDialog = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog
            open={isDialogOpen}
            onOpenChange={() => { }}
        >
            <DialogTrigger asChild>
                <Button size='sm' onClick={() => setIsDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-0 sm:mr-1" />
                    <span className='hidden sm:inline'>Új partner</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
                <DialogTitle>Új partner</DialogTitle>
                <NewPartnerForm onOpenChange={handleCloseDialog} />
            </DialogContent>
        </Dialog>
    )
}

export default NewPartnerDialog