import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import { toast } from "react-toastify";

const FormCategory = () => {
  const [name, setName] = useState("");
  const token = useEcomStore((state) => state.token);
  //   const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const hdlRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      console.log(res);
      toast.success(`Delete ${res.data.name} success`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please fill data");
    }
    // console.log("name", name, token);
    try {
      const res = await createCategory(token, { name });
      //   console.log("res", res.data.name);
      toast.success(`Add Category ${res?.data?.name} success!!`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form onSubmit={hdlSubmit} className="my-4">
        <input
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-500">Add Category</button>
      </form>

      <hr />

      <ul className="list-none">
        {categories.map((item, index) => (
          <li key={index} className="flex justify-between my-2">
            {" "}
            <span>{item.name}</span>
            <button className="bg-red-300" onClick={() => hdlRemove(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FormCategory;
