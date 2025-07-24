import React, { useActionState, useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { createPartnerAction } from '@/lib/actions/partner.actions';

const NewPartnerForm = ({ onOpenChange }) => {

    const router = useRouter();

    const [data, action, isPending] = useActionState(createPartnerAction, {
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
                onOpenChange()
            }
        } else if (data?.message) {
            toast.error(data.message);
        }
    }, [data]);

    const SubmitButton = () => {
        return (
            <div className='w-full flex gap-4 mt-6'>
                <Button disabled={isPending} className='flex-1' variant='default' type="submit">
                    {isPending ? 'Létrehozás...' : 'Létrehozás'}
                </Button>
                <Button className='flex-1' variant='secondary' onClick={onOpenChange}>
                    Mégsem
                </Button>
            </div>
        );
    };

    return (
        <form action={action} className="flex flex-col h-full gap-2 p-4">
            <div className='space-y-4'>
                <Label htmlFor="name">Neve</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={data?.data?.name || ''}
                    className={data?.errors?.name ? 'border-red-400' : ''}
                />
            </div>
            {data && !data.success && data.errors?.name && (
                <div className='text-sm text-destructive mb-3 pl-3'>{data.errors.name}</div>
            )}
            <div className='space-y-4'>
                <Label htmlFor="tax_number">Adószáma</Label>
                <Input
                    id="tax_number"
                    name="tax_number"
                    type="text"
                    required
                    defaultValue={data?.data?.tax_number || ''}
                    className={data?.errors?.tax_number ? 'border-red-400' : ''}
                />
            </div>
            {data && !data.success && data.errors?.tax_number && (
                <div className='text-sm text-destructive pl-3'>{data.errors.tax_number}</div>
            )}
            <SubmitButton />
        </form>
    )
}

export default NewPartnerForm