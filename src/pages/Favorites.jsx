// Import hooks from React
import { useContext } from "react";
import { NavLink } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";


export default function Favorites() {

    // useContext
    const {
        toast, showToast,
        favorites, toggleFavorite, isFavorite,
        compare, toggleCompare, isSelect,
        headphonesData
    } = useContext(GlobalContext);

    // filter headphonesData with favorites
    const favoritesHeadphones = headphonesData.filter(h => favorites.includes(h.id));

    // RENDER
    return (
        <main>
            {/* headphones cards */}
            <section className="headphones-section">
                {favoritesHeadphones.length === 0 ? (
                    <p className="not-found"><strong>No matching headphones...</strong></p>
                ) : (
                    favoritesHeadphones.map(headphone => (
                        <div className="headphones-card" key={headphone.id}>
                            <p><strong>{headphone.title.toUpperCase()}</strong></p>
                            <p>{headphone.category.toUpperCase()}</p>
                            <NavLink to={`/headphones/${headphone.id}`}>
                                <u>See complete spec sheets</u>
                            </NavLink>
                            <div className="fav-comp">
                                <p onClick={() => toggleFavorite(headphone.id)}>
                                    {isFavorite(headphone.id) ?
                                        <i className="fa-solid fa-heart-circle-minus" style={{ color: "var(--color-red)" }}></i> :
                                        <i className="fa-solid fa-heart-circle-plus" style={{ color: "var(--color-red)" }}></i>}
                                </p>
                                {(compare.length < 2 || compare.includes(headphone.id)) ? (
                                    <p onClick={() => toggleCompare(headphone.id)}>
                                        {isSelect(headphone.id) ?
                                            <i className="fa-solid fa-square-check"></i> :
                                            <i className="fa-regular fa-square-check"></i>}
                                    </p>) : (
                                    <p onClick={() => showToast()}>
                                        <i className="fa-regular fa-square-check"></i>
                                    </p>
                                )}

                            </div>
                        </div>
                    ))
                )}

                {/* toast */}
                {toast && <div className="toast">{toast}</div>}
            </section>
        </main>
    );
}