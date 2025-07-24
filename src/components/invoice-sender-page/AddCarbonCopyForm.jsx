"use client"

import { useActionState, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { createLinkEmailToPartnerAction } from '@/lib/actions/connection.actions';
import { getAvailabRecipients } from '@/lib/actions/email.actions';

const AddCarbonCopyForm = ({ partner, onOpenChange }) => {

    const router = useRouter();

    const [availableEmails, setAvailableEmails] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState("");

    const [data, action, isPending] = useActionState(createLinkEmailToPartnerAction, {
        success: false,
        message: '',
        errors: {},
        data: partner || {}
    });

    async function fetchEmails() {
        if (!partner?.id) return;
        const emails = await getAvailabRecipients(partner.id, "cc");
        setAvailableEmails(emails);
    }
    useEffect(() => {
        fetchEmails();
    }, [partner?.id]);

    useEffect(() => {
        if (data?.success) {
            if (data.message) {
                fetchEmails(); // <-- Frissítjük a választható emaileket
                setSelectedEmailId(""); // Reset, hogy ne maradjon benne a régi érték
                toast.success(data.message);
                router.refresh();
                // onOpenChange()
            }
        } else if (data?.message) {
            toast.error(data.message);
        }
    }, [data]);

    const SubmitButton = () => {
        return (
            <div className='w-full flex gap-4 mt-6'>
                <Button disabled={isPending || availableEmails.length === 0 || selectedEmailId === ""} className='flex-1' variant='default' type="submit">
                    {isPending ? 'Hozzáadás...' : 'Hozzáadás'}
                </Button>
                <Button className='flex-1' variant='secondary' onClick={onOpenChange}>
                    Mégsem
                </Button>
            </div>
        );
    };

    return (
        <form action={action} className="flex flex-col h-full gap-2 py-4">
            <div className='space-y-4'>
                <Select
                    value={selectedEmailId}
                    onValueChange={setSelectedEmailId}
                    disabled={availableEmails.length === 0}
                >
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Válassz másolathoz..." />
                    </SelectTrigger>
                    <SelectContent>
                        {availableEmails.map(email => (
                            <SelectItem key={email.id} value={String(email.id)}>{email.email}</SelectItem>
                        ))}
                    </SelectContent>

                </Select>
                <input type="hidden" name="email_id" value={selectedEmailId} />
                <input type="hidden" name="partner_id" value={partner.id} />
            </div>
            <SubmitButton />
        </form>
    )
}

export default AddCarbonCopyForm