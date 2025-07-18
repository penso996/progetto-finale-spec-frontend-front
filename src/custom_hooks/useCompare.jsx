// Import hooks from React
import { useState, useEffect } from "react";


export function useCompare() {

    const [compare, setCompare] = useState([]);

    useEffect(() => {
        console.log(compare)
    }, [compare]);

    // add or remove an item by ID
    const toggleCompare = (id) => {
        if (compare.length < 2 || compare.includes(id)) {
            setCompare(prev =>
                prev.includes(id)
                    ? prev.filter(i => i !== id)
                    : [...prev, id]
            )
        }
    };

    // check if ID is in favorites
    const isSelect = (id) => compare.includes(id);

    return { compare, toggleCompare, isSelect };
}