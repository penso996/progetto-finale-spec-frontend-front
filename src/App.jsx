// Import hooks from React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import GlobalContextProvider from context
import GlobalContextProvider from "./context/GlobalContextProvider";

// Import pages
import HomePage from "./pages/HomePage";
import HeadphoneDetail from "./pages/HeadphoneDetail";
import Favorites from "./pages/Favorites";

// Import pages_layouts
import DefaultLayout from "./pages_layout/DefaultLayout";


export default function App() {

  // RENDER
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/headphones/:id" element={<HeadphoneDetail />} />
            <Route path="/favorites-headphones" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}