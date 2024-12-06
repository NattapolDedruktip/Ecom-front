import { Trash2, Minus, Plus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );
  console.log("carts", carts);
  return (
    <div>
      <h1 className="text-2xl font-bold">Product Cart</h1>
      {/* boarder */}
      <div className="border p-2 ">
        {/* card */}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 mb-2">
            {/* row 1 */}
            <div className="flex justify-between mb-2">
              {/* left */}

              <div className="flex gap-2">
                {item.images && item.images.length > 0 ? (
                  <img
                    className="w-16 h-16 bg-gray-200 rounded-sm flex text-center items-center"
                    src={item.images[0].url}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-sm flex text-center items-center">
                    no image
                  </div>
                )}

                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
              {/* right */}
              <div
                onClick={() => actionRemoveProduct(item.id)}
                className="text-red-300 p-2"
              >
                <Trash2 />
              </div>
            </div>

            {/* row2 */}
            <div className="flex justify-between">
              {/* left */}
              <div className="border rounded-sm px-2 py-1">
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4">{item.count}</span>
                <button
                  onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                  className="px-2 py-1 bg-gray-200 rounded  hover:bg-gray-300 "
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* right */}
              <div className="font-bold text-blue-500">
                {" "}
                {item.price * item.count}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* total */}
      <div className="flex justify-between px-2">
        <span>Total</span>
        <span>{actionGetTotalPrice()}</span>
      </div>

      {/* button */}
      <Link to={"/cart"}>
        <button className="mt-4 bg-green-500 w-full text-white py-2 rounded-md shadow-md">
          Check out
        </button>
      </Link>
    </div>
  );
};
export default CartCard;
