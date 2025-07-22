// Import assets
import { graph } from "../assets/graph";

// Import CSS
import style from "./HeadphoneGraph.module.css";

export default function HeadphoneGraph({
    line1,
    alt1,
    line2,
    alt2
}) {
    return (
        <div className={style.graphWrapper}>
            <img className={style.frequencyGraph} src={graph.referenceGraph} alt="headphone-graph" />
            {line1 && <img className={style.frequencyLine} src={line1} alt={alt1} />}
            {line2 && <img className={style.frequencyLine} src={line2} alt={alt2} />}
        </div>
    );
}