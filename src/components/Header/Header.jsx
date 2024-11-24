import { FaHome, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetSeller } from "../../hooks/useGetSeller";

const Header = () => {
  const { seller } = useGetSeller();

  return (
    <header className="w-full sticky top-0 bg-white border-b border-gray-200 z-50 p-3">
      <nav className="flex items-center justify-end px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Link to={"/dashboard"}>
                <FaHome className="text-4xl bg-gray-100 p-2 rounded-full" />
              </Link>
              {seller?.photo ? (
                <div className="bg-gray-100 w-10 h-10 border p-1 rounded-full flex flex-col items-center justify-center">
                  <img
                    src={seller?.photo}
                    alt="personal_image"
                    className="h-full w-full rounded-full"
                  />
                </div>
              ) : (
                <FaUserCircle className="text-4xl bg-gray-100 p-2 rounded-full" />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
