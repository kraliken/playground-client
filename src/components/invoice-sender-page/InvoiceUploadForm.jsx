"use client"

import { useActionState, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { uploadInvoicesAction } from '@/lib/actions/invoice.actions';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const MAX_BATCH_SIZE = 900 * 1024;

function chunkFilesBySize(files, maxBatchSize = MAX_BATCH_SIZE) {
    const chunks = [];
    let currentChunk = [];
    let currentSize = 0;

    for (const file of files) {
        if (file.size > maxBatchSize) {
            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
                currentChunk = [];
                currentSize = 0;
            }
            chunks.push([file]);
            continue;
        }
        if (currentSize + file.size > maxBatchSize) {
            chunks.push(currentChunk);
            currentChunk = [];
            currentSize = 0;
        }
        currentChunk.push(file);
        currentSize += file.size;
    }
    if (currentChunk.length > 0) {
        chunks.push(currentChunk);
    }
    return chunks;
}

const InvoiceUploadForm = () => {

    const router = useRouter();

    const [isPending, setIsPending] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const files = Array.from(fileInputRef.current.files);
        const fileChunks = chunkFilesBySize(files);

        // // LOGOLÁS: chunkolás teszt
        // fileChunks.forEach((chunk, i) => {
        //     const totalSize = chunk.reduce((acc, file) => acc + file.size, 0);
        //     console.log(`Chunk ${i + 1}: ${chunk.length} file, total ${(totalSize / 1024).toFixed(2)} KB`);
        //     // Ha szeretnéd, a fájlok nevét is:
        //     // chunk.forEach(file => console.log(`  - ${file.name}: ${(file.size / 1024).toFixed(2)} KB`));
        // });

        let allSuccess = true;
        let message = '';

        for (let i = 0; i < fileChunks.length; i++) {
            const chunk = fileChunks[i];
            const formData = new FormData();
            chunk.forEach(file => formData.append('invoices', file));

            // Hívhatod továbbra is a server actiont fetch-csel
            // vagy átteheted egy API route-ra is!
            const res = await uploadInvoicesAction({}, formData);

            if (!res.success) {
                allSuccess = false;
                message = res.message || `Hiba a(z) ${i + 1}. batch feltöltésekor.`;
                toast.error(message);
                break;
            }
        }

        setIsPending(false);

        if (allSuccess) {
            toast.success("Minden számla sikeresen feltöltve!");
            router.refresh();
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    // const [data, action, isPending] = useActionState(uploadInvoicesAction, {
    //     success: false,
    //     message: '',
    // });

    // useEffect(() => {
    //     if (data?.success) {
    //         if (data.message) {
    //             toast.success(data.message);
    //             router.refresh();
    //         }
    //     } else if (data?.message) {
    //         toast.error(data.message);
    //     }
    // }, [data]);

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
            <form onSubmit={handleSubmit} className="flex gap-4">
                {/* <form action={action} className="flex gap-4"> */}
                <div className="flex-1">
                    <div>
                        <Input type="file" name="invoices" multiple ref={fileInputRef} accept="application/pdf" />
                        {/* {data && !data.success && data.message && (
                            <span className='text-xs text-destructive text-left pl-3'>{data.message}</span>
                        )} */}
                    </div>
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}

export default InvoiceUploadForm