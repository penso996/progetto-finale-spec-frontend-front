// Import hooks from React
import { useEffect, useState } from "react";

// Import GlobalContext from context
import GlobalContext from "./GlobalContext.jsx";

// Import hooks from custom_hooks
import { useFavorites } from "../custom_hooks/useFavorites";


export default function GlobalContextProvider({ children }) {

    // custom hook to manage favorites
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // useState to manage headphonesData
    const [headphonesData, setHeadphonesData] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");
    const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");

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
        const handler = setTimeout(() => {
            setDebouncedSearchTitle(searchTitle);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTitle]);

    useEffect(() => {
        fetchHeadphonesData();
    }, [debouncedSearchTitle, searchCategory]);

    // PROVIDER
    return (
        <GlobalContext.Provider value={{
            favorites, toggleFavorite, isFavorite,
            headphonesData,
            searchTitle, setSearchTitle,
            searchCategory, setSearchCategory
        }}>
            {children}
        </GlobalContext.Provider>
    );
}