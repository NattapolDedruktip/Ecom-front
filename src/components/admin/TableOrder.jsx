import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { changeOrdersStatus, getOrdersAdmin } from "../../api/admin";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/date";

const TableOrder = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders();
  }, []);

  const hdlGetOrders = () => {
    getOrdersAdmin(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
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

  const hdlChangeOrderStatus = (token, orderId, orderStatus) => {
    console.log(orderId, orderStatus);
    changeOrdersStatus(token, orderId, orderStatus)
      .then((res) => {
        // console.log(res);
        console.log(res);
        toast.success("Update status success!");
        hdlGetOrders(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   console.log(orders);
  return (
    <div className="container mx-auto p-4 bg-white shadow-md ">
      <div>
        <table className="w-full ">
          <thead>
            <tr className="bg-gray-100 border">
              <th>No.</th>
              <th>User</th>
              <th>Date</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => {
              return (
                <tr key={index} className="border">
                  <td className="text-center"> {index + 1} </td>
                  <td>
                    <p> {item.orderedBy.email}</p>
                  </td>
                  <td>{dateFormat(item.createdAt)}</td>
                  <td className="px-2 py-4">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title}
                        <span className="text-sm">
                          {" "}
                          {product.count} x {numberFormat(product.price)}
                        </span>
                      </li>
                    ))}
                  </td>
                  <td>{numberFormat(item.cartTotal)}</td>
                  <td>
                    <span
                      className={`${getStatusColor(
                        item.orderStatus
                      )} px-2 py-1 rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        hdlChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TableOrder;
