"use client"

import { useTransition } from 'react'
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { deleteEmailAction } from '@/lib/actions/email.actions'


const DeleteEmailAlertDialog = ({ data, isOpen, onOpenChange }) => {

    const { id, email } = data;
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleDeleteEmail = async () => {
        startTransition(async () => {
            try {
                const result = await deleteEmailAction(id)
                if (result.success) {
                    toast?.success?.(result.message || 'Email sikeresen törölve!')
                    router.refresh();
                    onOpenChange(false)
                } else {
                    toast?.error?.(result.message || 'Az email törlése nem sikerült.')
                }
            } catch (error) {
                console.error('Delete error:', error)
                toast?.error?.('Váratlan hiba történt.')
            }
        })
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Biztosan folytatod?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Ez a művelet nem vonható vissza. A(z)
                        <span className="font-semibold"> "{email}" </span>
                        email véglegesen törlésre kerül..
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Mégsem
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteEmail}
                        disabled={isPending}
                        className="bg-red-400 text-white hover:bg-red-500"
                    >
                        {isPending ? 'Törlés...' : 'Törlés'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteEmailAlertDialog