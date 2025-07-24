"use client"

import { useTransition } from 'react'
import { toast } from "sonner"
import { deletePartnerAction } from '@/lib/actions/partner.actions'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'


const DeletePartnerAlertDialog = ({ partner, isOpen, onOpenChange }) => {

    const { id, name, tax_number } = partner;
    const router = useRouter();

    const [isPending, startTransition] = useTransition()

    const handleDeletePartner = async () => {
        startTransition(async () => {
            try {
                const result = await deletePartnerAction(id)

                if (result.success) {
                    toast?.success?.(result.message || 'Partner sikeresen törölve!')
                    router.refresh();
                    onOpenChange(false)
                } else {
                    toast?.error?.(result.message || 'A partner törlése nem sikerült.')
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
                        <span className="font-semibold"> "{name}"</span>
                        partner véglegesen törlésre kerül..
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Mégsem
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeletePartner}
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

export default DeletePartnerAlertDialog