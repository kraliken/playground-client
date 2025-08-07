## Stack

- 🐍 **Backend:** [FastAPI (Python)](https://fastapi.tiangolo.com/)  
Python alapú, webes API-fejlesztő keretrendszer

- ⚛️ **Frontend:** [Next.js 15 (React, SSR)](https://nextjs.org/)  
React-alapú frontend keretrendszer modern webes felületek létrehozásához

- 🛢️ **Adatbázis:** [Azure SQL](https://learn.microsoft.com/en-us/azure/azure-sql/?view=azuresql)  
Felhőalapú relációs adatbázis, magas rendelkezésre állással és teljesítménnyel

- 📦 **Fájltárolás:** [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)  
Felhőalapú objektumtároló strukturálatlan adatok számára

- 📧 **E-mail küldés:** [Azure Communication Services](https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email?tabs=windows%2Cconnection-string%2Csend-email-and-get-status-async%2Csync-client&pivots=programming-language-python)  
Nagy mennyiségű tranzakciós, tömeges és marketing e-mailek küldését támogató szolgáltatás

- ☁️ **Hosztolás:** [Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/overview)  
Felhőalapú platform webalkalmazások, API-k és háttérrendszerek hosztolásához
---
## Fő funkciók

- Számlák feltöltése, tárolása és automatikus adatkinyerés
- Feldolgozott adatok exportálása (Excel)
- Tömeges e-mail küldés, csatolmányok kezelése
- Adatvizualizáció és jogosultságkezelés
---
## Folyamatábrák

### 1. Számla feldolgozás és letöltés

```mermaid
flowchart LR
    A[📄 PDF számla feltöltése] --> B[🚀 API hívás]
    B --> C[🔍 Adatok kinyerése]
    C --> D[📈 Excel generálás]
    D --> E[💾 Automatikus letöltés]
    
    style A fill:#e1f5fe
    style B fill:#ffe0b2
    style C fill:#ffe0b2
    style D fill:#ffe0b2
    style E fill:#e8f5e9 
```

### 2. Számla feldolgozás adatbővítéssel

```mermaid
flowchart LR
    A[📄 PDF számla feltöltése] --> B[🚀 API hívás]
    B --> C[🔍 Adatok kinyerése]
    C --> D[🛢️ Adatbázis lekérdezése]
    D --> E[🔧 Adatok kiegészítése]
    E --> F[📈 Excel generálás]
    F --> G[💾 Automatikus letöltés]
    
    style A fill:#e1f5fe
    style B fill:#ffe0b2
    style C fill:#ffe0b2
    style D fill:#ffe0b2
    style E fill:#ffe0b2
    style F fill:#ffe0b2
    style G fill:#e8f5e9 
```

### 3. Számla feldolgozás és e-mail küldés

```mermaid
flowchart LR
    A[✉️ Űrlap kitöltése<br/>címzett, tárgy, üzenet,<br/>számla csatolása] --> B[🚀 API hívás]
    B --> C[🔍 Adatok kinyerése]
    C --> D[🛢️ Dolgozói-adatok<br/>lekérdezése]
    D --> E[🔧 Adatok kiegészítése]
    E --> F[📈 Excel generálás]
    F --> G[📤 E-mail küldése<br/>csatolt PDF + Excel]
    
    style A fill:#e1f5fe
    style B fill:#ffe0b2
    style C fill:#ffe0b2
    style D fill:#ffe0b2
    style E fill:#ffe0b2
    style F fill:#ffe0b2
    style G fill:#e8f5e9 
```

### 4. Tömeges feldolgozás, küldés és törlés

```mermaid
flowchart LR
    A[📚 Tömeges PDF számla<br/>feltöltés] --> B[🔍 Adatok kinyerése]
    B --> C[🛢️ Adatok kiegészítése<br/>adatbázisból]
    C --> D[💾 Fájlok és adatok<br/>tárolása]
    D --> E{Hiányzik adat?}
    E -- Igen --> F[Adatpótlás<br/>DB frissítés]
    F --> G[📤 Tömeges e-mail küldés]
    E -- Nem --> G
    G --> H[🗑️ Fájlok, adatok törlése<br/>sikeres küldés után]

    style A fill:#e1f5fe
    style B fill:#ffe0b2
    style C fill:#ffe0b2
    style D fill:#ffe0b2
    style E fill:#fff9c4
    style F fill:#fce4ec
    style G fill:#e8f5e9
    style H fill:#f5f5f5
```
