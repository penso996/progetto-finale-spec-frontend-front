// Import hooks from React
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Import assets
import { graph } from "../assets/graph";

export default function HeadphoneDetail() {

    // useState to manage headphoneData
    const { id } = useParams();
    const [headphoneData, setHeadphoneData] = useState(null);

    // useEffect and function to fetchHeadphoneData
    useEffect(() => {
        async function fetchHeadphoneData() {
            try {
                const response = await fetch(`http://localhost:3001/headphones/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setHeadphoneData(data.headphone);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchHeadphoneData();
    }, [id]);

    // get frequency profile image from graph
    const headphoneFreqImg = graph[headphoneData?.frequencyProfile];

    // RENDER
    return (
        <main>
            {!headphoneData ? (
                <p><strong>Loading data...</strong></p>
            ) : (
                <div className="headphone-card">
                    <div className="headphone-card-data">
                        <div>
                            <h3>{headphoneData.brand.toUpperCase()}</h3>
                            <h2>{headphoneData.title.toUpperCase()}</h2>
                            <hr />
                            <p><strong>Category:</strong><br />{headphoneData.category.toUpperCase()}</p>
                            <p><strong>Type:</strong><br />{headphoneData.type.toUpperCase()}</p>
                            <p><strong>Wireless:</strong><br />{headphoneData.isWireless ? "YES" : "NO"}</p>
                            <p><strong>Weight:</strong><br />{headphoneData.weight}</p>
                            <p><strong>Price:</strong><br />${headphoneData.retailPrice}</p>
                        </div>
                        <div>
                            <p><strong>Frequency Profile:</strong></p>
                            <img
                                className="frequency-profile"
                                src={headphoneFreqImg}
                                alt={headphoneData.frequencyProfile}
                            />
                        </div>
                    </div>
                    <div className="headphone-card-image">
                        <img src={headphoneData.imageUrl} alt={headphoneData.title} />
                    </div>
                </div>
            )}
        </main>
    );
}