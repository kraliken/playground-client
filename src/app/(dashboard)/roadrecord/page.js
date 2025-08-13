"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { MapPin } from "lucide-react";
import { searchPlaces } from "@/lib/actions/google.actions";

// Debounce hook
const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
};

export default function RoadRecordPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCommitted, setIsCommitted] = useState(false);

    // Stabil token a teljes gépelési folyamatra
    const sessionToken = useMemo(
        () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}`),
        []
    );

    // DEBOUNCE: pl. 350–500 ms
    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        let cancelled = false;

        if (isCommitted) {
            setLoading(false);
            return;
        }

        // Minimális hossz – spórol a hívásokkal/költségen
        if (!debouncedQuery.trim() || debouncedQuery.trim().length < 3) {
            setResults([]);
            setLoading(false);
            return;
        }

        const run = async () => {
            try {
                setLoading(true);
                const data = await searchPlaces(debouncedQuery, sessionToken);
                if (!cancelled) setResults(data || []);
            } catch (err) {
                console.error("Search error:", err);
                if (!cancelled) setResults([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        run();
        return () => {
            cancelled = true; // stale guard
        };
    }, [debouncedQuery, sessionToken, isCommitted]);

    const handleSelect = (r) => {
        const text =
            r.secondaryText && r.mainText !== r.secondaryText
                ? `${r.mainText}, ${r.secondaryText}`
                : r.mainText;

        setQuery(text);        // írd be az inputba
        setResults([]);        // tüntesd el a listát
        setIsCommitted(true);  // zárolás: ne hívjunk újra
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Command shouldFilter={false}>
                <CommandInput
                    placeholder="Kezdj el címet írni…"
                    value={query}
                    onValueChange={(val) => {
                        setQuery(val);
                        setIsCommitted(false); // szerkesztésre feloldjuk a zárolást
                    }}
                />
                <CommandList>
                    {loading && <CommandEmpty>Keresés…</CommandEmpty>}

                    {!loading && !debouncedQuery && !isCommitted && (
                        <CommandEmpty>Írj be egy címet a kereséshez.</CommandEmpty>
                    )}

                    {!loading && debouncedQuery && results.length === 0 && !isCommitted && (
                        <CommandEmpty>Nincs találat.</CommandEmpty>
                    )}

                    {results.length > 0 && !isCommitted && (
                        <CommandGroup heading="Javaslatok">
                            {results.map((r) => (
                                <CommandItem
                                    key={r.id}
                                    value={r.id}
                                    onSelect={() => handleSelect(r)}
                                    className="flex items-start gap-2"
                                >
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">{r.mainText}</span>
                                        {r.secondaryText && (
                                            <span className="text-sm text-muted-foreground">
                                                {r.secondaryText}
                                            </span>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    <CommandSeparator />
                </CommandList>
            </Command>
        </div>
    );
}
