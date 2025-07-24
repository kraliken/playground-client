"use client"

import { useActionState, useEffect } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { uploadInvoicesAction } from '@/lib/actions/invoice.actions';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const InvoiceUploadForm = () => {

    const router = useRouter();

    const [data, action, isPending] = useActionState(uploadInvoicesAction, {
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

    const SubmitButton = () => {
        return (
            <div className=''>
                <Button disabled={isPending} className='flex-1' variant='default' type="submit">
                    {isPending ? 'Feltöltés...' : 'Feltöltés'}
                </Button>
            </div>
        );
    };

    return (
        <div className="w-full">
            <form action={action} className="flex gap-4">
                <div className="flex-1">
                    <div>
                        <Input type="file" name="invoices" multiple accept="application/pdf" />
                        {data && !data.success && data.message && (
                            <span className='text-xs text-destructive text-left pl-3'>{data.message}</span>
                        )}
                    </div>
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}

export default InvoiceUploadForm