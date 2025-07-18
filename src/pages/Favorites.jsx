// Import hooks from React
import { useContext } from "react";
import { NavLink } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";


export default function Favorites() {

    // useContext
    const {
        favorites, toggleFavorite, isFavorite,
        headphonesData
    } = useContext(GlobalContext);


    // RENDER
    return (
        <main>
            <h1>ciao</h1>
        </main>
    );
}