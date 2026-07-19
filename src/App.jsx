import { Routes, Route } from "react-router";
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import Layout from './components/Layout.jsx'
import PlantDetail from "./pages/PlantDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Community from "./pages/Community.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categorias" element={<Category />} />
          <Route path="/planta/:categoria/:planta" element={<PlantDetail />} />
          <Route path="sobrenosotros" element={<AboutUs />} />
          <Route path="comunidad" element={<Community />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;