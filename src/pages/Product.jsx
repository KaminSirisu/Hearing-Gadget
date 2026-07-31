import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect } from 'react';
import { supabase } from "../libs/supabase.js";

const Product = () => {
  useEffect(() => {
    fetchProducts();
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");
    
    console.log(data);
    console.log(error);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div>
        Product
      </div>
      
    </div>
  )
}

export default Product
