// Import hooks from React
import { useContext, useEffect, useState } from "react";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// Import assets
import { graph } from "../assets/graph";

// Import pages_single_components
import HeadphoneGraph from "../pages_single_components/HeadphoneGraph";


export default function Compare() {

    // useContext
    const {
        toggleFavorite, isFavorite,
        compare
    } = useContext(GlobalContext);

    // useState to set compareById
    const [compareById, setCompareById] = useState([]);

    // retrieving headphone1Id and headphone2Id data from compare
    const headphone1Id = compare[0];
    const headphone2Id = compare[1];

    // function to fetch headphones by two IDs then setCompareById
    async function fetchHeadphonesByIds(id1, id2) {
        try {
            const [res1, res2] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}${id1}`), // fetch by first ID
                fetch(`${import.meta.env.VITE_API_URL}${id2}`) // fetch by second ID
            ]);

            if (!res1.ok || !res2.ok) {
                throw new Error(`HTTP error! Status: ${res1.status} / ${res2.status}`);
            }

            const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
            setCompareById([data1.headphone, data2.headphone]);
        } catch (error) {
            console.error('Error fetching headphones by IDs', error);
        }
    }

    // get headphoneFreqImg1 from graph
    const headphoneFreqImg1 = graph[compareById[0]?.frequencyProfile];
    // get headphoneFreqImg2 from graph
    const headphoneFreqImg2 = graph[compareById[1]?.frequencyProfile];

    // useEffect
    useEffect(() => {
        fetchHeadphonesByIds(headphone1Id, headphone2Id);
    }, []);

    // RENDER
    return (
        <main>

            {!headphone1Id || !headphone2Id ? (
                <p className="not-found"><strong>Select two headphones to compare...</strong></p>
            ) : (
                <>
                    {/* headphones-compare */}
                    <section className="headphones-compare">

                        {/* compare-table */}
                        <table className="compare-table">

                            <thead>
                                <tr>
                                    <th></th>
                                    <th>{compareById[0]?.brand}</th>
                                    <th>{compareById[1]?.brand}</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><strong>{compareById[0]?.title}</strong></td>
                                    <td><strong>{compareById[1]?.title}</strong></td>
                                </tr>

                                <tr>
                                    <td>CATEGORY</td>
                                    <td><strong>{compareById[0]?.category.toUpperCase()}</strong></td>
                                    <td><strong>{compareById[1]?.category.toUpperCase()}</strong></td>
                                </tr>
                                <tr>
                                    <td>TYPE</td>
                                    <td><strong>{compareById[0]?.type.toUpperCase()}</strong></td>
                                    <td><strong>{compareById[1]?.type.toUpperCase()}</strong></td>
                                </tr>
                                <tr>
                                    <td>WIRELESS</td>
                                    <td><strong>{compareById[0]?.isWireless ? "YES" : "NO"}</strong></td>
                                    <td><strong>{compareById[1]?.isWireless ? "YES" : "NO"}</strong></td>
                                </tr>
                                <tr>
                                    <td>WEIGHT</td>
                                    <td><strong>{compareById[0]?.weight}</strong></td>
                                    <td><strong>{compareById[1]?.weight}</strong></td>
                                </tr>
                                <tr>
                                    <td>PRICE</td>
                                    <td><strong>${compareById[0]?.retailPrice}</strong></td>
                                    <td><strong>${compareById[1]?.retailPrice}</strong></td>
                                </tr>
                                <tr>
                                    <td>FAVORITE</td>
                                    <td><p onClick={() => toggleFavorite(compareById[0]?.id)}>
                                        {isFavorite(compareById[0]?.id) ?
                                            <i className="fa-solid fa-heart-circle-minus" style={{ color: "var(--color-red)" }}></i> :
                                            <i className="fa-solid fa-heart-circle-plus" style={{ color: "var(--color-red)" }}></i>}
                                    </p></td>
                                    <td><p onClick={() => toggleFavorite(compareById[1]?.id)}>
                                        {isFavorite(compareById[1]?.id) ?
                                            <i className="fa-solid fa-heart-circle-minus" style={{ color: "var(--color-red)" }}></i> :
                                            <i className="fa-solid fa-heart-circle-plus" style={{ color: "var(--color-red)" }}></i>}
                                    </p></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td colspan="2">
                                        <div className="compare-graph-size">
                                            <HeadphoneGraph
                                                line1={headphoneFreqImg1}
                                                alt1={compareById[0]?.frequencyProfile}
                                                line2={headphoneFreqImg2}
                                                alt2={compareById[0]?.frequencyProfile}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>image</td>
                                    <td>image</td>
                                </tr>
                            </tbody>

                        </table>

                    </section>
                </>
            )
            }

        </main >
    )
}