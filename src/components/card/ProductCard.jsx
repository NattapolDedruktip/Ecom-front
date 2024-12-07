import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";

const ProductCard = ({ item }) => {
  const actionAddToCart = useEcomStore((state) => state.actionAddToCart);
  return (
    <div className="border rounded-md shadow-md p-2 w-48">
      <div>
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            className="w-full rounded-md object-cover hover:scale-105 hover:duration-200"
          />
        ) : (
          <div className="w-full h-24 w-24 bg-gray-200 rounded-md flex justify-center items-center shadow ">
            no images
          </div>
        )}
      </div>

      <div className="py-2">
        <p className="text-xl">{item.title}</p>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex justify-between items-center ">
        <span className="text-xl font-bold">{numberFormat(item.price)} ฿</span>
        <button
          onClick={() => actionAddToCart(item)}
          className="bg-blue-200 rounded-md hover:bg-blue-400 shadow px-1"
        >
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
