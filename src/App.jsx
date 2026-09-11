import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import useAuthStore from "./store/authStore";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartProducts/CartPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const loading = useAuthStore(state => state.loading)


  useEffect(()=>{
    checkAuth();
  }, []);

  if(loading){
    return <div>загрузка...</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="*" element={<div>Страница не найдена</div>} />
        <Route path="/cart" element={<CartPage/> } />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
