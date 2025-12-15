import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="absolute top-0 py-7 px-10 flex justify-between items-center w-full text-[1.2rem] z-2">
      <h1 className="font-xirod">Anipact</h1>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-6 gap-2 flex flex-col items-start"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`
                 block h-1 bg-foreground rounded transition-all duration-300 ease-in-out
                 ${i === 0 && !isOpen ? "w-[50%]" : ""}
                 ${i === 1 && !isOpen ? "w-full" : ""}
                 ${i === 2 && !isOpen ? "w-[50%] ml-auto" : ""}

                 ${i === 0 && isOpen ? "rotate-45 translate-y-3.5 w-full" : ""}
                 ${i === 1 && isOpen ? "opacity-0 w-full" : ""}
                 ${i === 2 && isOpen ? "-rotate-45 -translate-y-1.75 w-full" : ""}
               `}
          />
        ))}
      </button>
    </nav>
  );
};

export default Nav;
