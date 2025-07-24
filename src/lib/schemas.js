import { z } from "zod/v4";

const taxNumberRegex = /^\d{8}-\d-\d{2}$/;

export const invoiceSchema = z.object({
    invoices: z.array(z.file()
        .refine((file) => file.size > 0, "A fájl nem lehet üres")
        .refine((file) => file.name !== 'undefined', "Érvényes fájlnevet kell megadni")
        .refine((file) => file.type === 'application/pdf' || file.name.endsWith('.pdf'), "Csak PDF fájl tölthető fel!")
    )
        .nonempty("Legalább egy PDF-et válassz ki!")
        .refine((files) => files.every(file => file.size > 0), "Nem lehet üres fájlokat feltölteni")
})

export const newPartnerSchema = z.object({
    name: z
        .string()
        .min(3, "A név legalább 3 karakter legyen!")
        .max(100, "A név legfeljebb 100 karakter lehet!"),
    tax_number: z
        .string()
        .regex(taxNumberRegex, "Érvényes adószámot adj meg (pl. 12345678-1-23)!"),
});

export const newEmailSchema = z.object({
    email: z.email("Kérlek, adj meg egy érvényes e-mail címet!"),
    type: z.enum(["to", "cc"], {
        errorMap: () => ({ message: "Csak 'Címzett' vagy 'Másolat' lehet!" })
    })
});