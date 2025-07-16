// Import hooks from React
import { useEffect, useState } from "react";


export default function HomePage() {

    // useState to manage headphonesData
    const [headphoneData, setHeadphoneData] = useState([]);

    const [searchTitle, setSearchTitle] = useState("");

    const categories = ["Over-Ear", "On-Ear", "In-Ear"];
    const [searchCategory, setSearchCategory] = useState("");


    const filteredHeadphoneData = headphoneData.filter(headphone =>
        headphone.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        (!searchCategory || headphone.category.toLowerCase() === searchCategory.toLowerCase())
    );

    // function to fetch headphonesData
    async function fetchHeadphonesData() {
        try {
            const response = await fetch('http://localhost:3001/headphones');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setHeadphoneData(data);
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

            <input type="text"
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
            />

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

            {filteredHeadphoneData.map(headphone =>
                <div key={headphone.id}>
                    <h2>{headphone.title}</h2>
                    <h3>{headphone.category}</h3>
                </div>
            )}

        </main>
    )
}