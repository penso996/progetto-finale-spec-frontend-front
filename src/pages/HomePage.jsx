// Import hooks from React
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

// Import hooks from custom_hooks
import { useFavorites } from "../custom_hooks/useFavorites";


export default function HomePage() {

    // custom hook to manage favorites
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    // useState to manage headphonesData
    const [headphonesData, setHeadphonesData] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");
    const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");

    const categories = ["Over-Ear", "On-Ear", "In-Ear"];
    const [searchCategory, setSearchCategory] = useState("");

    const [sortOrder, setSortOrder] = useState("no");

    // function to fetch headphonesData
    async function fetchHeadphonesData() {
        try {
            const response = await fetch(`http://localhost:3001/headphones/?search=${debouncedSearchTitle}&category=${searchCategory}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setHeadphonesData(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // function to toggleSortOrder
    function toggleSortOrder() {
        setSortOrder(prev =>
            prev === "no" ? "asc" :
                prev === "asc" ? "desc" :
                    "no"
        );
    };

    // function to resetFilter
    function resetFilters() {
        setSearchTitle("");
        setSearchCategory("");
        setSortOrder("no");
    };

    // order headphonesData
    let orderedHeadphonesData = useMemo(() => {
        let sorted = [...headphonesData];
        if (sortOrder === "asc") {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "desc") {
            sorted.sort((a, b) => b.title.localeCompare(a.title));
        }
        return sorted;
    }, [headphonesData, sortOrder]);

    // useEffect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTitle(searchTitle);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTitle]);

    useEffect(() => {
        fetchHeadphonesData();
    }, [debouncedSearchTitle, searchCategory]);

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