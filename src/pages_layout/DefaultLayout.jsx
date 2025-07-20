// Import hooks from React
import { useContext } from "react";
import { Outlet } from "react-router-dom";

// Import GlobalContext from context
import GlobalContext from "../context/GlobalContext";

// Import pages_main_components
import Header from "../pages_main_components/Header";


export default function DefaultLayout() {

    // useContext
    const { toast } = useContext(GlobalContext);

    // RENDER
    return (
        <>
            <Header />
            <Outlet />

            {/* toast */}
            {toast && <div className="toast">{toast}</div>}
        </>
    );
}