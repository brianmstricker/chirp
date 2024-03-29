"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
 IoHomeOutline,
 IoHomeSharp,
 IoSearchOutline,
 IoSearch,
} from "react-icons/io5";
import { IoMailOutline, IoMailSharp } from "react-icons/io5";
import {
 FaRegBookmark,
 FaBookmark,
 FaUser,
 FaRegUser,
 FaRegBell,
 FaBell,
} from "react-icons/fa6";
import Link from "next/link";
import { User } from "next-auth";

const BottomNav = ({ user }: { user: User }) => {
 const path = usePathname();
 const [activeLink, setActiveLink] = useState(path);
 useEffect(() => {
  const newPath = path.replace("/", "");
  setActiveLink(newPath);
  if (newPath === "") setActiveLink("home");
 }, [path]);
 const userLinks = [
  {
   href: user ? "/home" : "/",
   label: "Home",
   icon: IoHomeOutline,
   activeIcon: IoHomeSharp,
  },
  {
   href: "/explore",
   label: "Explore",
   icon: IoSearchOutline,
   activeIcon: IoSearch,
  },
  {
   href: "/notifications",
   label: "Notifications",
   icon: FaRegBell,
   activeIcon: FaBell,
  },
  {
   href: "/messages",
   label: "Messages",
   icon: IoMailOutline,
   activeIcon: IoMailSharp,
  },
  {
   href: "/bookmarks",
   label: "Bookmarks",
   icon: FaRegBookmark,
   activeIcon: FaBookmark,
  },
 ];
 return (
  <div className="fixed bottom-0 py-1 bg-white dark:bg-black border-t dark:border-t-white/25 w-full min-[500px]:hidden">
   <ul className="flex flex-row justify-between px-4">
    {userLinks.map((link) => (
     <li key={link.label}>
      <Link
       href={link.href.toLowerCase()}
       scroll={false}
       title={link.label}
       className="flex items-center gap-6 py-3 rounded-full px-3 xl:px-4 hover:bg-black/10 dark:hover:bg-white/15 transition-all duration-150"
       onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
       }}
      >
       <span>
        {activeLink.toLowerCase() === link.label.toLowerCase() ? (
         <link.activeIcon className="w-7 h-7" />
        ) : (
         <link.icon className="w-7 h-7" />
        )}
       </span>
      </Link>
     </li>
    ))}
   </ul>
  </div>
 );
};
export default BottomNav;
