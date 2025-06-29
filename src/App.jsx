import { Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import FormProduct from "./pages/FormProduct"
import ProductDetail from "./pages/ProductDetail"
import About from "./pages/About"
import Favorites from "./pages/Favorites"
import Navbar from "./components/NavBar"
import ProductsLoader from "./components/ProductsLoader"
import Register from "./pages/Register"

function App() {

  return (
    <>
      <ProductsLoader />
      <div>
        <Navbar/>
        <h1>React Router</h1>
      </div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/products/add" element={<FormProduct />} />
        <Route path="/products/:id/edit" element={<FormProduct />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
