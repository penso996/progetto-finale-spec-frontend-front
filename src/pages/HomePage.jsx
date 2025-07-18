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
        toggleFavorite, isFavorite,
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

    // RENDER
    return (
        <main className="homepage">

            {/* input, category and sort */}
            <section className="search">
                <p className="search-title">Filters</p>
                {/* input */}
                <input type="text"
                    placeholder="Search by name"
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                />

                {/* category */}
                <select
                    value={searchCategory}
                    onChange={e => setSearchCategory(e.target.value)}>

                    <option value="">--</option>
                    {categories.map((cat, ind) => (
                        <option key={ind} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* sort */}
                <div className="sort" onClick={toggleSortOrder}>
                    <p>Sort Asc/Desc</p>
                    {sortOrder === "no" ? (
                        <i className="fa-solid fa-sort"></i>
                    ) : sortOrder === "asc" ? (
                        <i className="fa-solid fa-sort-down"></i>
                    ) : sortOrder === "desc" ? (
                        <i className="fa-solid fa-sort-up"></i>
                    ) : null}
                </div>

                {/* reset */}
                <button onClick={resetFilters}>Reset</button>
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