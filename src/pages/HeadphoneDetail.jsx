// Import hooks from React
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

// Import assets
import { graph } from "../assets/graph";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// Import pages_single_components
import HeadphoneGraph from "../pages_single_components/HeadphoneGraph";


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
                const response = await fetch(`${import.meta.env.VITE_API_URL}${id}`); // fetch by ID
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

    // get headphoneFreqImg from graph
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
                            <p>Category:<br /><strong>{headphoneData.category.toUpperCase()}</strong></p>
                            <p>Type:<br /><strong>{headphoneData.type.toUpperCase()}</strong></p>
                            <p>Wireless:<br /><strong>{headphoneData.isWireless ? "YES" : "NO"}</strong></p>
                            <p>Weight:<br /><strong>{headphoneData.weight}</strong></p>
                            <p>Price:<br /><strong>${headphoneData.retailPrice}</strong></p>
                        </div>
                        <div>
                            <p><strong>Frequency Profile:</strong></p>
                            <div className="graph-container">
                                <HeadphoneGraph
                                    line1={headphoneFreqImg}
                                    alt1={headphoneData.frequencyProfile}
                                />
                            </div>
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