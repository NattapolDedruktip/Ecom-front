import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { listUserCart } from "../../api/user";
import { saveUserAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        console.log(res);
        setProducts(res.data.product);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    console.log("address", address);
    if (!address) {
      return toast.error("Please fill the address");
    }
    saveUserAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success("Save address success!");
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("Please save address first");
    }
    navigate("/user/payment");
  };

  //   console.log("products", products);

  return (
    <div className="mx-auto">
      <div className="flex  gap-4">
        {/* left */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-2">
            <h1 className="font-bold text-2xl">Delivery Address</h1>
            <textarea
              required
              className="w-full px-2"
              placeholder="fill your address here ..."
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button
              onClick={hdlSaveAddress}
              className="bg-blue-300 text-white rounded-md shadow-md px-4 py-2 hover:bg-blue-500 hover:scale-105 hover:translate-y-1 hover:duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Summary</h1>

            {/* item list */}

            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="tet-sm">
                      Quantity : {item.count} x{" "}
                      {numberFormat(item.product.price)}{" "}
                    </p>
                  </div>

                  <div>
                    <p className="text-red-500 font-bold">
                      {numberFormat(item.product.price * item.count)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <hr />

              <div className="flex justify-between">
                <p>Delivery fee :</p>
                <p>0.00</p>
              </div>

              <hr />

              <div className="flex justify-between">
                <p>Discount :</p>
                <p>0.00</p>
              </div>

              <hr />

              <div className="flex justify-between">
                <p className="font-bold">Total :</p>
                <p className="text-red-500 font-bold text-lg">
                  {numberFormat(cartTotal)}
                </p>
              </div>
            </div>

            <hr />

            <div>
              <button
                onClick={hdlGoToPayment}
                className="bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600"
              >
                Proceed checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;
