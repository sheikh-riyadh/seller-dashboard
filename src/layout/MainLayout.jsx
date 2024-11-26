import { Outlet } from "react-router-dom";
import LeftSide from "../components/Layout/LeftSide";
import Header from "../components/Header/Header";
import RightSide from "../components/Layout/RightSide";

const MainLayout = () => {
  return (
    <div className="overflow-hidden">
      <div className={`flex`}>
        <div className="bg-widget hidden lg:block ">
          <LeftSide />
        </div>
        <div className="w-full h-[calc(100vh)] overflow-y-auto bar-hidden">
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
        <div className="hidden lg:block">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
