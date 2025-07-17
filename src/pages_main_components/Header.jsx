// Import hooks from React
import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";


export default function Header() {

    // useContext
    const { favorites } = useContext(GlobalContext);

    // useLocation
    const location = useLocation();

    // function to handleRefresh
    function handleRefresh() {
        if (location.pathname === "/") {
            window.location.reload();
        }
    };

    // RENDER
    return (
        <header>
            <NavLink to="/" onClick={handleRefresh}>
                <h1>Headphones Comparator</h1>
            </NavLink>

            <p>{favorites.length}</p>
            <i className="fa-solid fa-heart fa-2x"></i>
        </header>
    );
}