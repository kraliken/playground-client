"use client"

import axios from "axios";
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from "sonner"
import { useRef, useState } from "react";
import { uploadInvoiceAndExtractData } from "@/lib/actions/invoice.actions";

const UploadForm = ({ endpointSuffix }) => {

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef();

    const handleUpload = async (e) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            toast.error("Kérlek válassz ki egy PDF fájlt!");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {

            const result = await uploadInvoiceAndExtractData(endpointSuffix, formData);
            if (result.success) {

                const { fileName, fileData, contentType } = result.data;
                const byteCharacters = atob(fileData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: contentType });

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(() => window.URL.revokeObjectURL(url), 100);

                toast.success(result.message || "A fájl sikeresen elkészült!");
                fileInputRef.current.value = "";

            } else {
                if (result.errors?.invoice) {
                    toast.error(result.errors.invoice[0] || "Fájlfeltöltési hiba.");
                } else {
                    toast.error("Ismeretlen hiba történt");
                }
            }
        } catch (error) {
            toast.error("Váratlan hiba történt. Próbáld újra.");
        } finally {
            setIsUploading(false);
        }

    }

    const SubmitButton = () => {
        return (
            <div className=''>
                <Button disabled={isUploading} className='flex-1' variant='default' type="submit">
                    {isUploading ? 'Feltöltés...' : 'Feltöltés'}
                </Button>
            </div>
        );
    };

    return (
        <div className="w-full">
            <form onSubmit={handleUpload} className="flex gap-4">
                <div className="flex-1">
                    <div>
                        <Input
                            type="file"
                            name="invoice"
                            accept="application/pdf"
                            ref={fileInputRef}
                            disabled={isUploading}
                        />
                    </div>
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}

export default UploadForm