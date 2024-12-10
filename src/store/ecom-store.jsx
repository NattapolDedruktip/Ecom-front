import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  actionLogin: async (form) => {
    const res = await axios.post(
      "https://ecom-back-sooty.vercel.app/api/login",
      form
    );
    // console.log(res.data);
    set({
      user: res.data.payload,
      token: res.data.token,
    });
    return res;
  },
  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  getProduct: async (count) => {
    // console.log("count", count);
    try {
      const res = await listProduct(count);
      // console.log(res);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({ products: res.data });
    } catch (err) {
      console.log(err);
    }
  },
  actionAddToCart: (product) => {
    const carts = get().carts;
    const updateCart = [...carts, { ...product, count: 1 }];

    //make  unique product in cart
    const unique = _.unionWith(updateCart, _.isEqual);

    //update cart
    set({ carts: unique });
  },
  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log("update click", productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: (productId) => {
    // console.log("remove product", productId);

    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  actionGetTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
  clearCart: () => {
    set({ carts: [] });
  },
  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
