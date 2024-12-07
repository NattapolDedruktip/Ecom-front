import axios from "axios";

export const getOrdersAdmin = async (token) => {
  return await axios.get("http://localhost:8000/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrdersStatus = async (token, orderId, orderStatus) => {
  return await axios.put(
    "http://localhost:8000/api/admin/order-status",
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
