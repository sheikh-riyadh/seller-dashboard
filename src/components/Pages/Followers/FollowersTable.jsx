import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaStreetView, FaTrash } from "react-icons/fa";
import Table from "../../Common/Table";
import SelectInput from "../../Common/SelectInput";
import { followers } from "../../../data/followers/followers";

const FollowersTable = () => {
  const navigate = useNavigate();

  const redirectUserDetailsHandler = (items) => {
    if (items) {
      navigate("/seller-details", {
        state: {
          payload: { ...items },
        },
      });
    } else {
      toast.error("Data missing!. Please try again!");
    }
  };

  return (
    <div className="border rounded-md shadow-md">
      <Table
        className="font-normal"
        tableData={followers.allUser}
        columns={[
          {
            name: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            name: "Phone",
            dataIndex: "phone",
            key: "phone",
          },
          {
            name: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            name: "Role",
            dataIndex: "role",
            key: "role",
          },
          {
            name: "Status",
            render: () => {
              return (
                <div>
                  <SelectInput className="border bg-transparent rounded-full p-0 px-2 capitalize">
                    <option value="active" selected>
                      active
                    </option>
                    <option value="block">block</option>
                  </SelectInput>
                </div>
              );
            },
          },
          {
            name: "Actions",
            render: ({ item }) => {
              return (
                <div className="flex items-center gap-2">
                  <span
                    onClick={() => redirectUserDetailsHandler(item)}
                    className="text-stech cursor-pointer border border-stech text-center p-2 rounded-full"
                    title="View"
                  >
                    <FaStreetView />
                  </span>
                  <span
                    className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full hover:bg-red-300 hover:text-white duration-300"
                    title="Delete"
                  >
                    <FaTrash />
                  </span>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default FollowersTable;
