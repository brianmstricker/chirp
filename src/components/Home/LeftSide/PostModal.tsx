"use client";
import { usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import ModalTweetBox from "./ModalTweetBox";
import { createPortal } from "react-dom";
import HideScroll from "@/components/HideScroll";

const PostModal = () => {
 const modalRef = useRef<HTMLDivElement>(null);
 const path = usePathname();
 const [modalShow, setModalShow] = useState(false);
 const handlePopstate = () => {
  setModalShow(false);
  document.body.style.overflow = "unset";
 };
 useEffect(() => {
  window.addEventListener("popstate", handlePopstate);
  return () => {
   window.removeEventListener("popstate", handlePopstate);
  };
 }, []);
 useEffect(() => {
  if (path === "/compose/tweet") {
   setModalShow(true);
   document.body.style.overflow = "hidden";
  } else {
   setModalShow(false);
   document.body.style.overflow = "unset";
  }
 }, [path]);
 useEffect(() => {
  const handleOutsideClick = (e: any) => {
   const modalNode = modalRef.current;
   if (modalNode && !modalNode.contains(e.target)) {
    closeModal();
   }
  };
  document.addEventListener("mousedown", handleOutsideClick);
  return () => {
   document.removeEventListener("mousedown", handleOutsideClick);
  };
 }, [modalRef]);
 function showModal() {
  window.history.pushState(null, "", "/compose/tweet");
  setModalShow(true);
 }
 function closeModal() {
  setModalShow(false);
  if (window.history.state === null) window.history.back();
  window.history.pushState(null, "", "/");
 }
 //  todo: maybe get this working
 //  useEffect(() => {
 //   const handleKeyDown = (e: any) => {
 //    if (e.key === "Tab" && modalRef.current) {
 //     const modalElements = modalRef.current.querySelectorAll(
 //      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
 //     );
 //     const firstElement = modalElements[0];
 //     const lastElement = modalElements[modalElements.length - 1];
 //     if (!e.shiftKey && document.activeElement === lastElement) {
 //      e.preventDefault();
 //      firstElement.focus();
 //     } else if (e.shiftKey && document.activeElement === firstElement) {
 //      e.preventDefault();
 //      lastElement.focus();
 //     }
 //    }
 //   };
 //   window.addEventListener("keydown", handleKeyDown);
 //   return () => {
 //    window.removeEventListener("keydown", handleKeyDown);
 //   };
 //  }, []);
 return (
  <>
   <button
    onClick={showModal}
    className="w-full mt-8 rounded-full text-lg font-medium bg-main text-white py-3 hover:bg-main/90 transition-all duration-150"
   >
    Post
   </button>
   {modalShow &&
    createPortal(
     <>
      <HideScroll />
      <div
       tabIndex={-1}
       className="w-screen h-screen fixed inset-0 bg-[#5b708366] z-[100] flex justify-center"
      >
       <div
        ref={modalRef}
        className="bg-white dark:bg-black sm:max-w-[600px] w-[100%] h-[100%] sm:max-h-[275px] rounded-2xl p-4 sm:mt-12 relative"
       >
        <button
         className="p-[2px] rounded-full relative -top-1 -left-1"
         onClick={closeModal}
        >
         <IoClose className="w-5 h-5" />
        </button>
        <div className="h-[90%] pt-4">
         <ModalTweetBox />
        </div>
       </div>
      </div>
     </>,
     document.body
    )}
  </>
 );
};
export default PostModal;
