import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-row w-full">
      <Sidebar />
      <div className="flex flex-col w-[80%]">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
