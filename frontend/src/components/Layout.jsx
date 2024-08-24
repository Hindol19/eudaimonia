import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
const Layout = ({ children, pageTitle, sideTab, username }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState("true");
  return (
    <div className="flex flex-row font-mont bg-light  min-h-screen ">
      <Sidebar
        classes={isSidebarOpen ? "w-[20%]" : "hidden"}
        activeTab={sideTab}
        username={username}
      />
      <div className="flex flex-col w-[80%] ml-auto">
        <Header title={pageTitle} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
