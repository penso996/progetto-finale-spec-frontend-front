// Import hooks from React
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// Import pages_single_components
import HeadphoneCard from "../pages_single_components/HeadphoneCard";


export default function Favorites() {

    // useContext
    const {
        showToast,
        favorites, toggleFavorite, isFavorite,
        compare, toggleCompare, isSelect, resetCompare,
        headphonesData
    } = useContext(GlobalContext);

    // favoritesHeadphonesData
    const favoritesHeadphonesData = headphonesData.filter(h => favorites.includes(h.id));

    // useEffect to resetCompare
    useEffect(() => {
        resetCompare();
    }, []);

    // RENDER
    return (
        <main>

            {/* headphones cards */}
            <section className="headphones-section">
                {favoritesHeadphonesData.length === 0 ? (
                    <p className="not-found"><strong>No favorites headphones...</strong></p>
                ) : (
                    favoritesHeadphonesData.map(headphone => (
                        <HeadphoneCard
                            key={headphone.id}
                            headphone={headphone}
                            toggleFavorite={toggleFavorite}
                            isFavorite={isFavorite}
                            toggleCompare={toggleCompare}
                            isSelect={isSelect}
                            compare={compare}
                            showToast={showToast}
                        />
                    ))
                )}
            </section>

            {/* comparison arrow */}
            {favoritesHeadphonesData.length >= 2 && (
                compare.length < 2 ? (
                    <div
                        onClick={() => showToast("You must select two headphones to compare")}
                        className="comparison-arrow"
                    >
                        {compare.length}/2
                    </div>
                ) : (
                    <NavLink to={"/compare"}>
                        <div className="comparison-arrow">
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </NavLink>
                )
            )}

        </main>
    );
}