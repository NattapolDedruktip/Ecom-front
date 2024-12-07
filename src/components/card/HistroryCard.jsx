import { useEffect, useState } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";

const HistroryCard = () => {
  const [orders, setOrders] = useState([]);

  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("orders", orders);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Order History</h1>

      <div>
        {/* card */}
        {orders?.map((item, index) => {
          return (
            <div className="bg-gray-100 p-4 rounded-md shadow-md" key={index}>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Order Data</p>
                  <p className="font-bold">{item.updatedAt}</p>
                </div>

                <div>{item.orderStatus} </div>
              </div>

              <div>
                <table className="border w-full rounded-md ">
                  <tr className="bg-gray-200">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>total</th>
                  </tr>

                  <tbody>
                    {item.products?.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{product.product.price} </td>
                          <td>{product.count} </td>
                          <td>{product.count * product.product.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="text-right">
                  <p>Total</p>
                  <p>{item.cartTotal}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HistroryCard;
