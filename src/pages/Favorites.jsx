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

    const favoritesHeadphones = headphonesData.filter(h => favorites.includes(h.id));

    // RENDER
    return (
        <main>
            {/* headphones cards */}
            <section className="headphones-section">
                {favoritesHeadphones.length === 0 ? (
                    <p className="not-found"><strong>No favorites headphones...</strong></p>
                ) : (
                    favoritesHeadphones.map(headphone => (
                        <div className="headphones-card" key={headphone.id}>
                            <p><strong>{headphone.title.toUpperCase()}</strong></p>
                            <p>{headphone.category.toUpperCase()}</p>
                            <NavLink to={`/headphones/${headphone.id}`}>
                                <u>See complete spec sheets</u>
                            </NavLink>
                            <p onClick={() => toggleFavorite(headphone.id)}>
                                {isFavorite(headphone.id) ?
                                    <i className="fa-solid fa-heart-circle-minus" style={{ color: "var(--color-red)" }}></i> :
                                    <i className="fa-solid fa-heart-circle-plus" style={{ color: "var(--color-red)" }}></i>}
                            </p>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}