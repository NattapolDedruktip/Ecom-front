import BestSeller from "../components/home/BestSeller";
import ContentCarousel from "../components/home/ContentCarousel";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        <ContentCarousel />
      </h1>

      <p className="text-2xl text-center my-4">
        {" "}
        Best Seller
        <BestSeller />
      </p>
      <p className="text-2xl text-center my-4">
        {" "}
        New Product
        <NewProduct />
      </p>
    </div>
  );
};
export default Home;
