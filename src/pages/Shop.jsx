import { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex">
      {/* Search bar */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">search bar</div>
      {/* Product */}
      <div className="w-1/2 p-2">
        <p className="text-2xl font-bold mb-4">Total Product</p>

        <div className="flex flex-wrap gap-2">
          {products.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      </div>
      {/* Cart */}
      <div className="w-1/4  p-4 bg-gray-100  h-screen overflow-y-auto">
        cart
      </div>
    </div>
  );
};
export default Shop;
