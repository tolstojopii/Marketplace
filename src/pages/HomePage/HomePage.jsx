import { useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Features from "../../components/Features/Features";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const [categorie, setCategorie] = useState("");
  const productsRef = useRef(null);

  const selectCategorie = (categoryName) => {

    const next = categorie === categoryName ? "" : categoryName;
    setCategorie(next);


    requestAnimationFrame(() => {
      productsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Categories select={selectCategorie} active={categorie} />
        <div ref={productsRef} style={{ scrollMarginTop: 80 }}>
          <ProductGrid categorie={categorie} />
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;