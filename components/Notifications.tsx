import * as React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      if (message === "") return;
      gsap.fromTo(
        ".notify",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
      );

      setTimeout(() => {
        gsap.fromTo(
          ".notify",
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.out",
          },
        );
      }, 1000);
    },
    { dependencies: [message], revertOnUpdate: true },
  );

  return (
    <div
      className="text-[.8rem] fixed bottom-4 left-1/2 transform -translate-x-1/2 z-100
      bg-card/70 backdrop-blur-sm text-center w-fit mx-auto shadow-xl border-[0.2px]
      border-accent/70 px-5 py-2 rounded notify opacity-0 translate-y-5"
    >
      {message}
    </div>
  );
};

export default Notification;
