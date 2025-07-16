// Import hooks from React
import { useEffect, useState } from "react";


export default function HomePage() {

    const [headphoneData, setHeadphoneData] = useState([]);

    async function fetchHeadphones() {
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

    useEffect(() => {
        fetchHeadphones();
    }, []);


    // RENDER
    return (
        <main>
            {headphoneData.map(headphone =>
                <div key={headphone.id}>
                    <h2>{headpgone.title}</h2>
                    <h3>{headphone.category}</h3>
                </div>
            )}
        </main>
    )
}