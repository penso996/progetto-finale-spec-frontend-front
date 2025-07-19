// Import hooks from React
import { useState } from "react";


export function useCompare() {

    const [compare, setCompare] = useState([]);

    // add or remove an item by ID
    const toggleCompare = (id) => {
        if (compare.length < 2 || compare.includes(id)) {
            setCompare(prev =>
                prev.includes(id)
                    ? prev.filter(i => i !== id)
                    : [...prev, id]
            );
        }
    };

    // check if ID is in compare
    const isSelect = (id) => compare.includes(id);

    // reset compare
    const resetCompare = () => setCompare([]);

    return { compare, toggleCompare, isSelect, resetCompare };
}