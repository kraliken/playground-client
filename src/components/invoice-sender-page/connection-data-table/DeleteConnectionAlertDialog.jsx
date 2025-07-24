"use client"

import { useTransition } from 'react'
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { deleteConnectionAction } from '@/lib/actions/connection.actions'


const DeleteConnectionAlertDialog = ({ connection, isOpen, onOpenChange }) => {

    const { partner_id, partner_name, email_id, email } = connection;
    const router = useRouter();

    console.log(connection);

    const [isPending, startTransition] = useTransition()

    const handleDeleteConnection = async () => {
        startTransition(async () => {
            try {
                const result = await deleteConnectionAction(email_id, partner_id)

                if (result.success) {
                    toast?.success?.(result.message || 'Kapcsolat sikeresen törölve!')
                    router.refresh();
                    onOpenChange(false)
                } else {
                    toast?.error?.(result.message || 'A kapcsolat törlése nem sikerült.')
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
                        Ez a művelet nem vonható vissza. A(z) <br />
                        <span className="font-semibold"> "{partner_name}" - "{email}"</span><br />
                        kapcsolat véglegesen törlésre kerül..
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Mégsem
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteConnection}
                        disabled={isPending}
                        className="bg-red-400 text-white hover:bg-red-500"
                    >
                        {isPending ? 'Törlés...' : 'Törlés'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent >
        </AlertDialog >
    )
}

export default DeleteConnectionAlertDialog