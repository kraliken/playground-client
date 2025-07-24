"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import NewEmailForm from "./NewEmailForm"

const NewEmailDialog = () => {

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
                    <span className='hidden sm:inline'>Új e-mail</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="[&>button]:hidden">
                <DialogTitle>Új e-mail</DialogTitle>
                <NewEmailForm onOpenChange={handleCloseDialog} />
            </DialogContent>
        </Dialog>
    )
}

export default NewEmailDialog