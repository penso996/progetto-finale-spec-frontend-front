// Import hooks from React
import { NavLink } from "react-router-dom";


export default function Header() {

    // RENDER
    return (
        <header>
            <NavLink to="/">
                <h1>Headphones Comparator</h1>
            </NavLink>

            <i className="fa-solid fa-heart"></i>
        </header>
    );
}