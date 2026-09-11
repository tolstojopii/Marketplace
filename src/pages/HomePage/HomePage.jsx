import { useState } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const [categorie, setCategorie] = useState('');

  const selectCategorie = (categoryName) => {
    setCategorie(categoryName);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Categories select={selectCategorie} />
        <ProductGrid categorie={categorie} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;