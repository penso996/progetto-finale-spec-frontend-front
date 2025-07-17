// Import hooks from React
import { NavLink, useLocation } from "react-router-dom";


export default function Header() {

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

            <i className="fa-solid fa-heart fa-2x"></i>
        </header>
    );
}