import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";

const ListCart = () => {
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const cart = useEcomStore((state) => state.carts);
  const getTotalPrice = useEcomStore((state) => state.actionGetTotalPrice);

  return (
    <div className="bg-gray-100 rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <ListCheck size={36} />
        <p className="text-2xl font-bold">
          Product Lists : {cart.length} lists
        </p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left */}
        <div className="col-span-2">
          {/* Card */}
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
              {/* Row 1 */}
              <div className="flex justify-between mb-2">
                {/* Left */}
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-16 h-16 rounded-md"
                      src={item.images[0].url}
                    />
                  ) : (
                    <div
                      className="w-16 h-16 bg-gray-200 
                            rounded-md flex text-center items-center"
                    >
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">
                      {item.price} x {item.count}
                    </p>
                  </div>
                </div>
                {/* Right */}
                <div>
                  <div className="font-bold text-blue-500">
                    {item.price * item.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="text-2xl font-bold">Summary</p>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="text-2xl font-bold">{getTotalPrice()}</span>
          </div>

          <div className="flex flex-col gap-2">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  //   onClick={handleSaveCart}
                  className="bg-red-500 w-full
                    rounded-md text-white py-2 shadow-md hover:bg-red-700
                    "
                >
                  Pay now
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button
                  className="bg-blue-500 w-full
                    rounded-md text-white py-2 shadow-md hover:bg-blue-700
                    "
                >
                  Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button
                className="bg-gray-500 w-full 
                    rounded-md text-white py-2 shadow-md hover:bg-gray-700
                    "
              >
                Edit List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListCart;
