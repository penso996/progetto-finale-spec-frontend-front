// Import hooks from React
import { useEffect, useState } from "react";

// Import GlobalContext from context
import GlobalContext from "./GlobalContext.jsx";

// Import hooks from custom_hooks
import { useToast } from "../custom_hooks/useToast.jsx";
import { useFavorites } from "../custom_hooks/useFavorites";
import { useCompare } from "../custom_hooks/useCompare.jsx";

export default function GlobalContextProvider({ children }) {

    // custom hook to show toast message
    const { toast, showToast } = useToast();

    // custom hook to manage favorites
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // custom hook to manage compare
    const { compare, toggleCompare, isSelect, resetCompare } = useCompare();

    // useState to manage headphonesData
    // data
    const [headphonesData, setHeadphonesData] = useState([]);
    // search
    const [searchTitle, setSearchTitle] = useState("");
    // debouncedSearchTitle via manual debounce
    const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");
    // debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTitle(searchTitle);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTitle]);
    // category
    const [searchCategory, setSearchCategory] = useState("");

    // function to fetch headphonesData
    async function fetchHeadphonesData() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}?search=${debouncedSearchTitle}&category=${searchCategory}`);
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
            favorites, toggleFavorite, isFavorite,
            compare, toggleCompare, isSelect, resetCompare,
            headphonesData,
            searchTitle, setSearchTitle,
            searchCategory, setSearchCategory
        }}>
            {children}
        </GlobalContext.Provider>
    );
}