// Import hooks from React
import { useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// Import pages_single_components
import HeadphoneCard from "../pages_single_components/HeadphoneCard";

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

    // useNavigate to handleRedirect
    const navigate = useNavigate();

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

    // comparableHeadphonesData
    const comparableHeadphonesData = headphonesData.filter(h => compare.includes(h.id));

    // function to resetFilter
    function resetFilters() {
        setSearchTitle("");
        setSearchCategory("");
        setSortOrder("");
    };

    // function to handleRedirect
    const handleRedirect = () => {
        if (compare.length === 2) {
            navigate("/compare");
        } else {
            showToast("You must select two headphones to compare");
        }
    };

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
                <button onClick={() => {
                    resetFilters();
                    showToast("Filters have been reset")
                }}
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
                <button onClick={handleRedirect}
                >Compare Now
                </button>

            </section>

            {/* headphones cards */}
            <section className="headphones-section">
                {sortedHeadphonesData.length === 0 ? (
                    <p className="not-found"><strong>No matching headphones...</strong></p>
                ) : (
                    sortedHeadphonesData.map(headphone => (
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

        </main>
    );
}