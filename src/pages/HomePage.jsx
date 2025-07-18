// Import hooks from React
import { useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// categories for dropdown menù
const categories = ["Over-Ear", "On-Ear", "In-Ear"];


export default function HomePage() {

    // useContext
    const {
        toast, showToast,
        toggleFavorite, isFavorite,
        compare, toggleCompare, isSelect,
        headphonesData,
        searchTitle, setSearchTitle,
        searchCategory, setSearchCategory
    } = useContext(GlobalContext);

    // useState to manage headphonesData locally
    const [sortOrder, setSortOrder] = useState("no");

    // function to toggleSortOrder
    function toggleSortOrder() {
        setSortOrder(prev =>
            prev === "no" ? "asc" :
                prev === "asc" ? "desc" :
                    "no"
        );
    };

    // apply optimized sorting
    let orderedHeadphonesData = useMemo(() => {
        let sorted = [...headphonesData];
        if (sortOrder === "asc") {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "desc") {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        }
        return sorted;
    }, [headphonesData, sortOrder]);

    // function to resetFilter
    function resetFilters() {
        setSearchTitle("");
        setSearchCategory("");
        setSortOrder("no");
    };

    // comparable headphonesData
    const selectedHeadphones = headphonesData.filter(h => compare.includes(h.id));

    // RENDER
    return (
        <main className="homepage">

            {/* input, category and sort */}
            <section className="search">
                <p className="search-title">Filters</p>
                {/* input */}
                <input type="text"
                    placeholder="Search by Model Name"
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                />

                {/* category */}
                <select
                    value={searchCategory}
                    onChange={e => setSearchCategory(e.target.value)}>

                    <option value="">Headphone Type</option>
                    {categories.map((cat, ind) => (
                        <option key={ind} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* sort */}
                <div className="sort" onClick={toggleSortOrder}>
                    <p>
                        {sortOrder === "no"
                            ? "Sort by Model Name"
                            : sortOrder === "asc"
                                ? "Sort by Model Name: A-Z"
                                : "Sort by Model Name: Z-A"}
                    </p>
                    {sortOrder === "no" ? (
                        <i className="fa-solid fa-sort"></i>
                    ) : sortOrder === "asc" ? (
                        <i className="fa-solid fa-sort-down"></i>
                    ) : (
                        <i className="fa-solid fa-sort-up"></i>
                    )}
                </div>

                {/* reset */}
                <button onClick={resetFilters}>Reset Filters</button>

                <hr />
                <p className="search-title">Select two headpone to compare:</p>
                <p>
                    {selectedHeadphones[0] ? (
                        <strong>{selectedHeadphones[0].title}</strong>
                    ) : (
                        <i><small>Add first headphone</small></i>
                    )}
                </p>
                <p>
                    {selectedHeadphones[1] ? (
                        <strong>{selectedHeadphones[1].title}</strong>
                    ) : (
                        <i><small>Add second headphone</small></i>
                    )}
                </p>
                <button
                    onClick={resetFilters}
                    disabled={compare.length !== 2}
                >
                    Compare Now
                </button>
            </section>

            {/* headphones cards */}
            <section className="headphones-section">
                {orderedHeadphonesData.length === 0 ? (
                    <p className="not-found"><strong>No matching headphones...</strong></p>
                ) : (
                    orderedHeadphonesData.map(headphone => (
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