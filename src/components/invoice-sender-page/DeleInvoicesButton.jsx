"use client"

import { Button } from '../ui/button';
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { deleteInvoicesAction } from '@/lib/actions/invoice.actions';

const DeleInvoicesButton = ({ disabledButton }) => {

    const router = useRouter();

    const [data, action, isPending] = useActionState(deleteInvoicesAction, {
        success: false,
        message: '',
    });

    useEffect(() => {
        if (data?.success) {
            if (data.message) {
                toast.success(data.message);
                router.refresh();
            }
        } else if (data?.message) {
            toast.error(data.message);
        }
    }, [data]);

    return (
        <div className="w-full flex justify-end">
            <form action={action} className="">
                <Button disabled={isPending || disabledButton} className='flex-1' variant='destructive' type="submit">
                    {isPending ? 'Törlés...' : 'Törlés'}
                </Button>
            </form>
        </div>
    )
}

export default DeleInvoicesButton