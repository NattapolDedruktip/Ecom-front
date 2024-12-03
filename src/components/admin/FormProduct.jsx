import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const getProduct = useEcomStore((state) => state.getProduct);
  const [form, setForm] = useState(initialState);
  //   console.log(products);

  useEffect(() => {
    getCategory(token);
    getProduct(token, 20);
  }, []);

  const hdlOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    console.log("form", form);
    try {
      const res = await createProduct(token, form);
      console.log(res);
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
        <button className="bg-blue-300">Add Product</button>
      </form>

      <hr />
      <br />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
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
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.sold}</td>
                <td>{item.updatedAt}</td>
                <td>
                  <p>Edit</p>
                  <p>Delete</p>
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
