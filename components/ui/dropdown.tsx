"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import gsap from "gsap";

export const Dropdown = ({
  active,
  openup,
}: {
  active: number;
  openup: boolean;
}) => {
  gsap.registerPlugin(useGSAP);
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(openup), [openup]);

  useGSAP(
    () => {
      if (open) {
        gsap.fromTo(
          ".li",
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          },
        );

        gsap.fromTo(
          ".dropdown",
          {
            opacity: 0,
            y: 20,
            display: "none",
          },
          {
            display: "block",
            opacity: 1,
            y: 0,
            duration: 0.3,
          },
        );
      } else {
        gsap.to(".li", {
          opacity: 0,
          scale: 0.8,
          y: -20,
          duration: 0.5,
          stagger: 0.1,
        });

        gsap.to(".dropdown", {
          opacity: 0,
          display: "none",
          delay: 0.2,
          y: 20,
          duration: 0.3,
        });
      }
    },
    { dependencies: [open] },
  );
  return (
    <div className="hidden opacity-0 translate-y-5 dropdown absolute top-15 left-3 right-3 bg-background p-4 rounded-md xl:w-[30%]">
      <ul className="flex flex-col gap-4 items-center justify-center  ">
        <li
          className={`li opacity-0 translate-y-5 bg-card w-full rounded-md relative  border border-transparent hover:border-accent`}
        >
          {active === 1 && (
            <div className="bg-accent/20 w-full h-full absolute rounded-md border border-accent" />
          )}
          <div className="p-4 z-1 relative">
            <h1 className="text-[1.1rem] font-bold">Anime List</h1>
            <p className="text-[.7rem] mt-1 text-muted">
              Explore trending and popular anime and watch on your favourite
              streaming platform.
            </p>
          </div>
        </li>

        <li
          className={`li opacity-0 translate-y-5 bg-card w-full rounded-md relative  border border-transparent hover:border-accent`}
        >
          {active === 2 && (
            <div className="bg-accent/20 w-full h-full absolute rounded-md border border-accent" />
          )}
          <div className="p-4 z-1 relative">
            <h1 className="text-[1.1rem] font-bold">Anime News</h1>
            <p className="text-[.7rem] mt-1 text-muted">
              Stay updated on trending anime news and events from trusted
              sources.
            </p>
          </div>
        </li>

        <li
          className={`li opacity-0 translate-y-5 bg-card w-full rounded-md relative  border border-transparent hover:border-accent`}
        >
          {active === 3 && (
            <div className="bg-accent/20 w-full h-full absolute rounded-md border border-accent" />
          )}
          <div className="p-4 z-1 relative">
            <h1 className="text-[1.1rem] font-bold">Your Watchlist</h1>
            <p className="text-[.7rem] mt-1 text-muted">
              Manage your anime watchlist and track your watch progress.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
