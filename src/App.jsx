import { Routes, Route } from "react-router";
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import Layout from './components/Layout.jsx'
import PlantDetail from "./pages/PlantDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categorias" element={<Category />} />
        <Route path="/planta/:categoria/:planta" element={<PlantDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
