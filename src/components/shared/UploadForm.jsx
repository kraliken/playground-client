"use client"

import axios from "axios";
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { toast } from "sonner"
import { useRef, useState } from "react";

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

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload/invoice/${endpointSuffix}`,
                formData,
                { responseType: "blob" }
            );

            if (response.status === 200) {
                let fileName = `${endpointSuffix}_invoice.xlsx`;
                const contentDisposition = response.headers["content-disposition"];
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="(.+)"/);
                    if (match && match[1]) {
                        fileName = match[1];
                    }
                }

                const url = window.URL.createObjectURL(response.data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                setTimeout(() => window.URL.revokeObjectURL(url), 100);

                toast.success("A fájl sikeresen elkészült és letöltve.");

                fileInputRef.current.value = "";
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const json = JSON.parse(reader.result);
                        toast.error(json.detail || "Ismeretlen hiba történt");
                    } catch {
                        toast.error("Ismeretlen hiba történt (nem JSON válasz)");
                    }
                };
                reader.readAsText(response.data);
            }

        } catch (error) {
            let message = "Hiba történt a feltöltés során";
            if (error.response && error.response.data) {
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const json = JSON.parse(reader.result);
                        if (json.detail) {
                            message = json.detail;
                        }
                        toast.error(message);
                    } catch {
                        toast.error(message);
                    }
                };
                reader.readAsText(error.response.data);
            } else {
                toast.error(message);
            }
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