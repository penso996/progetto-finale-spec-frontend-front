// Import hooks from React
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// Import assets
import { graph } from "../assets/graph";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";


export default function HeadphoneDetail() {

    // useContext
    const {
        toggleFavorite, isFavorite
    } = useContext(GlobalContext);

    // read ID from URL
    const { id } = useParams();

    // useState to manage headphoneData
    const [headphoneData, setHeadphoneData] = useState("");

    // useEffect and function to fetchHeadphoneData
    useEffect(() => {
        async function fetchHeadphoneData() {
            try {
                const response = await fetch(`http://localhost:3001/headphones/${id}`); // fetch by ID
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
                            <h2 className="title">
                                {headphoneData.title.toUpperCase()}
                                <p onClick={() => toggleFavorite(headphoneData.id)}>
                                    {isFavorite(headphoneData.id) ?
                                        <i className="fa-solid fa-heart-circle-minus" style={{ color: "var(--color-red)" }}></i> :
                                        <i className="fa-solid fa-heart-circle-plus" style={{ color: "var(--color-red)" }}></i>}
                                </p>
                            </h2>
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