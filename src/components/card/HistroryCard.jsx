import { useEffect, useState } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/date";
import { numberFormat } from "../../utils/number";

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200";
      case "Processing":
        return "bg-blue-300";
      case "Completed":
        return "bg-green-300";
      case "Cancelled":
        return "bg-red-300";
    }
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
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>

                <div>
                  {
                    <span
                      className={`${getStatusColor(
                        item.orderStatus
                      )} p-2 rounded-md shadow-md`}
                    >
                      {item.orderStatus}
                    </span>
                  }{" "}
                </div>
              </div>

              <div>
                <table className="border w-full rounded-md ">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {item.products?.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{numberFormat(product.product.price)} </td>
                          <td>{product.count} </td>
                          <td>
                            {numberFormat(
                              product.count * product.product.price
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="text-right">
                  <p>Total</p>
                  <p>{numberFormat(item.cartTotal)}</p>
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
