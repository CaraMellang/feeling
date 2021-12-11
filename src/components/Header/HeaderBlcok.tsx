import React, { useEffect, useState } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeaderBlockProps {
  setIsSign: React.Dispatch<React.SetStateAction<boolean>>;
}
function HeaderBlock({ setIsSign }: HeaderBlockProps) {
  const [activeMobile, setActiveMobile] = useState(false);
  const loadHandle = () => {
    if (window.innerWidth > 1024) {
      setActiveMobile(false);
      console.log("폴스");
    } else {
      console.log("트루");
      setActiveMobile(true);
    }
  };
  const resizeHandle = () => {
    console.log(`브라우저 사이즈${window.innerWidth} y:${window.innerHeight}`);
    loadHandle();
  };

  useEffect(() => {
    window.addEventListener("load", loadHandle);
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", () => {
        console.log(`증발함`);
      });
      window.removeEventListener("load", loadHandle);
    };
  }, []);
  return (
    <div>
      {activeMobile ? (
        <MobileHeader setIsSign={setIsSign} />
      ) : (
        <DesktopHeader setIsSign={setIsSign} />
      )}
    </div>
  );
}

export default HeaderBlock;