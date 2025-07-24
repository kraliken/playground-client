"use client"

import { sendCompleteInvoicesAction } from '@/lib/actions/invoice.actions';
import { useActionState, useEffect } from 'react'
import { Button } from '../ui/button';
import { toast } from "sonner";
import { useRouter } from 'next/navigation'


const SendInvoicesButton = ({ disabledButton }) => {

    const router = useRouter();

    const [data, action, isPending] = useActionState(sendCompleteInvoicesAction, {
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
                <Button disabled={isPending || disabledButton} className='flex-1' variant='default' type="submit">
                    {isPending ? 'Küldés...' : 'Küldés'}
                </Button>
            </form>
        </div>
    )
}

export default SendInvoicesButton