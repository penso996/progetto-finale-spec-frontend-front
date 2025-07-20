// Import hooks from React
import { useContext, useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// categoriesOptions for dropdown menù
const categoriesOptions = ["Over-Ear", "On-Ear", "In-Ear"];

// sortOptions for dropdown menù
const sortOptions = [
    { value: "name-asc", label: "Sort by Name: A-Z" },
    { value: "name-desc", label: "Sort by Name: Z-A" },
    { value: "category-asc", label: "Sort by Category: A-Z" },
    { value: "category-desc", label: "Sort by Category: Z-A" },
];


export default function HomePage() {

    // useContext
    const {
        showToast,
        toggleFavorite, isFavorite,
        compare, toggleCompare, isSelect, resetCompare,
        headphonesData,
        searchTitle, setSearchTitle,
        searchCategory, setSearchCategory
    } = useContext(GlobalContext);

    // useState to manage sortOrder locally
    const [sortOrder, setSortOrder] = useState("");

    // memoized and sorted headphonesData based on sortOrder
    const sortedHeadphonesData = useMemo(() => {
        const sortedData = [...headphonesData];

        if (sortOrder === "name-asc") {
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "name-desc") {
            sortedData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOrder === "category-asc") {
            sortedData.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortOrder === "category-desc") {
            sortedData.sort((a, b) => b.category.localeCompare(a.category));
        }

        return sortedData;
    }, [headphonesData, sortOrder]);

    // function to resetFilter locally
    function resetFilters() {
        setSearchTitle("");
        setSearchCategory("");
        setSortOrder("");
    };

    // comparableHeadphonesData
    const comparableHeadphonesData = headphonesData.filter(h => compare.includes(h.id));

    // useEffect to resetCompare
    useEffect(() => {
        resetCompare();
    }, []);

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

                {/* reset button */}
                <button onClick={resetFilters}
                >Reset Filters
                </button>

                <hr />

                {/* compare */}
                <p className="search-title">Select two headpone to compare:</p>
                <p>
                    {comparableHeadphonesData[0] ? (
                        <strong>{comparableHeadphonesData[0].title}</strong>
                    ) : (
                        <i><small>Add first headphone</small></i>
                    )}
                </p>
                <p>
                    {comparableHeadphonesData[1] ? (
                        <strong>{comparableHeadphonesData[1].title}</strong>
                    ) : (
                        <i><small>Add second headphone</small></i>
                    )}
                </p>

                {/* compare button */}
                <button
                    onClick={resetFilters}
                    disabled={compare.length !== 2}
                >Compare Now
                </button>

            </section>

            {/* headphones cards */}
            <section className="headphones-section">

                {sortedHeadphonesData.length === 0 ? (
                    <p className="not-found"><strong>No matching headphones...</strong></p>
                ) : (
                    sortedHeadphonesData.map(headphone => (
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

        </main>
    );
}