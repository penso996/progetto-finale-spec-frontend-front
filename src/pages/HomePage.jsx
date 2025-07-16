// Import hooks from React
import { useEffect, useState } from "react";


export default function HomePage() {

    // useState to manage headphonesData
    const [headphonesData, setHeadphonesData] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");

    const categories = ["Over-Ear", "On-Ear", "In-Ear"];
    const [searchCategory, setSearchCategory] = useState("");

    const [sortOrder, setSortOrder] = useState("no");

    // filtered headphonesData
    const filteredHeadphoneData = headphonesData.filter(headphone =>
        headphone.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        (!searchCategory || headphone.category.toLowerCase() === searchCategory.toLowerCase())
    );

    // function to order headphonesData
    function toggleSortOrder() {
        setSortOrder(prev =>
            prev === "no" ? "asc" :
                prev === "asc" ? "desc" :
                    "no"
        );
    };

    // orderEd headphonesData
    let orderedHeadphoneData = [...filteredHeadphoneData];
    if (sortOrder === "asc") {
        orderedHeadphoneData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
        orderedHeadphoneData.sort((a, b) => b.title.localeCompare(a.title));
    };

    // function to fetch headphonesData
    async function fetchHeadphonesData() {
        try {
            const response = await fetch('http://localhost:3001/headphones');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setHeadphonesData(data);
        } catch (error) {
            console.error('Error fetching dats', error);
        }
    }

    // useEffect
    useEffect(() => {
        fetchHeadphonesData();
    }, []);


    // RENDER
    return (
        <main>

            {/* input, category and sort */}
            <section className="search">

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
                <div onClick={toggleSortOrder}>
                    {sortOrder === "no" ? (
                        <i className="fa-solid fa-sort"></i>
                    ) : sortOrder === "asc" ? (
                        <i className="fa-solid fa-sort-down"></i>
                    ) : sortOrder === "desc" ? (
                        <i className="fa-solid fa-sort-up"></i>
                    ) : null}
                </div>

            </section>




            {/* headphones cards */}
            {orderedHeadphoneData.map(headphone =>
                <div key={headphone.id}>
                    <h2>{headphone.title}</h2>
                    <h3>{headphone.category}</h3>
                </div>
            )}

        </main>
    )
}