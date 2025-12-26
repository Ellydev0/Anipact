"use client";

import React, { useEffect, useState } from "react";
import Searchbar from "./ui/searchbar";
import { Dropdown } from "./ui/dropdown";
import SearchScreen from "./SearchScreen";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

const Nav: React.FC<{ active?: number }> = ({ active = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [searchScreenOpen, setSearchScreenOpen] = useState(false);

  useEffect(() => {
    const showingBg = () => {
      if (window.scrollY > 100) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };
    window.addEventListener("scroll", showingBg);
    return () => {
      window.removeEventListener("scroll", showingBg);
    };
  }, []);

  const searchScreenRef = useClickOutside(() => setSearchScreenOpen(false));
  const dropdownRef = useClickOutside(() => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <>
      <nav
        className={`  ${showBg ? "bg-background/80 backdrop-blur-sm" : ""}
      fixed z-100 top-0 left-0 py-3 px-5 flex gap-7 justify-between items-center w-full text-[1.2rem] transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center gap-8">
          <div ref={dropdownRef}>
            <button
              aria-label="Open nav"
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-9 h-5 gap-1.5 flex flex-col items-start"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`
                     block h-1 bg-foreground rounded transition-all duration-300 ease-in-out
                     ${i === 0 && !isOpen ? "w-[50%]" : ""}
                     ${i === 1 && !isOpen ? "w-full" : ""}
                     ${i === 2 && !isOpen ? "w-[50%] ml-auto" : ""}

                     ${i === 0 && isOpen ? "rotate-45 translate-y-[.6rem] w-full" : ""}
                     ${i === 1 && isOpen ? "opacity-0 w-full" : ""}
                     ${i === 2 && isOpen ? "-rotate-45 -translate-y-2 w-full" : ""}
                   `}
                />
              ))}
            </button>
            <Dropdown active={active} openup={isOpen} />
          </div>

          <h1 className="font-xirod hidden lg:block">Anipact</h1>
        </div>

        <Searchbar
          className="w-full xl:w-[40%]"
          onClickFn={() => setSearchScreenOpen(true)}
        />
      </nav>
      {searchScreenOpen && <SearchScreen ref={searchScreenRef} />}
    </>
  );
};

export default Nav;
