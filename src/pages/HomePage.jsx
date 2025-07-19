// Import hooks from React
import { useContext, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// categories options for dropdown menù
const categoriesOptions = ["Over-Ear", "On-Ear", "In-Ear"];

// sort options for dropdown menù
const sortOptions = [
    { value: "name-asc", label: "Sort by Name: A-Z" },
    { value: "name-desc", label: "Sort by Name: Z-A" },
    { value: "category-asc", label: "Sort by Category: A-Z" },
    { value: "category-desc", label: "Sort by Category: Z-A" },
];


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
    const [sortOrder, setSortOrder] = useState("");

    // memoized sorted data based on chosen sortOrder
    let orderedHeadphonesData = useMemo(() => {
        const sorted = [...headphonesData];

        if (sortOrder === "name-asc") {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "name-desc") {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOrder === "category-asc") {
            sorted.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortOrder === "category-desc") {
            sorted.sort((a, b) => b.category.localeCompare(a.category));
        }

        return sorted;
    }, [headphonesData, sortOrder]);

    // function to resetFilter locally
    function resetFilters() {
        setSearchTitle("");
        setSearchCategory("");
        setSortOrder("");
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
                    onChange={e => setSearchCategory(e.target.value)}
                >
                    <option value="">Headphone Type</option>
                    {categoriesOptions.map((opt, ind) => (
                        <option key={ind} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>

                {/* sort */}
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                >
                    <option value="">Sort</option>
                    {sortOptions.map((opt, ind) => (
                        <option key={ind} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

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

                {/* compare */}
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

            </section>

            {/* toast */}
            {toast && <div className="toast">{toast}</div>}
        </main>
    );
}