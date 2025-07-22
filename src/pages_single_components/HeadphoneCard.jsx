// Import hooks from React
import { NavLink } from "react-router-dom";


export default function HeadphoneCard({
    headphone,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isSelect,
    compare,
    showToast
}) {
    return (
        <div className="headphones-card" key={headphone.id}>

            {/* title */}
            <p><strong>{headphone.title.toUpperCase()}</strong></p>

            {/* category */}
            <p>{headphone.category.toUpperCase()}</p>

            {/* link */}
            <NavLink to={`/headphones/${headphone.id}`}>
                <u>See complete spec sheets</u>
            </NavLink>

            {/* favorite, compare */}
            <div className="fav-comp">

                {/* favorite */}
                <p onClick={() => toggleFavorite(headphone.id)}>
                    {isFavorite(headphone.id) ? (
                        <i className="fa-solid fa-heart-circle-minus" style={{ color: "var(--color-red)" }}></i>
                    ) : (
                        <i className="fa-solid fa-heart-circle-plus" style={{ color: "var(--color-red)" }}></i>
                    )}
                </p>

                {/* compare */}
                {(compare.length < 2 || compare.includes(headphone.id)) ? (
                    <p onClick={() => toggleCompare(headphone.id)}>
                        {isSelect(headphone.id) ? (
                            <i className="fa-solid fa-square-check"></i>
                        ) : (
                            <i className="fa-regular fa-square-check"></i>
                        )}
                    </p>
                ) : (
                    <p onClick={() => showToast()}>
                        <i className="fa-regular fa-square-check"></i>
                    </p>
                )}

            </div>

        </div>
    );
}
