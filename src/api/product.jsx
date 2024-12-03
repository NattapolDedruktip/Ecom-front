import axios from "axios";

export const createProduct = async (token, form) => {
  return await axios.post("http://localhost:8000/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (token, count = 20) => {
  return await axios.get("http://localhost:8000/api/products/" + count, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const listProduct = async (token, count = 20) => {
//   return await axios.post("http://localhost:8000/api/product/" + count, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };