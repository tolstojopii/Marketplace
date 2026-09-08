import { useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";
import { products } from "../../data/products";


function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const [categorie, setCategorie] = useState('')
  const selectCategorie =(categoryName)=>{
    setCategorie(categoryName)
  }

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main>
        <Hero />
        <Categories select={selectCategorie}/>
        <ProductGrid products={products} onAddToCart={handleAddToCart} categorie={categorie} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
