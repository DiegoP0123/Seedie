import { Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import Layout from './components/Layout.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="categorias" element={<Category />} />
      </Route>
    </Routes>
  );
}

export default App;
