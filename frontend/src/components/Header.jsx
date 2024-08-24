import React from "react";
// import { MoonIcon, SunIcon } from "./Icons";

export default function Header({ title }) {
  // const [mode, setMode] = useThemeSwitcher();

  const getCurrentDate = () => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  // Call the function to get the current date
  const currentDate = getCurrentDate();

  return (
    <div className="border-solid border-b-2 border-altDark border-opacity-30 h-24  flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl text-altDark mx-5">{title}</h1>
      </div>
      <div className="mr-5 flex text-2xl text-altDark items-center">
        {currentDate}
      </div>
    </div>
  );
}
