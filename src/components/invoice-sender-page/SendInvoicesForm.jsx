"use client"

import { sendCompleteInvoicesAction } from '@/lib/actions/invoice.actions';
import { useActionState, useEffect } from 'react'
import { Button } from '../ui/button';
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';


const SendInvoicesForm = ({ disabledButton }) => {

    const router = useRouter();

    const [data, action, isPending] = useActionState(sendCompleteInvoicesAction, {
        success: false,
        message: '',
        errors: {},
        data: {}
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
            <div className='mt-8 flex justify-end gap-4'>
                <Button disabled={isPending || disabledButton} className='flex-1' variant='default' type="submit">
                    {isPending ? 'Küldés...' : 'Küldés'}
                </Button>
            </div>
        );
    };

    return (
        <div className="w-full flex-1 flex">
            <form action={action} className="flex-1 flex flex-col gap-4">
                <div className='space-y-4'>
                    <Label htmlFor="subject">Tárgy</Label>
                    <Input
                        id="subject"
                        name="subject"
                        type="text"
                        defaultValue={data?.data?.subject || ''}
                    />
                </div>
                {data && !data.success && data.errors?.subject && (
                    <div className='text-sm text-destructive'>{data.errors.subject}</div>
                )}
                <div className='space-y-4'>
                    <Label htmlFor="message">Üzenet</Label>
                    <Textarea
                        id="message"
                        name="message"
                        type="text"
                        // rows={40}
                        className="min-h-[100px]"
                        defaultValue={data?.data?.message || ''}
                    />
                </div>
                {data && !data.success && data.errors?.message && (
                    <div className='text-sm text-destructive'>{data.errors.message}</div>
                )}
                <SubmitButton />
            </form>
        </div>
    )
}

export default SendInvoicesForm