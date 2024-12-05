import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const [text, setText] = useState("");
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [price, setPrice] = useState([1000, 30000]);
  const [ok, setOk] = useState(false);

  //search by text
  //   console.log("text", text);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearInterval(delay);
  }, [text]);

  //search by category
  const hdlCheck = (e) => {
    console.log(e.target.value);
    const inCheck = e.target.value; // what category we check
    const inState = [...categoriesSelected]; //[] at first
    const findCheck = inState.indexOf(inCheck); //  if not find it will return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategoriesSelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  //search by price

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const hdlPrice = (value) => {
    console.log(value);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Product</h1>
      {/* search by text */}
      <input
        className="border rounded-md w-full mb-4 px-2"
        type="text"
        placeholder="Find product..."
        onChange={(e) => setText(e.target.value)}
      />

      <hr />

      {/* search by categories */}
      <div>
        <h1>Products Categories</h1>
        <div>
          {categories.map((item, index) => (
            <div className="flex gap-2" key={index}>
              <input type="checkbox" value={item.id} onChange={hdlCheck} />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      <hr />

      {/* search by price */}
      <div>
        <h1>Find Products By Price</h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {price[0]} </span>
            <span>Max : {price[1]}</span>
          </div>
          <Slider
            onChange={hdlPrice}
            range
            min={0}
            max={100000}
            defaultValue={[1000, 30000]}
          />
        </div>
      </div>
    </div>
  );
};
export default SearchCard;
