import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavbar } from "./DashboardNavbar";
import { DrawerWithNavigation } from "./sideBar";

const DashboardLayout = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  // const user = useAppSelector(useCurrentUser);
  // console.log(user);

  return (

    <div className="w-4/5 mx-auto">
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 lg:gap-2">
        <div className="sticky inset-y-0 left-0 z-30">
          <DrawerWithNavigation open={open} closeDrawer={closeDrawer} />
        </div>
        <div className=" lg:col-span-3">
          <DashboardNavbar openDrawer={openDrawer} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
