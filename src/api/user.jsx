import axios from "axios";

export const createUserCart = async (token, cart) => {
  return await axios.post(
    "https://ecom-back-sooty.vercel.app/api/user/cart",
    cart,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listUserCart = async (token) => {
  return await axios.get("https://ecom-back-sooty.vercel.app/api/user/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveUserAddress = async (token, address) => {
  return await axios.post(
    "https://ecom-back-sooty.vercel.app/api/user/address",
    address,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  return await axios.post(
    "https://ecom-back-sooty.vercel.app/api/user/order",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getOrders = async (token) => {
  return await axios.get("https://ecom-back-sooty.vercel.app/api/user/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
