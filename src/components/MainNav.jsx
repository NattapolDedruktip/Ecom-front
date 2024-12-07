import { Link } from "react-router-dom";
import useEcomStore from "../store/ecom-store";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);

  return (
    <nav className="bg-green-300">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16 ">
          <div className="flex items-center  gap-4">
            <Link to={"/"} className="text-2xl font-bold">
              Logo
            </Link>
            <Link to={"/"}>Home</Link>
            <Link to={"/shop"}>Shop</Link>
            {/* badge */}
            <Link to={"/cart"} className="relative p-4">
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-200 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4 ">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default MainNav;
