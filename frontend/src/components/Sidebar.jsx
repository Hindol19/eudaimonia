import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

const SidebarItem = ({ name, Icon, classes, active, path = "/" }) => {
  // console.log(name, active);

  return (
    <Link
      href={path}
      className={`${classes} text-lg flex items-center w-full my-2 h-12  pl-5 rounded-l-full cursor-pointer ${
        active && active === name && "bg-acc"
      }`}
    >
      <Icon className="mr-3" />
      <div className="w-[80%]">{name}</div>
    </Link>
  );
};
const Sidebar = ({ classes, activeTab, username }) => {
  // const router = useRouter();
  const router = useRouter();
  const logOut = () => {
    localStorage.clear();
    // console.log(localStorage);
    router.push("/login");
  };
}