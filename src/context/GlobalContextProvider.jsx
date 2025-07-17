// Import GlobalContext from context
import GlobalContext from "./GlobalContext.jsx";

// Import hooks from custom_hooks
import { useFavorites } from "../custom_hooks/useFavorites";

export default function GlobalContextProvider({ children }) {

    // custom hook to manage favorites
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    return (
        <GlobalContext.Provider value={{
            favorites, toggleFavorite, isFavorite
        }}>
            {children}
        </GlobalContext.Provider>
    );
}