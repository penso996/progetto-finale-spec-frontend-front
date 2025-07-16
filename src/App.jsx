// Import hooks from React
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import HomePage from "./pages/HomePage";
import HeadphoneDetail from "./pages/HeadphoneDetail";

// Import pages_layouts
import DefaultLayout from "./pages_layout/DefaultLayout";


export default function App() {

  // RENDER
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/headphones/:id" element={<HeadphoneDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}