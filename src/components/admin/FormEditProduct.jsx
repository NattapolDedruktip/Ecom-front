import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);
  const [form, setForm] = useState(initialState);
  //   console.log(products);

  useEffect(() => {
    getCategory(token);
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("res from backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };
  //   console.log("form from FromEdit", form);

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
      const res = await updateProduct(token, id, form);
      console.log(res);
      navigate("/admin/product");
      //   getProduct(token, 20);
      toast.success(`Edit product ${res?.data?.title} success`);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(form);
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form className="flex flex-col" onSubmit={hdlSubmit}>
        <h1>Edit product data</h1>
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
        <button className="bg-blue-300">Update Product</button>
      </form>

      <hr />
      <br />
    </div>
  );
};
export default FormEditProduct;
