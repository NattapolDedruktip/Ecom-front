import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { CirclePlus } from "lucide-react";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const getProduct = useEcomStore((state) => state.getProduct);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });
  //   console.log(products);

  useEffect(() => {
    getCategory();
    getProduct(20);
  }, []);

  const hdlOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlDelete = async (id) => {
    console.log("id", id);
    if (window.confirm("Do you really need to delete it ?")) {
      try {
        const res = await deleteProduct(token, id);
        console.log("res", res);
        getProduct(20);
        toast.success(`Delete product id : ${id} success!`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    console.log("form", form);
    try {
      const res = await createProduct(token, form);
      console.log(res);
      setForm(initialState);
      getProduct(20);
      toast.success(`Add product ${res?.data?.title} success`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form className="flex flex-col" onSubmit={hdlSubmit}>
        <h1>Add product data</h1>
        <input
          type="text"
          className="border"
          value={form.title}
          onChange={hdlOnChange}
          placeholder="Title"
          name="title"
        />

        <input
          type="text"
          className="border"
          value={form.description}
          onChange={hdlOnChange}
          placeholder="Description"
          name="description"
        />

        <input
          type="number"
          className="border"
          value={form.price}
          onChange={hdlOnChange}
          placeholder="Price"
          name="price"
        />

        <input
          type="number"
          className="border"
          value={form.quantity}
          onChange={hdlOnChange}
          placeholder="Quantity"
          name="quantity"
        />

        <select
          name="categoryId"
          className="border"
          value={form.categoryId}
          required
          onChange={hdlOnChange}
        >
          <option value="" disabled>
            Please Select Category
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <hr />
        <UploadFile form={form} setForm={setForm} />
        <button className=" flex justify-center bg-blue-300 hover:scale-105 hover:duration-200">
          <CirclePlus /> Add Product
        </button>
      </form>

      <hr />
      <br />

      <table class="table w-full border">
        <thead>
          <tr className="bg-gray-200 border">
            <th scope="col">No.</th>
            <th scope="col">Pic</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sold</th>
            <th scope="col">Updated At</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {item.images.length > 0 ? (
                    <img
                      className="w-24 h-24 rounded-lg shadow-md"
                      src={item.images[0].url}
                    />
                  ) : (
                    <div className="flex w-24 h-24 rounded-lg shadow-md items-center justify-center">
                      No image
                    </div>
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.sold}</td>
                <td>{item.updatedAt}</td>
                <td className="flex gap-2 ">
                  <p className="bg-yellow-500 rounded-md p-1 shadow-md text-center hover:-translate-y-1 hover:duration-200">
                    <Link to={"/admin/product/" + item.id}>
                      <Pencil />
                    </Link>
                  </p>
                  <p
                    className="bg-red-500 rounded-md p-1 shadow-md text-center cursor-pointer hover:-translate-y-1 hover:duration-200"
                    onClick={() => hdlDelete(item.id)}
                  >
                    <Trash2 />
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default FormProduct;
