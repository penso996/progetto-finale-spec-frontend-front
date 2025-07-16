// Import hooks from React
import { Outlet } from "react-router-dom";

// Import pages_main_components
import Header from "../pages_main_components/Header";


export default function DefaultLayout() {

    // RENDER
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}