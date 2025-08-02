"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { sendEmailAction } from "@/lib/actions/vodafone.actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const SendEmailForm = () => {

    const router = useRouter()

    const [data, action, isPending] = useActionState(sendEmailAction, {
        success: false,
        message: '',
        errors: {},
        data: {}
    });

    useEffect(() => {
        if (data.success) {
            toast.success(data.message || 'A számlák sikeresen kiküldve!');

            // router.refresh()
        }
    }, [data.success]);

    const SubmitButton = () => {
        return (
            <div className='mt-8 flex justify-end gap-4'>
                <Button disabled={isPending} className='' variant='default' type="submit">
                    {isPending ? 'Küldés...' : 'Küldés'}
                </Button>
            </div>
        );
    };

    return (
        <>
            <form action={action} className="flex flex-col h-full gap-4">
                <div className="flex h-full gap-4">
                    <div className="flex-1 flex flex-col h-full gap-3">
                        <div className='space-y-4'>
                            <Label htmlFor="recipient">Címzett</Label>
                            <Input
                                id="recipient"
                                name="recipient"
                                type="text"
                                defaultValue={data?.data?.recipient || ''}
                            />
                        </div>
                        {data && !data.success && data.errors?.recipient && (
                            <div className='text-sm text-destructive'>{data.errors.recipient}</div>
                        )}
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
                            <Label htmlFor="attachment">Számla csatolás</Label>
                            <Input
                                type="file"
                                name="attachment"
                                accept="application/pdf"
                            />
                        </div>
                        {data && !data.success && data.errors?.attachment && (
                            <div className='text-sm text-destructive'>{data.errors.attachment}</div>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col h-full gap-4 p">
                        <div className='space-y-4'>
                            <Label htmlFor="message">Üzenet</Label>
                            <Textarea
                                id="message"
                                name="message"
                                type="text"
                                rows={40}
                                className="min-h-[200px]"
                                defaultValue={data?.data?.message || ''}
                            />
                        </div>
                        {data && !data.success && data.errors?.message && (
                            <div className='text-sm text-destructive'>{data.errors.message}</div>
                        )}
                    </div>
                </div>
                <SubmitButton />
            </form>

        </>


    )
}

export default SendEmailForm