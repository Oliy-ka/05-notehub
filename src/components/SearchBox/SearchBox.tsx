import css from "./SearchBox.module.css"
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

interface SearchBoxProps{
    onSearch : (query: string) => void,
}

export default function SearchBox( {onSearch}: SearchBoxProps) {

    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500); 

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);


    return (
        <input className={css.input} type="text" placeholder="Search notes" value={query} onChange={(e) => setQuery(e.target.value)} />
    );
}