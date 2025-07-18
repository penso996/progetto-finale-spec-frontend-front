// Import hooks from React
import { useEffect, useState } from "react";

// Import GlobalContext from context
import GlobalContext from "./GlobalContext.jsx";

// Import hooks from custom_hooks
import { useFavorites } from "../custom_hooks/useFavorites";
import { useDebounce } from "../custom_hooks/useDebounce.jsx";
import { useCompare } from "../custom_hooks/useCompare.jsx";
import { useToast } from "../custom_hooks/useToast.jsx";


export default function GlobalContextProvider({ children }) {

    // custom hook to show toast message
    const { toast, showToast } = useToast();

    // custom hook to manage favorites
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // custom hook to manage compare
    const { compare, toggleCompare, isSelect, resetCompare } = useCompare();

    // useState to manage headphonesData
    const [headphonesData, setHeadphonesData] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");
    // custom hook to debounce searchTitle
    const debouncedSearchTitle = useDebounce(searchTitle, 500);

    const [searchCategory, setSearchCategory] = useState("");

    // function to fetch headphonesData
    async function fetchHeadphonesData() {
        try {
            const response = await fetch(`http://localhost:3001/headphones/?search=${debouncedSearchTitle}&category=${searchCategory}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setHeadphonesData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // useEffect
    useEffect(() => {
        fetchHeadphonesData();
    }, [debouncedSearchTitle, searchCategory]);

    // PROVIDER
    return (
        <GlobalContext.Provider value={{
            toast, showToast,
            favorites, toggleFavorite, isFavorite, resetCompare,
            compare, toggleCompare, isSelect,
            headphonesData,
            searchTitle, setSearchTitle,
            searchCategory, setSearchCategory
        }}>
            {children}
        </GlobalContext.Provider>
    );
}