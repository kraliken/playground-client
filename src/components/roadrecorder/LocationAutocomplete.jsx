// components/LocationAutocomplete.jsx
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

const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
};

export default function LocationAutocomplete({ name, placeholder, defaultValue = "", required, onCommit }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCommitted, setIsCommitted] = useState(false);

    const sessionToken = useMemo(
        () => (typeof crypto !== "undefined" ? crypto.randomUUID() : `${Date.now()}`),
        []
    );

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        let cancelled = false;

        if (isCommitted) {
            setLoading(false);
            return;
        }

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
            } catch {
                if (!cancelled) setResults([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        run();
        return () => {
            cancelled = true;
        };
    }, [debouncedQuery, sessionToken, isCommitted]);

    const commit = (r) => {
        const text =
            r.secondaryText && r.mainText !== r.secondaryText
                ? `${r.mainText}, ${r.secondaryText}`
                : r.mainText;

        setQuery(text);
        setResults([]);
        setIsCommitted(true);
        if (onCommit) onCommit(text);
    };

    return (
        <>
            {/* Ez kerül a FormData-ba */}
            <input type="hidden" name={name} value={isCommitted ? query : ""} required={required} />

            <Command shouldFilter={false}>
                <CommandInput
                    placeholder={placeholder || "Kezdj el címet írni…"}
                    value={query}
                    onValueChange={(val) => {
                        setQuery(val);
                        setIsCommitted(false);
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
                                    onSelect={() => commit(r)}
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
        </>
    );
}
