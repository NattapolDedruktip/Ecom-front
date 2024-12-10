import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const MainNav = () => {
  const carts = useEcomStore((state) => state.carts);
  const user = useEcomStore((state) => state.user);
  const logout = useEcomStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  // console.log("user", user);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16 ">
          <div className="flex items-center  gap-6">
            <Link to={"/"} className="text-2xl font-bold">
              Logo
            </Link>

            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:duration-200"
              }
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium "
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:duration-200"
              }
              to={"/shop"}
            >
              Shop
            </NavLink>

            {/* badge */}
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium  "
                  : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:duration-200"
              }
            >
              Cart
              {carts.length > 0 && (
                <span className="absolute top-0 bg-red-200 rounded-full px-2">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* ternary  */}
          {user ? (
            <div className="flex items-center gap-4 ">
              <button
                onClick={toggleDropDown}
                className="flex items-center gap-2 hover:bg-gray-200 px-2 py-3 rounded-md"
              >
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/avatar-36-116394.png?f=webp&w=256"
                  className="w-8 h-8"
                />
                <ChevronDown />
              </button>
              {isOpen && (
                <div className="absolute mt-2 top-12 bg-white shadow-md z-50">
                  <div className="hover:bg-gray-200">
                    <Link className="block px-4 py-2 " to={"/user/history"}>
                      history
                    </Link>
                  </div>

                  <div className="hover:bg-gray-200">
                    <button
                      onClick={() => logout()}
                      className="block px-4 py-2 "
                      to={"/user/history"}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 ">
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium  "
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:duration-200"
                }
              >
                Login
              </NavLink>

              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium  "
                    : "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 hover:duration-200"
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default MainNav;
