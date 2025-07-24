import React, { useActionState, useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createEmailAction } from '@/lib/actions/email.actions';

const NewEmailForm = ({ onOpenChange }) => {

    const router = useRouter();

    const [data, action, isPending] = useActionState(createEmailAction, {
        success: false,
        message: '',
        errors: {},
        data: {}
    });

    useEffect(() => {
        if (data?.success) {
            if (data.message) {
                toast.success(data.message);
                // router.refresh();
                onOpenChange();

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
                <Label htmlFor="email">E-mail</Label>
                <Input
                    id="email"
                    name="email"
                    type="text"
                    required
                    defaultValue={data?.data?.email || ''}
                    className={data?.errors?.email ? 'border-red-400' : ''}
                />
            </div>
            {data && !data.success && data.errors?.email && (
                <div className='text-sm text-destructive mb-3 pl-3'>{data.errors.email}</div>
            )}
            <div className="space-y-4">
                <Label htmlFor="type">Típus</Label>
                <Select
                    name="type"
                    defaultValue={data?.data?.type || 'to'}
                >
                    <SelectTrigger className={data?.errors?.type ? 'border-red-400' : ''}>
                        <SelectValue placeholder="Select a list" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="to">Címzett</SelectItem>
                        <SelectItem value="cc">Másolat</SelectItem>
                    </SelectContent>
                </Select>
                {data?.errors?.type && (
                    <p className="text-sm text-destructive">{data.errors.type}</p>
                )}
            </div>
            <SubmitButton />
        </form>
    )
}

export default NewEmailForm