import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import {
  changeUserRole,
  changeUserStatus,
  getListAllUsers,
} from "../../api/admin";
import { toast } from "react-toastify";

const TableUser = () => {
  const token = useEcomStore((state) => state.token);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    hdlGetUser();
  }, []);

  const hdlGetUser = () => {
    getListAllUsers(token)
      .then((res) => {
        // console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const hdlChangeUserStatus = (userId, userStatus) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    console.log(value);
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        hdlGetUser();
        toast.success(`Change status user id : ${userId} success!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };
    console.log(value);
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        hdlGetUser();
        toast.success(`Change role user id : ${userId} success!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(users);
  return (
    <div className="container mx-auto p-4 bg-white shadow-md ">
      <table className="w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              <td>
                <select
                  onChange={(e) => hdlChangeUserRole(item.id, e.target.value)}
                  value={item.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>
              <td>{item.enabled ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="bg-yellow-500 text-white p-1 rounded-md shadow-md"
                  onClick={() => {
                    hdlChangeUserStatus(item.id, item.enabled);
                  }}
                >
                  {item.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableUser;
